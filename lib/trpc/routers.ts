import { COOKIE_NAME } from "@/lib/const";
import { getSessionCookieOptions } from "@/lib/_core/cookies";
import { systemRouter } from "@/lib/_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "@/lib/_core/trpc";
import { z } from "zod";
import * as db from "@/lib/db";
import { getDb } from "@/lib/db";
import { products, categories, cart, orders, orderItems } from "@/drizzle/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Products API
  products: router({
    list: publicProcedure
      .input(z.object({
        categoryId: z.number().optional(),
      }).optional())
      .query(async ({ input }) => {
        if (input?.categoryId) {
          return await db.getProductsByCategory(input.categoryId);
        }
        return await db.getAllProducts();
      }),
    
    featured: publicProcedure.query(async () => {
      return await db.getFeaturedProducts();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const product = await db.getProductById(input.id);
        if (!product) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Product not found' });
        }
        return product;
      }),
    
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const product = await db.getProductBySlug(input.slug);
        if (!product) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Product not found' });
        }
        return product;
      }),
  }),

  // Categories API
  categories: router({
    list: publicProcedure.query(async () => {
      return await db.getAllCategories();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const category = await db.getCategoryById(input.id);
        if (!category) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Category not found' });
        }
        return category;
      }),
  }),

  // Cart API (protected)
  cart: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const cartItems = await db.getCartByUserId(ctx.user.id);
      
      // Enrich with product details
      const enrichedItems = await Promise.all(
        cartItems.map(async (item) => {
          const product = await db.getProductById(item.productId);
          return {
            ...item,
            product,
          };
        })
      );
      
      return enrichedItems;
    }),
    
    add: protectedProcedure
      .input(z.object({
        productId: z.number(),
        quantity: z.number().min(1),
      }))
      .mutation(async ({ ctx, input }) => {
        // Verify product exists and has stock
        const product = await db.getProductById(input.productId);
        if (!product) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Product not found' });
        }
        
        await db.addToCart(ctx.user.id, input.productId, input.quantity);
        return { success: true };
      }),
    
    update: protectedProcedure
      .input(z.object({
        cartId: z.number(),
        quantity: z.number().min(1),
      }))
      .mutation(async ({ input }) => {
        await db.updateCartItem(input.cartId, input.quantity);
        return { success: true };
      }),
    
    remove: protectedProcedure
      .input(z.object({ cartId: z.number() }))
      .mutation(async ({ input }) => {
        await db.removeFromCart(input.cartId);
        return { success: true };
      }),
    
    clear: protectedProcedure.mutation(async ({ ctx }) => {
      await db.clearCart(ctx.user.id);
      return { success: true };
    }),
  }),

  // Orders API (protected)
  orders: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getOrdersByUserId(ctx.user.id);
    }),
    
    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        const order = await db.getOrderById(input.id);
        if (!order) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Order not found' });
        }
        
        // Verify user owns this order or is admin
        if (order.userId !== ctx.user.id && ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Access denied' });
        }
        
        const items = await db.getOrderItems(order.id);
        return { ...order, items };
      }),
    
    create: protectedProcedure
      .input(z.object({
        shippingName: z.string(),
        shippingPhone: z.string(),
        shippingEmail: z.string().email().optional(),
        shippingAddress: z.string(),
        shippingCity: z.string(),
        shippingState: z.string(),
        shippingPincode: z.string(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const database = await getDb();
        if (!database) {
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        }
        
        // Get cart items
        const cartItems = await db.getCartByUserId(ctx.user.id);
        if (cartItems.length === 0) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Cart is empty' });
        }
        
        // Calculate total and prepare order items
        let total = 0;
        const orderItemsData = [];
        
        for (const cartItem of cartItems) {
          const product = await db.getProductById(cartItem.productId);
          if (!product) continue;
          
          const itemTotal = product.price * cartItem.quantity;
          total += itemTotal;
          
          orderItemsData.push({
            productId: product.id,
            productName: product.name,
            quantity: cartItem.quantity,
            price: product.price,
          });
        }
        
        // Create order
        const [orderResult] = await database.insert(orders).values({
          userId: ctx.user.id,
          total,
          shippingName: input.shippingName,
          shippingPhone: input.shippingPhone,
          shippingEmail: input.shippingEmail || null,
          shippingAddress: input.shippingAddress,
          shippingCity: input.shippingCity,
          shippingState: input.shippingState,
          shippingPincode: input.shippingPincode,
          notes: input.notes || null,
          status: 'pending',
        });
        
        const orderId = Number(orderResult.insertId);
        
        // Create order items
        for (const item of orderItemsData) {
          await database.insert(orderItems).values({
            orderId,
            ...item,
          });
        }
        
        // Clear cart
        await db.clearCart(ctx.user.id);
        
        return { orderId, success: true };
      }),
  }),

  // Admin API
  admin: router({
    products: router({
      create: adminProcedure
        .input(z.object({
          name: z.string(),
          slug: z.string(),
          description: z.string().optional(),
          price: z.number(),
          categoryId: z.number(),
          imageUrl: z.string().optional(),
          stock: z.number().default(0),
          capacity: z.string().optional(),
          material: z.string().optional(),
          wallType: z.string().optional(),
          minOrderQty: z.number().default(1000),
          featured: z.number().default(0),
        }))
        .mutation(async ({ input }) => {
          const database = await getDb();
          if (!database) {
            throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
          }
          
          await database.insert(products).values(input);
          return { success: true };
        }),
      
      update: adminProcedure
        .input(z.object({
          id: z.number(),
          name: z.string().optional(),
          description: z.string().optional(),
          price: z.number().optional(),
          stock: z.number().optional(),
          featured: z.number().optional(),
        }))
        .mutation(async ({ input }) => {
          const database = await getDb();
          if (!database) {
            throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
          }
          
          const { id, ...updates } = input;
          await database.update(products).set(updates).where(eq(products.id, id));
          return { success: true };
        }),
      
      delete: adminProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input }) => {
          const database = await getDb();
          if (!database) {
            throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
          }
          
          await database.delete(products).where(eq(products.id, input.id));
          return { success: true };
        }),
    }),
    
    orders: router({
      list: adminProcedure.query(async () => {
        return await db.getAllOrders();
      }),
      
      updateStatus: adminProcedure
        .input(z.object({
          orderId: z.number(),
          status: z.enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']),
        }))
        .mutation(async ({ input }) => {
          await db.updateOrderStatus(input.orderId, input.status);
          return { success: true };
        }),
    }),
  }),
});

export type AppRouter = typeof appRouter;
