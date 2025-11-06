import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from 'mysql2/promise';
import { InsertUser, users, products, categories, cart, orders, orderItems } from "@/drizzle/schema";
import { ENV } from './_core/env';

// Create a connection pool if DATABASE_URL is available
const pool = process.env.DATABASE_URL ? mysql.createPool(process.env.DATABASE_URL) : null;

// Export drizzle instance for use in Server Components
export const db = pool ? drizzle(pool) : null as any;

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Product queries
export async function getAllProducts() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(products);
}

export async function getFeaturedProducts() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(products).where(eq(products.featured, 1)).limit(6);
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getProductBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getProductsByCategory(categoryId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(products).where(eq(products.categoryId, categoryId));
}

// Category queries
export async function getAllCategories() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(categories);
}

export async function getCategoryById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Cart queries
export async function getCartByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(cart).where(eq(cart.userId, userId));
}

export async function addToCart(userId: number, productId: number, quantity: number) {
  const db = await getDb();
  if (!db) return;
  
  // Check if item already in cart
  const existing = await db.select().from(cart)
    .where(and(eq(cart.userId, userId), eq(cart.productId, productId)))
    .limit(1);
  
  if (existing.length > 0) {
    // Update quantity
    await db.update(cart)
      .set({ quantity: existing[0].quantity + quantity })
      .where(eq(cart.id, existing[0].id));
  } else {
    // Insert new item
    await db.insert(cart).values({ userId, productId, quantity });
  }
}

export async function updateCartItem(cartId: number, quantity: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(cart).set({ quantity }).where(eq(cart.id, cartId));
}

export async function removeFromCart(cartId: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(cart).where(eq(cart.id, cartId));
}

export async function clearCart(userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(cart).where(eq(cart.userId, userId));
}

// Order queries
export async function getOrdersByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(orders).where(eq(orders.userId, userId));
}

export async function getOrderById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getOrderItems(orderId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
}

export async function getAllOrders() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(orders);
}

export async function updateOrderStatus(orderId: number, status: string) {
  const database = await getDb();
  if (!database) return;
  await database.update(orders).set({ status: status as any }).where(eq(orders.id, orderId));
}
