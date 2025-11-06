import { Metadata } from 'next';
import { Leaf, Award, Users, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about VerdaCup\'s mission to provide eco-friendly biodegradable cups. Leading manufacturer of paper and bagasse cups in India.',
};

export default function About() {
  return (
    <div>
      <div className="bg-primary/5 py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About VerdaCup</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Leading the sustainable packaging revolution in India
          </p>
        </div>
      </div>

      <div className="container py-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              VerdaCup is committed to providing high-quality, eco-friendly biodegradable cups that help businesses and individuals reduce their environmental impact. We believe that sustainable packaging should be accessible, affordable, and reliable.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Founded in India, VerdaCup emerged from a simple yet powerful vision: to create a sustainable alternative to traditional plastic cups without compromising on quality or affordability.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, we manufacture premium biodegradable cups made from paper and bagasse (sugarcane fiber), serving cafes, restaurants, event organizers, and businesses across India.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-primary/5 p-6 rounded-lg">
              <Leaf className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">100% Biodegradable</h3>
              <p className="text-muted-foreground">
                Our cups naturally decompose within 90 days, leaving no harmful residue in the environment.
              </p>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg">
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">
                Certified products that meet international quality standards for food-safe packaging.
              </p>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customer Focused</h3>
              <p className="text-muted-foreground">
                We work closely with our clients to provide customized solutions and reliable support.
              </p>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg">
              <TrendingUp className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Made in India</h3>
              <p className="text-muted-foreground">
                Proudly manufacturing in India, supporting local communities and sustainable practices.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Join the Green Revolution</h2>
            <p className="mb-6 text-lg opacity-90">
              Partner with VerdaCup for sustainable packaging solutions that make a difference.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
