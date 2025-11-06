import { Metadata } from 'next';
import { Package } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Orders',
  description: 'View your orders',
};

export default function Orders() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="max-w-4xl mx-auto">
        <div className="bg-muted/30 rounded-lg p-12 text-center">
          <Package className="h-20 w-20 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-6">
            Your order history will appear here once you place orders
          </p>
          <a
            href="/products"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Browse Products
          </a>
        </div>
      </div>
    </div>
  );
}
