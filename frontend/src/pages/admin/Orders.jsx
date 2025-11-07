import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

export default function AdminOrders() {
  const { API } = useApp();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API}/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`${API}/orders/${orderId}/status?status=${newStatus}`);
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      toast.success('Order status updated');
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update status');
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
    <div className="min-h-screen flex flex-col" data-testid="admin-orders">
      <Header />
      
      <main className="flex-1 py-8 bg-muted/30">
        <div className="container">
          <h1 className="text-3xl font-bold mb-8">Manage Orders</h1>

          {orders.length === 0 ? (
            <Card className="p-12">
              <div className="text-center">
                <p className="text-muted-foreground">No orders yet</p>
              </div>
            </Card>
          ) : (
            <div className="space-y-4" data-testid="admin-orders-list">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Order #{order.id.slice(0, 8).toUpperCase()}</h3>
                        <p className="text-sm text-muted-foreground mb-1">
                          {new Date(order.createdAt).toLocaleDateString('en-IN')}
                        </p>
                        <Badge className={statusColors[order.status]}>
                          {order.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Customer</p>
                        <p className="font-medium">{order.shippingName}</p>
                        <p className="text-sm text-muted-foreground">{order.shippingPhone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Location</p>
                        <p className="font-medium">{order.shippingCity}</p>
                        <p className="text-sm text-muted-foreground">{order.shippingState}</p>
                      </div>
                      <div className="flex flex-col justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total</p>
                          <p className="text-2xl font-bold text-primary">₹{(order.total * 1.18 / 100).toFixed(2)}</p>
                        </div>
                        <Select
                          value={order.status}
                          onValueChange={(value) => handleStatusChange(order.id, value)}
                        >
                          <SelectTrigger data-testid={`status-select-${order.id}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}