import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useApp } from '@/App';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  shipped: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

export default function OrderDetail() {
  const { orderId } = useParams();
  const { API } = useApp();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`${API}/orders/${orderId}`);
      setOrder(response.data);
    } catch (error) {
      console.error('Failed to fetch order:', error);
      toast.error('Order not found');
    } finally {
      setLoading(false);
    }
  };

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

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Order not found</h2>
            <Button asChild><Link to="/orders">Back to Orders</Link></Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" data-testid="order-detail-page">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          <Button variant="ghost" asChild className="mb-6" data-testid="back-to-orders-btn">
            <Link to="/orders">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Link>
          </Button>

          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-3xl font-bold">Order #{order.id.slice(0, 8).toUpperCase()}</h1>
            <Badge className={statusColors[order.status]} data-testid="order-status">
              {order.status.toUpperCase()}
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="lg:col-span-2">
              <Card data-testid="order-items">
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items?.map((item) => (
                      <div key={item.id} className="flex justify-between py-3 border-b last:border-0">
                        <div>
                          <h4 className="font-medium">{item.productName}</h4>
                          <p className="text-sm text-muted-foreground">Quantity: {item.quantity} units</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{(item.price * item.quantity / 100).toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">₹{(item.price / 100).toFixed(2)} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Details */}
            <div className="lg:col-span-1 space-y-6">
              <Card data-testid="order-summary">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">₹{(order.total / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (18% GST)</span>
                      <span className="font-medium">₹{(order.total * 0.18 / 100).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between text-lg">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-primary">₹{(order.total * 1.18 / 100).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="shipping-info">
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Name</p>
                    <p>{order.shippingName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p>{order.shippingPhone}</p>
                  </div>
                  {order.shippingEmail && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p>{order.shippingEmail}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Address</p>
                    <p>{order.shippingAddress}</p>
                    <p>{order.shippingCity}, {order.shippingState} - {order.shippingPincode}</p>
                  </div>
                  {order.notes && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Notes</p>
                      <p className="text-sm">{order.notes}</p>
                    </div>
                  )}
                  <div className="pt-2">
                    <p className="text-sm font-medium text-muted-foreground">Order Date</p>
                    <p>{new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</p>
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