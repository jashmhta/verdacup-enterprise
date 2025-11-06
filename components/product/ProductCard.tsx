import Link from 'next/link';
import { formatPrice } from '@/lib/const';
import { ShoppingCart, Package } from 'lucide-react';
import type { Product } from '@/drizzle/schema';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: number) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const isOutOfStock = product.stock === 0;

  return (
    <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-square bg-muted flex items-center justify-center cursor-pointer">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
          ) : (
            <Package className="h-24 w-24 text-muted-foreground" />
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          {product.capacity && <span>{product.capacity}</span>}
          {product.material && <span>• {product.material}</span>}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-muted-foreground">
            / piece
          </span>
        </div>

        <p className="text-xs text-muted-foreground mt-1">
          Min. Order: {product.minOrderQty.toLocaleString()} pieces
        </p>
      </div>

      <div className="p-4 pt-0">
        {isOutOfStock ? (
          <button className="w-full px-4 py-2 rounded-md bg-secondary text-secondary-foreground opacity-50 cursor-not-allowed" disabled>
            Out of Stock
          </button>
        ) : onAddToCart ? (
          <button
            className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            onClick={() => onAddToCart(product.id)}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        ) : (
          <Link
            href={`/products/${product.slug}`}
            className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}
