'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addToCart } from '@/app/actions/cart';
import { ShoppingCart, Minus, Plus } from 'lucide-react';

interface AddToCartButtonProps {
  productId: number;
  stock: number;
}

export default function AddToCartButton({ productId, stock }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    setIsAdding(true);
    const result = await addToCart(productId, quantity);
    setIsAdding(false);

    if (result.success) {
      router.refresh();
      alert('Product added to cart!');
    } else {
      alert(result.error || 'Failed to add to cart');
    }
  };

  if (stock === 0) {
    return (
      <button
        disabled
        className="w-full bg-muted text-muted-foreground px-8 py-4 rounded-lg font-semibold cursor-not-allowed"
      >
        Out of Stock
      </button>
    );
  }

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="font-medium">Quantity:</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-lg border-2 border-primary flex items-center justify-center hover:bg-primary/10 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(stock, quantity + 1))}
            className="w-10 h-10 rounded-lg border-2 border-primary flex items-center justify-center hover:bg-primary/10 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-5 h-5" />
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
}
