import { SEOHead } from '@/components/seo/SEOHead';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Leaf, Award, Users, TrendingUp } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="About Us - Biodegradable Cups Manufacturer | VerdaCup"
        description="Learn about VerdaCup's mission to provide eco-friendly biodegradable cups. Leading manufacturer of paper and bagasse cups in India."
        url="/about"
      />
      <Header />
      
      <main>
        <div className="bg-primary/5 py-16">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About VerdaCup</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Leading the sustainable packaging revolution in India
            </p>
          </div>
        </div>
        
        <div className="container py-16">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2>Our Mission</h2>
            <p>
              VerdaCup is committed to providing high-quality, eco-friendly biodegradable cups that help businesses and individuals reduce their environmental impact. We believe that sustainable packaging should be accessible, affordable, and reliable.
            </p>
            
            <h2>Why Biodegradable?</h2>
            <p>
              With India's ban on single-use plastics, businesses need sustainable alternatives. Our biodegradable paper and bagasse cups offer the perfect solution - they're sturdy, leak-proof, and completely compostable. Made from renewable resources, our cups return to nature within months, not centuries.
            </p>
            
            <h2>Our Products</h2>
            <p>
              We manufacture a complete range of biodegradable cups including single-wall and double-wall paper cups, bagasse cups made from sugarcane waste, and custom-printed cups for businesses. All our products are food-grade certified and meet international quality standards.
            </p>
          </div>
        </div>
        
        <div className="bg-muted/50 py-16">
          <div className="container">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">100% Eco-Friendly</h3>
                <p className="text-sm text-muted-foreground">
                  Completely biodegradable and compostable materials
                </p>
              </div>
              
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
                  <Award className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Certified Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Food-grade certified manufacturing
                </p>
              </div>
              
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">500+ Clients</h3>
                <p className="text-sm text-muted-foreground">
                  Trusted by businesses across India
                </p>
              </div>
              
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Made in India</h3>
                <p className="text-sm text-muted-foreground">
                  Supporting local manufacturing
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Manufacturing Section */}
        <div className="container py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Manufacturing</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our state-of-the-art manufacturing facility produces 75 lakh biodegradable cups annually. 
                We use advanced paper cup making machines with a capacity of 40-60 cups per minute, ensuring 
                consistent quality and timely delivery.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every product undergoes rigorous quality control to meet food safety standards. We source 
                sustainable raw materials from certified suppliers and maintain an eco-friendly production process.
              </p>
            </div>
            <div className="relative">
              <img
                src="/about-image.jpg"
                alt="VerdaCup Manufacturing Facility"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
