import { Metadata } from 'next';
import { ShoppingCart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'View your cart',
};

export default function Cart() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="max-w-4xl mx-auto">
        <div className="bg-muted/30 rounded-lg p-12 text-center">
          <ShoppingCart className="h-20 w-20 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add products to your cart to see them here
          </p>
          <a
            href="/products"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Browse Products
          </a>
        </div>

        <div className="mt-8 bg-card border rounded-lg p-6">
          <h3 className="font-semibold mb-4">Need help?</h3>
          <p className="text-muted-foreground mb-4">
            For bulk orders or custom solutions, please contact us directly.
          </p>
          <a
            href="/contact"
            className="text-primary hover:underline font-medium"
          >
            Contact Us →
          </a>
        </div>
      </div>
    </div>
  );
}
