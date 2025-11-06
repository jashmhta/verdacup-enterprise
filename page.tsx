import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { db } from '@/lib/db';
import { products } from '@/drizzle/schema';
import { desc } from 'drizzle-orm';
import ProductCard from '@/components/product/ProductCard';
import { Leaf, Recycle, Award, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Home',
  description: 'VerdaCup - Leading manufacturer of premium biodegradable cups in India. Eco-friendly paper cups, bagasse cups, and sustainable packaging solutions.',
};

async function getFeaturedProducts() {
  const result = await db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt))
    .limit(6);
  return result;
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Sustainable Packaging for a <span className="text-primary">Greener Tomorrow</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Premium biodegradable cups manufactured in India. Join the eco-revolution with VerdaCup's sustainable solutions.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/products"
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Shop Now
                </Link>
                <Link
                  href="/about"
                  className="bg-card text-card-foreground px-8 py-3 rounded-lg font-semibold border-2 border-primary hover:bg-primary/5 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative h-96">
              <Image
                src="/hero-cups.jpg"
                alt="VerdaCup Biodegradable Cups"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">100% Biodegradable</h3>
              <p className="text-sm text-muted-foreground">Naturally decompose within 90 days</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Eco-Friendly</h3>
              <p className="text-sm text-muted-foreground">Made from sustainable materials</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">Certified and tested products</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Made in India</h3>
              <p className="text-sm text-muted-foreground">Supporting local manufacturing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Products</h2>
            <p className="text-muted-foreground">Discover our range of eco-friendly biodegradable cups</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose VerdaCup */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Why Choose VerdaCup?</h2>
            <p className="text-lg opacity-90 mb-8">
              We're committed to providing sustainable packaging solutions that don't compromise on quality. Our biodegradable cups are perfect for cafes, restaurants, events, and businesses looking to reduce their environmental impact.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-primary-foreground/10 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Bulk Orders</h3>
                <p className="text-sm opacity-90">Competitive pricing for large quantities</p>
              </div>
              <div className="bg-primary-foreground/10 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Custom Printing</h3>
                <p className="text-sm opacity-90">Personalized branding options available</p>
              </div>
              <div className="bg-primary-foreground/10 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
                <p className="text-sm opacity-90">Pan-India shipping within 5-7 days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500">★</span>
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Excellent quality cups! Our customers love that we've switched to biodegradable options. VerdaCup has been a reliable partner."
              </p>
              <p className="font-semibold">- Cafe Owner, Mumbai</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500">★</span>
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Great pricing and fast delivery. The custom printed cups look amazing and help promote our brand while being eco-friendly."
              </p>
              <p className="font-semibold">- Event Organizer, Delhi</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500">★</span>
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Finally found a supplier that matches quality with sustainability. The bagasse cups are sturdy and completely compostable."
              </p>
              <p className="font-semibold">- Restaurant Chain, Bangalore</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
