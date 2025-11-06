'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateCartItem, removeFromCart } from '@/app/actions/cart';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartActionsProps {
  itemId: number;
  productId: number;
  quantity: number;
  stock: number;
}

export default function CartActions({ itemId, productId, quantity, stock }: CartActionsProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > stock) return;

    setIsUpdating(true);
    await updateCartItem(productId, newQuantity);
    setIsUpdating(false);
    router.refresh();
  };

  const handleRemove = async () => {
    if (!confirm('Remove this item from cart?')) return;

    setIsUpdating(true);
    await removeFromCart(productId);
    setIsUpdating(false);
    router.refresh();
  };

  return (
    <div className="flex items-center gap-4">
      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleUpdateQuantity(quantity - 1)}
          disabled={isUpdating || quantity <= 1}
          className="w-8 h-8 rounded border-2 border-primary flex items-center justify-center hover:bg-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center font-semibold">{quantity}</span>
        <button
          onClick={() => handleUpdateQuantity(quantity + 1)}
          disabled={isUpdating || quantity >= stock}
          className="w-8 h-8 rounded border-2 border-primary flex items-center justify-center hover:bg-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        disabled={isUpdating}
        className="text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
        aria-label="Remove item"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
