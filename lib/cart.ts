
import { db } from '@/lib/db';
import { cart, products } from '@/drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { cookies } from 'next/headers';

// Simple session management using cookies
async function getSessionId() {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get('session_id')?.value;
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    cookieStore.set('session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }
  
  return sessionId;
}

export async function addToCart(productId: number, quantity: number = 1) {
  try {
    const sessionId = await getSessionId();

    // Check if item already in cart
    const existing = await db
      .select()
      .from(cart)
      .where(
        and(
          eq(cart.sessionId, sessionId),
          eq(cart.productId, productId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      // Update quantity
      await db
        .update(cart)
        .set({ quantity: existing[0].quantity + quantity })
        .where(eq(cart.id, existing[0].id));
    } else {
      // Add new item
      await db.insert(cart).values({