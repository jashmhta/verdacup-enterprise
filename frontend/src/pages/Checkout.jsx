import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { useApp } from '@/App';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Checkout() {
  const navigate = useNavigate();
  const { API, user, refreshCartCount } = useApp();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    shippingName: '',
    shippingPhone: '',
    shippingEmail: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingPincode: '',
    notes: ''
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API}/cart/${user.id}`);
      if (response.data.length === 0) {
        toast.error('Your cart is empty');
        navigate('/products');
        return;
      }
      setCartItems(response.data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await axios.post(`${API}/orders`, {
        userId: user.id,
        ...formData
      });
      
      toast.success('Order placed successfully!');
      refreshCartCount();
      navigate(`/orders/${response.data.id}`);
    } catch (error) {
      console.error('Failed to place order:', error);
      toast.error('Failed to place order');
    } finally {
      setSubmitting(false);
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
    <div className="min-h-screen flex flex-col" data-testid="checkout-page">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping Form */}
            <div className="lg:col-span-2">
              <Card data-testid="shipping-form">
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="shippingName">Full Name *</Label>
                        <Input
                          id="shippingName"
                          name="shippingName"
                          value={formData.shippingName}
                          onChange={handleChange}
                          required
                          data-testid="shipping-name-input"
                        />
                      </div>
                      <div>
                        <Label htmlFor="shippingPhone">Phone Number *</Label>
                        <Input
                          id="shippingPhone"
                          name="shippingPhone"
                          value={formData.shippingPhone}
                          onChange={handleChange}
                          required
                          data-testid="shipping-phone-input"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="shippingEmail">Email Address</Label>
                      <Input
                        id="shippingEmail"
                        name="shippingEmail"
                        type="email"
                        value={formData.shippingEmail}
                        onChange={handleChange}
                        data-testid="shipping-email-input"
                      />
                    </div>

                    <div>
                      <Label htmlFor="shippingAddress">Address *</Label>
                      <Textarea
                        id="shippingAddress"
                        name="shippingAddress"
                        value={formData.shippingAddress}
                        onChange={handleChange}
                        required
                        rows={3}
                        data-testid="shipping-address-input"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="shippingCity">City *</Label>
                        <Input
                          id="shippingCity"
                          name="shippingCity"
                          value={formData.shippingCity}
                          onChange={handleChange}
                          required
                          data-testid="shipping-city-input"
                        />
                      </div>
                      <div>
                        <Label htmlFor="shippingState">State *</Label>
                        <Input
                          id="shippingState"
                          name="shippingState"
                          value={formData.shippingState}
                          onChange={handleChange}
                          required
                          data-testid="shipping-state-input"
                        />
                      </div>
                      <div>
                        <Label htmlFor="shippingPincode">Pincode *</Label>
                        <Input
                          id="shippingPincode"
                          name="shippingPincode"
                          value={formData.shippingPincode}
                          onChange={handleChange}
                          required
                          data-testid="shipping-pincode-input"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="notes">Order Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Any special instructions for your order..."
                        data-testid="order-notes-input"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={submitting}
                      data-testid="place-order-btn"
                    >
                      {submitting ? 'Placing Order...' : 'Place Order'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20" data-testid="checkout-summary">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.product?.name} × {item.quantity}
                        </span>
                        <span className="font-medium">
                          ₹{((item.product?.price || 0) * item.quantity / 100).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3 pt-4 border-t">
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}