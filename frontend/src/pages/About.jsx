import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Award, Users, TrendingUp, Target, Heart, Sparkles, Factory, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col" data-testid="about-page">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with Background */}
        <section className="relative overflow-hidden min-h-[400px] flex items-center">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1534709153997-d6659469f951?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwzfHxzdXN0YWluYWJsZXxlbnwwfHx8fDE3NjI1MjYxOTB8MA&ixlib=rb-4.1.0&q=85')`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80"></div>
          </div>
          <div className="container relative z-10 py-16 text-center text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">About VerdaCup</h1>
            <p className="text-lg sm:text-xl opacity-90 max-w-3xl mx-auto">
              Leading the revolution in sustainable packaging solutions across India with enterprise-grade biodegradable cups designed for businesses that care.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    VerdaCup was founded in 2020 with a powerful vision: to eliminate single-use plastic waste from India's food and beverage industry. We recognized that millions of disposable cups end up in landfills daily, taking centuries to decompose and causing irreversible environmental damage.
                  </p>
                  <p>
                    Our journey began when a group of environmental engineers, sustainability experts, and entrepreneurs came together to create a viable alternative. We invested heavily in research and development, partnering with leading environmental scientists to design cups that match or exceed the performance of traditional plastic while being 100% biodegradable.
                  </p>
                  <p>
                    Today, we're proud to be one of India's premier manufacturers of biodegradable paper and bagasse cups. Our state-of-the-art facility produces over 50 million cups annually, serving more than 1,000 businesses across the country. Every cup we produce carries our commitment to quality, sustainability, and innovation.
                  </p>
                  <p className="font-semibold text-primary">
                    From cafes and restaurants to corporate offices and event venues, VerdaCup is helping businesses make the sustainable switch without compromising on quality or performance.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1696568720558-7b6aa2ffe067?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxiaW9kZWdyYWRhYmxlJTIwY3Vwc3xlbnwwfHx8fDE3NjI1MjYxNzd8MA&ixlib=rb-4.1.0&q=85" 
                      alt="Biodegradable Cups" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                    <img 
                      src="https://images.pexels.com/photos/886521/pexels-photo-886521.jpeg" 
                      alt="Sustainability" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1591184510248-6be5138855a0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxlY28tZnJpZW5kbHl8ZW58MHx8fHwxNzYyNTI2MTg1fDA&ixlib=rb-4.1.0&q=85" 
                      alt="Eco Friendly" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1696568720371-6d2a535a1ddf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxiaW9kZWdyYWRhYmxlJTIwY3Vwc3xlbnwwfHx8fDE3NjI1MjYxNzd8MA&ixlib=rb-4.1.0&q=85" 
                      alt="Products" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-gradient-to-b from-[#F4F1E8] to-white">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="border-none shadow-xl">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide businesses across India with premium, affordable, and sustainable packaging solutions that protect our environment while maintaining the highest standards of quality and performance. We're committed to making eco-friendly choices accessible to all.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To become India's most trusted name in sustainable packaging, expanding our impact to eliminate plastic waste from the food and beverage industry nationwide. We envision a future where every business chooses sustainability as the standard, not the exception.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide every decision we make and every product we create
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-none shadow-lg card-hover">
                <CardContent className="pt-10 pb-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                    <Leaf className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Sustainability First</h3>
                  <p className="text-sm text-muted-foreground">
                    Environmental responsibility is at the core of everything we do, from sourcing to manufacturing
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg card-hover">
                <CardContent className="pt-10 pb-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                    <Award className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Uncompromising Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    ISO certified processes ensuring every cup meets international food-grade standards
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg card-hover">
                <CardContent className="pt-10 pb-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Customer Partnership</h3>
                  <p className="text-sm text-muted-foreground">
                    Building lasting relationships through reliable service, fair pricing, and dedicated support
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg card-hover">
                <CardContent className="pt-10 pb-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                    <TrendingUp className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Continuous Innovation</h3>
                  <p className="text-sm text-muted-foreground">
                    Investing in research and technology to constantly improve our products and processes
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-20 bg-gradient-to-br from-primary to-accent text-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Impact</h2>
              <p className="text-white/90 max-w-2xl mx-auto">
                Real numbers that demonstrate our commitment to sustainability and excellence
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <p className="text-5xl font-bold mb-2">1000+</p>
                <p className="text-lg opacity-90">Business Partners</p>
                <p className="text-sm opacity-75 mt-2">Across India</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <p className="text-5xl font-bold mb-2">50M+</p>
                <p className="text-lg opacity-90">Cups Produced</p>
                <p className="text-sm opacity-75 mt-2">Annually</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <p className="text-5xl font-bold mb-2">90-180</p>
                <p className="text-lg opacity-90">Days to Compost</p>
                <p className="text-sm opacity-75 mt-2">100% Biodegradable</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <p className="text-5xl font-bold mb-2">0%</p>
                <p className="text-lg opacity-90">Plastic Content</p>
                <p className="text-sm opacity-75 mt-2">Completely Eco-Friendly</p>
              </div>
            </div>
          </div>
        </section>

        {/* Manufacturing Process */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Manufacturing Process</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                State-of-the-art facilities combining technology with sustainability
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <img 
                      src="https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg" 
                      alt="Raw Materials" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Sustainable Sourcing</h3>
                  <p className="text-sm text-muted-foreground">
                    We source responsibly harvested paper and sugarcane bagasse from certified suppliers, ensuring environmental compliance at every step.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <img 
                      src="https://images.pexels.com/photos/3737675/pexels-photo-3737675.jpeg" 
                      alt="Manufacturing" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Advanced Production</h3>
                  <p className="text-sm text-muted-foreground">
                    Our automated machinery ensures precision manufacturing with minimal waste, maintaining consistent quality across millions of units.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1696568720493-bd5f7ae24eef?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHw0fHxiaW9kZWdyYWRhYmxlJTIwY3Vwc3xlbnwwfHx8fDE3NjI1MjYxNzd8MA&ixlib=rb-4.1.0&q=85" 
                      alt="Quality Control" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Rigorous Testing</h3>
                  <p className="text-sm text-muted-foreground">
                    Every batch undergoes comprehensive quality checks for leak resistance, temperature tolerance, and food safety compliance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 bg-gradient-to-b from-[#F4F1E8] to-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Certifications & Quality Assurance</h2>
              <p className="text-muted-foreground leading-relaxed mb-10">
                All our products are certified food-grade and meet international quality standards. We follow strict manufacturing processes to ensure every cup is safe, durable, and environmentally friendly.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Card className="border-2 border-primary/20 shadow-md">
                  <CardContent className="p-6 text-center">
                    <Award className="h-12 w-12 text-primary mx-auto mb-3" />
                    <p className="font-bold text-sm">ISO 9001:2015</p>
                    <p className="text-xs text-muted-foreground mt-1">Quality Management</p>
                  </CardContent>
                </Card>
                <Card className="border-2 border-primary/20 shadow-md">
                  <CardContent className="p-6 text-center">
                    <Shield className="h-12 w-12 text-primary mx-auto mb-3" />
                    <p className="font-bold text-sm">Food Grade</p>
                    <p className="text-xs text-muted-foreground mt-1">Certified Safe</p>
                  </CardContent>
                </Card>
                <Card className="border-2 border-primary/20 shadow-md">
                  <CardContent className="p-6 text-center">
                    <Leaf className="h-12 w-12 text-primary mx-auto mb-3" />
                    <p className="font-bold text-sm">100% Compostable</p>
                    <p className="text-xs text-muted-foreground mt-1">Eco Certified</p>
                  </CardContent>
                </Card>
                <Card className="border-2 border-primary/20 shadow-md">
                  <CardContent className="p-6 text-center">
                    <Heart className="h-12 w-12 text-primary mx-auto mb-3" />
                    <p className="font-bold text-sm">Made in India</p>
                    <p className="text-xs text-muted-foreground mt-1">Proudly Indian</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white">
          <div className="container text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join the Sustainable Revolution</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Partner with VerdaCup and make a positive impact on the environment while providing your customers with premium quality products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/products">Browse Products</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
