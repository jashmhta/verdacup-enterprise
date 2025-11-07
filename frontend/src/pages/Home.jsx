import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Award, Package, TrendingUp, ShoppingCart, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useApp } from '@/App';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const { API } = useApp();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await axios.get(`${API}/products?featured=true`);
        setFeaturedProducts(response.data.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, [API]);

  return (
    <div className="min-h-screen flex flex-col" data-testid="home-page">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#F4F1E8] via-white to-[#F4F1E8]">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%232D5016" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          <div className="container relative py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm font-medium text-primary mb-6" data-testid="hero-badge">
                <Leaf className="h-4 w-4" />
                100% Biodegradable & Compostable
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
                Sustainable Cups for a <span className="text-primary">Greener Tomorrow</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto" data-testid="hero-description">
                Premium biodegradable paper and bagasse cups. 100% compostable, eco-friendly, and made in India. Join thousands of businesses choosing sustainable packaging solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="text-base px-8 h-12" data-testid="browse-products-btn">
                  <Link to="/products">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Browse Products
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base px-8 h-12" data-testid="learn-more-btn">
                  <Link to="/about">
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* USP Section */}
        <section className="py-16 bg-white" data-testid="usp-section">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-none shadow-md card-hover" data-testid="usp-card-biodegradable">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">100% Biodegradable</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Completely compostable materials that return to nature within 90-180 days
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md card-hover" data-testid="usp-card-quality">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Food-grade certified with leak-proof design for hot and cold beverages
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md card-hover" data-testid="usp-card-sustainable">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Eco-Friendly</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Made from sustainable sugarcane and paper sources with zero plastic
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md card-hover" data-testid="usp-card-bulk">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Bulk Orders</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Competitive pricing for wholesale purchases with fast delivery
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-gradient-to-b from-white to-[#F4F1E8]/30" data-testid="featured-products-section">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Products</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover our most popular biodegradable cups trusted by businesses across India
              </p>
            </div>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden card-hover" data-testid={`featured-product-${product.slug}`}>
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={product.imageUrl || 'https://via.placeholder.com/400'}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-primary">₹{(product.price / 100).toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">per 1000 units</p>
                        </div>
                        <Button asChild size="sm" data-testid={`view-product-btn-${product.slug}`}>
                          <Link to={`/products/${product.slug}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline" data-testid="view-all-products-btn">
                <Link to="/products">
                  View All Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white" data-testid="cta-section">
          <div className="container text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Make the Switch?</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join the sustainable revolution. Contact us today for bulk orders and custom printing options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-base px-8" data-testid="cta-contact-btn">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base px-8 bg-white text-primary hover:bg-white/90" data-testid="cta-shop-btn">
                <Link to="/products">Shop Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}