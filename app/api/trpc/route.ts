import { db } from '@/lib/db';
import { products, categories } from '@/drizzle/schema';
import { eq, like, or } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    let query = db.select({
      id: products.id,
      name: products.name,
      description: products.description,
      price: products.price,
      category: products.category,
      image: products.image,
      stock: products.stock,
      specifications: products.specifications,
      minOrder: products.minOrder,
      createdAt: products.createdAt,
    }).from(products);

    if (category) {
      query = query.where(eq(products.category, category)) as any;
    }

    if (search) {
      query = query.where(
        or(
          like(products.name, `%${search}%`),
          like(products.description, `%${search}%`)
        )
      ) as any;
    }

    const result = await query;

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
