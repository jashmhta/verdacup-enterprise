'use server';

import { db } from '@/lib/db';
import { orders, orderItems, cart, products } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

async function getSessionId() {
  const cookieStore = await cookies();
  return cookieStore.get('session_id')?.value;
}

export async function createOrder(formData: {
  shippingName: string;
  shippingPhone: string;
  shippingEmail: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPincode: string;
  notes?: string;
}) {
  try {
    const sessionId = await getSessionId();
    if (!sessionId) {
      return { success: false, error: 'No session found' };
    }

    // Get cart items
    const cartItems = await db
      .select({
        productId: cart.productId,
        quantity: cart.quantity,
        product: products,
      })
      .from(cart)
      .leftJoin(products, eq(cart.productId, products.id))
      .where(eq(cart.sessionId, sessionId));

    if (cartItems.length === 0) {
      return { success: false, error: 'Cart is empty' };
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * item.quantity;
    }, 0);

    // Create order
    const [order] = await db.insert(orders).values({
      sessionId,
      total,
      ...formData,
    });

    const orderId = order.insertId;

    // Create order items
    for (const item of cartItems) {
      if (item.product) {
        await db.insert(orderItems).values({
          orderId: Number(orderId),
          productId: item.productId,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        });
      }
    }

    // Clear cart
    await db.delete(cart).where(eq(cart.sessionId, sessionId));

    revalidatePath('/cart');
    revalidatePath('/orders');

    return { success: true, orderId };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: 'Failed to create order' };
  }
}

export async function getOrders() {
  try {
    const sessionId = await getSessionId();
    if (!sessionId) {
      return [];
    }

    const result = await db
      .select()
      .from(orders)
      .where(eq(orders.sessionId, sessionId))
      .orderBy(orders.createdAt);

    return result;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

export async function getOrderDetails(orderId: number) {
  try {
    const sessionId = await getSessionId();
    if (!sessionId) {
      return null;
    }

    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);

    if (!order || order.sessionId !== sessionId) {
      return null;
    }

    const items = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, orderId));

    return { ...order, items };
  } catch (error) {
    console.error('Error fetching order details:', error);
    return null;
  }
}
