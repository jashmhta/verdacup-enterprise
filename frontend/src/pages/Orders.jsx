import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';
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

export default function Orders() {
  const { API, user } = useApp();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API}/orders/user/${user.id}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast.error('Failed to load orders');
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

  return (
    <div className="min-h-screen flex flex-col" data-testid="orders-page">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          <h1 className="text-3xl font-bold mb-8">My Orders</h1>

          {orders.length === 0 ? (
            <Card className="p-12" data-testid="no-orders">
              <div className="text-center">
                <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
                <p className="text-muted-foreground mb-6">Start shopping to place your first order</p>
                <Link to="/products" className="text-primary hover:underline">Browse Products</Link>
              </div>
            </Card>
          ) : (
            <div className="space-y-4" data-testid="orders-list">
              {orders.map((order) => (
                <Link key={order.id} to={`/orders/${order.id}`} data-testid={`order-${order.id}`}>
                  <Card className="card-hover">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">Order #{order.id.slice(0, 8).toUpperCase()}</h3>
                            <Badge className={statusColors[order.status]} data-testid={`order-status-${order.id}`}>
                              {order.status.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Shipping to: {order.shippingName}, {order.shippingCity}, {order.shippingState}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">₹{(order.total * 1.18 / 100).toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">Including GST</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}