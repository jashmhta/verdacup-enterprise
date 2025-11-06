import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { trpc } from '@/lib/trpc';
import { Leaf, Award, TrendingUp, Package, CheckCircle, Star } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEOHead } from '@/components/seo/SEOHead';
import { formatPrice } from '@shared/const';

export default function Home() {
  const { data: products, isLoading } = trpc.products.list.useQuery({});

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="VerdaCup - Premium Biodegradable Cups | Eco-Friendly Packaging Solutions"
        description="Leading manufacturer of biodegradable paper and bagasse cups in India. 100% compostable, eco-friendly disposable cups for cafes, offices, and events. Wholesale pricing available."
        keywords="biodegradable cups, paper cups, bagasse cups, eco-friendly cups, compostable cups, sustainable packaging, disposable cups India"
      />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-background via-background to-muted">
          <div className="absolute inset-0 bg-[url('/hero-banner.jpg')] bg-cover bg-center opacity-10"></div>
          <div className="container relative py-20 md:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Sustainable Cups for a <span className="text-primary">Greener Tomorrow</span>