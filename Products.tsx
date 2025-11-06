import { useState, useMemo } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { ProductCard } from '@/components/product/ProductCard';
import { SEOHead } from '@/components/seo/SEOHead';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@shared/const';

export default function Products() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  
  const { data: categories } = trpc.categories.list.useQuery();
  const { data: products, isLoading } = trpc.products.list.useQuery({
    categoryId: selectedCategory || undefined,
  });
  
  const addToCart = trpc.cart.add.useMutation();
  const utils = trpc.useUtils();
  
  // Get URL params for category filter
  useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const categorySlug = params.get('category');
    if (categorySlug && categories) {
      const category = categories.find(c => c.slug === categorySlug);
      if (category) {
        setSelectedCategory(category.id);
      }
    }
  }, [categories]);
  
  const handleAddToCart = async (productId: number) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      setTimeout(() => {
        window.location.href = getLoginUrl();
      }, 1500);
      return;
    }
    
    try {
      await addToCart.mutateAsync({
        productId,
        quantity: 1000,
      });
      toast.success('Product added to cart!');
      utils.cart.list.invalidate();
    } catch (error) {
      toast.error('Failed to add product to cart');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Biodegradable Cups - Paper & Bagasse Cups | VerdaCup"
        description="Browse our complete range of biodegradable paper cups and bagasse cups. Eco-friendly disposable cups in various sizes. Bulk orders available with custom printing."
        url="/products"
      />
      <Header />
      
      <main>
        <div className="bg-primary/5 py-12">
          <div className="container">
            <h1 className="text-4xl font-bold mb-4">Our Products</h1>
            <p className="text-muted-foreground max-w-2xl">
              Explore our complete range of biodegradable cups. All products are 100% compostable and eco-friendly.
            </p>
          </div>
        </div>
        
        <div className="container py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-card border rounded-lg p-6 sticky top-20">
                <h2 className="font-semibold mb-4">Categories</h2>
                <div className="space-y-2">
                  <Button
                    variant={selectedCategory === null ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedCategory(null);
                      setLocation('/products');
                    }}
                  >
                    All Products
                  </Button>
                  
                  {categories?.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setLocation(`/products?category=${category.slug}`);
                      }}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </aside>
            
            {/* Products Grid */}
            <div className="flex-1">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : products && products.length > 0 ? (
                <>
                  <div className="mb-4 text-sm text-muted-foreground">
                    Showing {products.length} product{products.length !== 1 ? 's' : ''}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No products found in this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
