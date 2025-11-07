import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import axios from 'axios';
import { useApp } from '@/App';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AdminDashboard() {
  const { API } = useApp();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        axios.get(`${API}/products`),
        axios.get(`${API}/orders`)
      ]);

      const products = productsRes.data;
      const orders = ordersRes.data;
      
      const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
      const pendingOrders = orders.filter(o => o.status === 'pending').length;

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue,
        pendingOrders
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
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
    <div className="min-h-screen flex flex-col" data-testid="admin-dashboard">
      <Header />
      
      <main className="flex-1 py-8 bg-muted/30">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="flex gap-3">
              <Button asChild variant="outline" data-testid="manage-products-btn">
                <Link to="/admin/products">Manage Products</Link>
              </Button>
              <Button asChild variant="outline" data-testid="manage-orders-btn">
                <Link to="/admin/orders">Manage Orders</Link>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card data-testid="stat-products">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Products</p>
                    <p className="text-3xl font-bold mt-1">{stats.totalProducts}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="stat-orders">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                    <p className="text-3xl font-bold mt-1">{stats.totalOrders}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="stat-revenue">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-3xl font-bold mt-1">₹{(stats.totalRevenue / 100).toFixed(0)}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="stat-pending">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Orders</p>
                    <p className="text-3xl font-bold mt-1">{stats.pendingOrders}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button asChild variant="outline" className="h-20" data-testid="add-product-btn">
                  <Link to="/admin/products">
                    <div className="text-center">
                      <Package className="h-6 w-6 mx-auto mb-2" />
                      <span>Add New Product</span>
                    </div>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-20" data-testid="view-orders-btn">
                  <Link to="/admin/orders">
                    <div className="text-center">
                      <ShoppingCart className="h-6 w-6 mx-auto mb-2" />
                      <span>View All Orders</span>
                    </div>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-20" data-testid="back-store-btn">
                  <Link to="/">
                    <div className="text-center">
                      <TrendingUp className="h-6 w-6 mx-auto mb-2" />
                      <span>Back to Store</span>
                    </div>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}