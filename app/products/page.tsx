import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse our range of eco-friendly biodegradable cups',
};

export default function Products() {
  const products = [
    {
      name: 'Paper Cups - 150ml',
      category: 'Paper Cups',
      price: 'Contact for pricing',
      description: 'Single-wall paper cups perfect for hot beverages. Ideal for tea, coffee, and other hot drinks.',
      image: '/images/1000139872.jpg',
    },
    {
      name: 'Paper Cups - 200ml',
      category: 'Paper Cups',
      price: 'Contact for pricing',
      description: 'Medium-sized paper cups for coffee and tea. Great for cafes and events.',
      image: '/images/1000139874.jpg',
    },
    {
      name: 'Paper Cups - 250ml',
      category: 'Paper Cups',
      price: 'Contact for pricing',
      description: 'Large paper cups with custom printing options available.',
      image: '/images/1000139876.jpg',
    },
    {
      name: 'Bagasse Cups - 200ml',
      category: 'Bagasse Cups',
      price: 'Contact for pricing',
      description: 'Eco-friendly cups made from sugarcane fiber. 100% compostable.',
      image: '/images/1000139878.jpg',
    },
    {
      name: 'Bagasse Cups - 300ml',
      category: 'Bagasse Cups',
      price: 'Contact for pricing',
      description: 'Premium bagasse cups for cold and hot beverages.',
      image: '/images/1000139880.jpg',
    },
    {
      name: 'Custom Printed Cups',
      category: 'Custom Solutions',
      price: 'Contact for pricing',
      description: 'Custom branded cups with your logo. Perfect for businesses.',
      image: '/images/1000139882.jpg',
    },
    {
      name: 'Double Wall Cups',
      category: 'Premium',
      price: 'Contact for pricing',
      description: 'Insulated double-wall cups for hot beverages. No sleeve needed.',
      image: '/images/1000139884.jpg',
    },
  ];

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Our Products</h1>
        <p className="text-lg text-muted-foreground">
          Discover our range of eco-friendly biodegradable cups
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div className="p-6">
              <div className="text-xs text-primary font-semibold mb-2">
                {product.category}
              </div>
              <h3 className="font-semibold text-xl mb-2">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {product.description}
              </p>
              <div className="text-lg font-bold text-primary mb-4">
                {product.price}
              </div>
              <a
                href="/contact"
                className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center"
              >
                Request Quote
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center bg-muted/50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Need Custom Solutions?</h2>
        <p className="text-muted-foreground mb-6">
          We offer custom printing, various sizes, and bulk orders. Contact us for a personalized quote.
        </p>
        <a
          href="/contact"
          className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
