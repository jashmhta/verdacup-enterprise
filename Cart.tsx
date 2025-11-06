import { Link, useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { SEOHead } from '@/components/seo/SEOHead';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@shared/const';
import { ShoppingBag, Trash2, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@shared/const';

export default function Cart() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const { data: cartItems, isLoading } = trpc.cart.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  
  const updateCart = trpc.cart.update.useMutation();
  const removeFromCart = trpc.cart.remove.useMutation();
  const utils = trpc.useUtils();
  
  if (!isAuthenticated) {
    return (
      <div className="container py-16 text-center">
        <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">Please login to view your cart</p>
        <Button asChild>
          <a href={getLoginUrl()}>Login</a>
        </Button>
      </div>
    );
  }
  
  const handleUpdateQuantity = async (cartId: number, newQuantity: number, minQty: number) => {
    if (newQuantity < minQty) {
      toast.error(`Minimum order quantity is ${minQty}`);
      return;
    }
    
    try {
      await updateCart.mutateAsync({ cartId, quantity: newQuantity });
      utils.cart.list.invalidate();
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };
  
  const handleRemove = async (cartId: number) => {
    try {
      await removeFromCart.mutateAsync({ cartId });
      toast.success('Item removed from cart');
      utils.cart.list.invalidate();
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SEOHead title="Shopping Cart | VerdaCup" url="/cart" />
        <Header />
        
        <main className="flex-1">
          <div className="container py-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-1/4" />
              <div className="h-32 bg-muted rounded" />
              <div className="h-32 bg-muted rounded" />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <SEOHead title="Shopping Cart | VerdaCup" url="/cart" />
        <Header />
        
        <main className="flex-1">
          <div className="container py-16 text-center">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
            <Button asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);
  
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead title="Shopping Cart | VerdaCup" url="/cart" />
      <Header />
      
      <main className="flex-1">
        <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              if (!item.product) return null;
              
              const product = item.product;
              const itemTotal = product.price * item.quantity;
              
              return (
                <div key={item.id} className="bg-card border rounded-lg p-4">
                  <div className="flex gap-4">
                    <Link href={`/products/${product.slug}`} className="flex-shrink-0">
                      <div className="w-24 h-24 bg-muted rounded flex items-center justify-center">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain p-2" />
                        ) : (
                          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                        )}
                      </div>
                    </Link>
                    
                    <div className="flex-1">
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="font-semibold hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-2">
                        {product.capacity} • {product.material}
                      </p>
                      <p className="text-sm font-medium text-primary mb-3">
                        {formatPrice(product.price)} per piece
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1000, product.minOrderQty)}
                            disabled={item.quantity <= product.minOrderQty}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input 
                            type="number" 
                            value={item.quantity}
                            onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || product.minOrderQty, product.minOrderQty)}
                            min={product.minOrderQty}
                            step={1000}
                            className="text-center w-24 h-8"
                          />
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1000, product.minOrderQty)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRemove(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-lg">{formatPrice(itemTotal)}</p>
                    </div>
                  </div>
        </div>
      </div>
      </main>
      
      <Footer />
    </div>
              );
            })}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border rounded-lg p-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl text-primary">{formatPrice(subtotal)}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="w-full mb-3"
                onClick={() => setLocation('/checkout')}
              >
                Proceed to Checkout
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                asChild
              >
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
