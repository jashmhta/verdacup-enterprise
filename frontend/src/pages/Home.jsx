import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Award, Package, TrendingUp, ShoppingCart, ArrowRight, Factory, Recycle, Shield, Users2, CheckCircle2, Globe2 } from 'lucide-react';
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
        {/* Hero Section with Background Image */}
        <section className="relative overflow-hidden min-h-[600px] flex items-center">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1696568720419-69a7aba97c31?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxiaW9kZWdyYWRhYmxlJTIwY3Vwc3xlbnwwfHx8fDE3NjI1MjYxNzd8MA&ixlib=rb-4.1.0&q=85')`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#2D5016]/95 via-[#2D5016]/85 to-[#7A9B54]/75"></div>
          </div>
          
          <div className="container relative z-10 py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white mb-6" data-testid="hero-badge">
                <Leaf className="h-4 w-4" />
                100% Biodegradable & Compostable
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white" data-testid="hero-title">
                Enterprise-Grade <span className="text-[#C1F58C]">Sustainable Packaging</span> Solutions
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed" data-testid="hero-description">
                India's premier manufacturer of biodegradable paper and bagasse cups. Trusted by 1000+ businesses nationwide. ISO certified, 100% compostable, and designed for excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-base px-8 h-12 bg-white text-primary hover:bg-white/90" data-testid="browse-products-btn">
                  <Link to="/products">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Browse Products
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base px-8 h-12 bg-transparent text-white border-white hover:bg-white/10" data-testid="learn-more-btn">
                  <Link to="/about">
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white mb-1">1000+</p>
                  <p className="text-sm text-white/80">Business Partners</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white mb-1">50M+</p>
                  <p className="text-sm text-white/80">Cups Produced</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white mb-1">100%</p>
                  <p className="text-sm text-white/80">Eco-Friendly</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges Section */}
        <section className="py-8 bg-white border-b">
          <div className="container">
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-medium">ISO 9001:2015 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-medium">Food Grade Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-medium">100% Compostable</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-medium">Made in India</span>
              </div>
            </div>
          </div>
        </section>

        {/* USP Section */}
        <section className="py-20 bg-gradient-to-b from-white to-[#F4F1E8]/50" data-testid="usp-section">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose VerdaCup?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Enterprise-grade sustainable packaging solutions built for businesses that care about the planet
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-none shadow-lg card-hover feature-card" data-testid="usp-card-biodegradable">
                <CardContent className="pt-10 pb-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                    <Leaf className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">100% Biodegradable</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Completely compostable materials that naturally decompose within 90-180 days, leaving zero environmental footprint
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg card-hover feature-card" data-testid="usp-card-quality">
                <CardContent className="pt-10 pb-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                    <Award className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Premium Quality</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    ISO certified food-grade materials with advanced leak-proof design for both hot and cold beverages
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg card-hover feature-card" data-testid="usp-card-sustainable">
                <CardContent className="pt-10 pb-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                    <Recycle className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Eco-Friendly</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Manufactured from sustainable sugarcane bagasse and responsibly sourced paper with zero plastic content
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg card-hover feature-card" data-testid="usp-card-bulk">
                <CardContent className="pt-10 pb-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                    <Package className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Enterprise Solutions</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Competitive wholesale pricing, custom branding options, and reliable nationwide delivery
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-white" data-testid="featured-products-section">
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
                  <div key={i} className="h-[450px] bg-muted animate-pulse rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden card-hover image-zoom" data-testid={`featured-product-${product.slug}`}>
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={product.imageUrl || 'https://via.placeholder.com/400'}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-xl mb-2">{product.name}</h3>
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

        {/* Manufacturing Excellence Section */}
        <section className="py-20 bg-gradient-to-br from-[#F4F1E8] to-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Manufacturing Excellence</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our state-of-the-art manufacturing facility in India combines cutting-edge technology with sustainable practices to produce over 50 million cups annually.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Factory className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Advanced Production</h4>
                      <p className="text-sm text-muted-foreground">Automated machinery ensuring consistent quality and high production capacity</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Quality Control</h4>
                      <p className="text-sm text-muted-foreground">Rigorous testing at every stage to meet international food safety standards</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Nationwide Delivery</h4>
                      <p className="text-sm text-muted-foreground">Reliable logistics network ensuring timely delivery across all major cities</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.pexels.com/photos/3737675/pexels-photo-3737675.jpeg" 
                    alt="Manufacturing Process" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl mt-8">
                  <img 
                    src="https://images.pexels.com/photos/25551694/pexels-photo-25551694.jpeg" 
                    alt="Quality Products" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sustainability Commitment */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZXxlbnwwfHx8fDE3NjI1MjYxOTB8MA&ixlib=rb-4.1.0&q=85" 
                    alt="Sustainability" 
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Sustainability Commitment</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Every VerdaCup product represents our unwavering commitment to environmental sustainability. We believe in creating products that serve their purpose perfectly while ensuring a healthier planet for future generations.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-4xl font-bold text-primary mb-2">90-180</p>
                    <p className="text-sm text-muted-foreground">Days to Compost</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-primary mb-2">0%</p>
                    <p className="text-sm text-muted-foreground">Plastic Content</p>
                  </div>
                </div>
                <Button asChild size="lg" className="mt-4">
                  <Link to="/about">
                    Learn About Our Process
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1591807105152-594ed605cc58?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxzdXN0YWluYWJsZXxlbnwwfHx8fDE3NjI1MjYxOTB8MA&ixlib=rb-4.1.0&q=85')`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-accent/90"></div>
          </div>
          <div className="container relative z-10 text-center text-white">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Ready to Make the Switch?</h2>
            <p className="text-lg sm:text-xl mb-10 opacity-90 max-w-3xl mx-auto">
              Join 1000+ businesses across India who've already made the sustainable choice. Get competitive pricing, custom branding, and reliable delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-base px-8 h-12" data-testid="cta-contact-btn">
                <Link to="/contact">Request Quote</Link>
              </Button>
              <Button asChild size="lg" className="text-base px-8 h-12 bg-white text-primary hover:bg-white/90" data-testid="cta-shop-btn">
                <Link to="/products">Browse Catalog</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
