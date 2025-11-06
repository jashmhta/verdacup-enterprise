import { useState } from 'react';
import { useRoute, Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { SEOHead } from '@/components/seo/SEOHead';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@shared/const';
import { ShoppingCart, Package, ArrowLeft, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@shared/const';

export default function ProductDetail() {
  const [, params] = useRoute('/products/:slug');
  const slug = params?.slug || '';
  
  const { isAuthenticated } = useAuth();
  const { data: product, isLoading } = trpc.products.getBySlug.useQuery({ slug });
  const addToCart = trpc.cart.add.useMutation();
  const utils = trpc.useUtils();
  
  const [quantity, setQuantity] = useState(1000);
  
  const handleQuantityChange = (value: string) => {
    const num = parseInt(value) || 0;
    setQuantity(Math.max(product?.minOrderQty || 1000, num));
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1000);
  };
  
  const decrementQuantity = () => {
    if (product) {
      setQuantity(prev => Math.max(product.minOrderQty, prev - 1000));
    }
  };
  
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      setTimeout(() => {
        window.location.href = getLoginUrl();
      }, 1500);
      return;
    }
    
    if (!product) return;
    
    try {
      await addToCart.mutateAsync({
        productId: product.id,
        quantity,
      });
      toast.success(`Added ${quantity.toLocaleString()} units to cart!`);
      utils.cart.list.invalidate();
    } catch (error) {
      toast.error('Failed to add product to cart');
    }
  };
  
  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-8" />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-square bg-muted rounded-lg" />
            <div className="space-y-4">
              <div className="h-10 bg-muted rounded w-3/4" />
              <div className="h-6 bg-muted rounded w-1/2" />
              <div className="h-20 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Button asChild>
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }
  
  const isOutOfStock = product.stock === 0;
  const totalPrice = product.price * quantity;
  
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title={`${product.name} - Biodegradable Cup | VerdaCup`}
        description={product.description || `Buy ${product.name} - ${product.capacity} biodegradable cup. Eco-friendly and compostable. Minimum order ${product.minOrderQty} pieces.`}
        url={`/products/${product.slug}`}
        type="product"
      />
      <Header />
      
      <main className="flex-1">
        <div className="container py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
            {product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
            ) : (
              <Package className="h-48 w-48 text-muted-foreground" />
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-3 mb-6">
              {product.capacity && (
                <span className="px-3 py-1 bg-secondary/20 text-secondary-foreground rounded-full text-sm font-medium">
                  {product.capacity}
                </span>
              )}
              {product.material && (
                <span className="px-3 py-1 bg-primary/20 text-primary-foreground rounded-full text-sm font-medium">
                  {product.material}
                </span>
              )}
              {product.wallType && (
                <span className="px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-sm font-medium">
                  {product.wallType}
                </span>
              )}
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                <span className="text-muted-foreground">per piece</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Minimum Order Quantity: {product.minOrderQty.toLocaleString()} pieces
              </p>
            </div>
            
            <div className="prose prose-sm mb-8">
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity (pieces)</label>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= product.minOrderQty}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  min={product.minOrderQty}
                  step={1000}
                  className="text-center w-32"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Total: {formatPrice(totalPrice)}
              </p>
            </div>
            
            {/* Add to Cart Button */}
            {isOutOfStock ? (
              <Button size="lg" variant="secondary" className="w-full" disabled>
                Out of Stock
              </Button>
            ) : (
              <Button 
                size="lg" 
                className="w-full"
                onClick={handleAddToCart}
                disabled={addToCart.isPending}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {addToCart.isPending ? 'Adding...' : 'Add to Cart'}
              </Button>
            )}
            
            {/* Product Features */}
            <div className="mt-8 space-y-4 border-t pt-6">
              <h3 className="font-semibold">Product Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ 100% Biodegradable and compostable</li>
                <li>✓ Food-grade certified material</li>
                <li>✓ Leak-proof design</li>
                <li>✓ Suitable for hot and cold beverages</li>
                <li>✓ Made in India</li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
