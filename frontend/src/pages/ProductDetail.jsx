import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Minus, Plus, Package, Leaf, Award } from 'lucide-react';
import axios from 'axios';
import { useApp } from '@/App';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductDetail() {
  const { slug } = useParams();
  const { API, user, refreshCartCount } = useApp();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1000);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API}/products/slug/${slug}`);
      setProduct(response.data);
      setQuantity(response.data.minOrderQty || 1000);
    } catch (error) {
      console.error('Failed to fetch product:', error);
      toast.error('Product not found');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      await axios.post(`${API}/cart/${user.id}`, {
        productId: product.id,
        quantity
      });
      toast.success('Added to cart!');
      refreshCartCount();
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add to cart');
    }
  };

  const incrementQuantity = () => {
    setQuantity(q => q + 1000);
  };

  const decrementQuantity = () => {
    const minQty = product?.minOrderQty || 1000;
    setQuantity(q => Math.max(minQty, q - 1000));
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

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product not found</h2>
            <Button asChild><Link to="/products">Back to Products</Link></Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" data-testid="product-detail-page">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm" data-testid="breadcrumb">
            <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <Link to="/products" className="text-muted-foreground hover:text-primary">Products</Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="aspect-square rounded-lg overflow-hidden bg-muted" data-testid="product-image">
              <img
                src={product.imageUrl || 'https://via.placeholder.com/600'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div data-testid="product-info">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="product-name">{product.name}</h1>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-primary" data-testid="product-price">₹{(product.price / 100).toFixed(2)}</span>
                <span className="text-muted-foreground">per 1000 units</span>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed" data-testid="product-description">
                {product.description}
              </p>

              {/* Specifications */}
              <Card className="mb-6" data-testid="product-specs">
                <CardHeader>
                  <CardTitle className="text-lg">Specifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {product.capacity && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capacity:</span>
                      <span className="font-medium">{product.capacity}</span>
                    </div>
                  )}
                  {product.material && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Material:</span>
                      <span className="font-medium">{product.material}</span>
                    </div>
                  )}
                  {product.wallType && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Wall Type:</span>
                      <span className="font-medium">{product.wallType}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Min Order Qty:</span>
                    <span className="font-medium">{product.minOrderQty} units</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stock:</span>
                    <span className="font-medium text-green-600">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quantity Selector */}
              <div className="mb-6" data-testid="quantity-selector">
                <label className="block text-sm font-medium mb-2">Quantity (in thousands)</label>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon" onClick={decrementQuantity} data-testid="decrease-qty-btn">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(product.minOrderQty, parseInt(e.target.value) || 0))}
                    className="w-32 text-center"
                    data-testid="quantity-input"
                  />
                  <Button variant="outline" size="icon" onClick={incrementQuantity} data-testid="increase-qty-btn">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Total: <span className="font-semibold text-primary">₹{((product.price * quantity) / 100).toFixed(2)}</span>
                </p>
              </div>

              {/* Add to Cart Button */}
              <Button size="lg" className="w-full" onClick={handleAddToCart} data-testid="add-to-cart-btn">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>

              {/* Features */}
              <div className="mt-8 space-y-4" data-testid="product-features">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Leaf className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">100% Biodegradable</h4>
                    <p className="text-sm text-muted-foreground">Completely compostable within 90-180 days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Food Grade Certified</h4>
                    <p className="text-sm text-muted-foreground">Safe for hot and cold beverages</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Bulk Pricing Available</h4>
                    <p className="text-sm text-muted-foreground">Competitive rates for large orders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}