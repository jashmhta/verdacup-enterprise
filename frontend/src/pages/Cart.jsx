import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import axios from 'axios';
import { useApp } from '@/App';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Cart() {
  const navigate = useNavigate();
  const { API, user, refreshCartCount } = useApp();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API}/cart/${user.id}`);
      setCartItems(response.data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1000) return;
    try {
      await axios.patch(`${API}/cart/${cartId}`, { quantity: newQuantity });
      setCartItems(items =>
        items.map(item =>
          item.id === cartId ? { ...item, quantity: newQuantity } : item
        )
      );
      toast.success('Quantity updated');
    } catch (error) {
      console.error('Failed to update quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const removeItem = async (cartId) => {
    try {
      await axios.delete(`${API}/cart/${cartId}`);
      setCartItems(items => items.filter(item => item.id !== cartId));
      refreshCartCount();
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Failed to remove item:', error);
      toast.error('Failed to remove item');
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" data-testid="cart-page">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          <h1 className="text-3xl font-bold mb-8" data-testid="cart-title">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <Card className="p-12" data-testid="empty-cart">
              <div className="text-center">
                <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
                <Button asChild data-testid="continue-shopping-btn">
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4" data-testid="cart-items">
                {cartItems.map((item) => (
                  <Card key={item.id} data-testid={`cart-item-${item.id}`}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={item.product?.imageUrl || 'https://via.placeholder.com/100'}
                            alt={item.product?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <Link to={`/products/${item.product?.slug}`}>
                            <h3 className="font-semibold mb-1 hover:text-primary">
                              {item.product?.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground mb-3">
                            {item.product?.capacity} • {item.product?.material}
                          </p>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1000)}
                              data-testid={`decrease-qty-${item.id}`}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 1000;
                                updateQuantity(item.id, val);
                              }}
                              className="w-24 h-8 text-center"
                              data-testid={`quantity-input-${item.id}`}
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1000)}
                              data-testid={`increase-qty-${item.id}`}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary mb-2">
                            ₹{((item.product?.price || 0) * item.quantity / 100).toFixed(2)}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeItem(item.id)}
                            data-testid={`remove-item-${item.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20" data-testid="order-summary">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">₹{(total / 100).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax (18% GST)</span>
                        <span className="font-medium">₹{(total * 0.18 / 100).toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-3 flex justify-between text-lg">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-primary">₹{(total * 1.18 / 100).toFixed(2)}</span>
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => navigate('/checkout')}
                      data-testid="proceed-checkout-btn"
                    >
                      Proceed to Checkout
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full mt-3"
                      asChild
                      data-testid="continue-shopping-summary-btn"
                    >
                      <Link to="/products">Continue Shopping</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}