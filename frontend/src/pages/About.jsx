import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Award, Users, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col" data-testid="about-page">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#F4F1E8] to-white py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">About VerdaCup</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Leading the revolution in sustainable packaging solutions across India with 100% biodegradable cups.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  VerdaCup was founded with a simple yet powerful mission: to eliminate single-use plastic waste from India's food and beverage industry. We recognized that millions of disposable cups end up in landfills every day, taking hundreds of years to decompose.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our journey began in 2020 when a group of environmental engineers and entrepreneurs came together to create a sustainable alternative. Today, we're proud to be one of India's leading manufacturers of biodegradable paper and bagasse cups.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Every cup we produce is 100% compostable, breaking down naturally within 90-180 days. We use sustainably sourced paper and sugarcane bagasse (a byproduct of sugar production) to create premium quality cups that are safe for hot and cold beverages.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-gradient-to-b from-white to-[#F4F1E8]/30">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-none shadow-md">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Sustainability</h3>
                  <p className="text-sm text-muted-foreground">
                    Committed to protecting the environment with every product we make
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    Premium products that meet international food-grade standards
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Partnership</h3>
                  <p className="text-sm text-muted-foreground">
                    Building lasting relationships with businesses across India
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Innovation</h3>
                  <p className="text-sm text-muted-foreground">
                    Continuously improving our products and processes
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-5xl font-bold text-primary mb-2">1000+</p>
                <p className="text-muted-foreground">Business Partners</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-primary mb-2">50M+</p>
                <p className="text-muted-foreground">Cups Produced</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-primary mb-2">100%</p>
                <p className="text-muted-foreground">Biodegradable</p>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 bg-primary/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Certifications & Quality</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                All our products are certified food-grade and meet international quality standards. We follow strict manufacturing processes to ensure every cup is safe, durable, and environmentally friendly.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                  <p className="font-semibold">ISO 9001:2015</p>
                </div>
                <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                  <p className="font-semibold">Food Grade Certified</p>
                </div>
                <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                  <p className="font-semibold">100% Compostable</p>
                </div>
                <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                  <p className="font-semibold">Made in India</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}