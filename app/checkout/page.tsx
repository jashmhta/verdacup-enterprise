import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your order',
};

export default function Checkout() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="max-w-2xl mx-auto">
        <div className="bg-muted/30 rounded-lg p-12 text-center">
          <h2 className="text-2xl font-semibold mb-2">Checkout not available</h2>
          <p className="text-muted-foreground mb-6">
            Please contact us directly for orders
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
