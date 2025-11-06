import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatPrice } from '@shared/const';
import { ShoppingCart, Package } from 'lucide-react';
import type { Product } from '../../../../drizzle/schema';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: number) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const isOutOfStock = product.stock === 0;
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
      
      <CardContent className="p-4">
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
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {isOutOfStock ? (
          <Button variant="secondary" className="w-full" disabled>
            Out of Stock
          </Button>
        ) : onAddToCart ? (
          <Button 
            variant="default" 
            className="w-full"
            onClick={() => onAddToCart(product.id)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        ) : (
          <Button variant="default" className="w-full" asChild>
            <Link href={`/products/${product.slug}`}>
              View Details
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
