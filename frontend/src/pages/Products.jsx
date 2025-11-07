import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import { useApp } from '@/App';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Products() {
  const { API, user, refreshCartCount } = useApp();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = selectedCategory
        ? `${API}/products?categoryId=${selectedCategory}`
        : `${API}/products`;
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await axios.post(`${API}/cart/${user.id}`, {
        productId,
        quantity: 1000
      });
      toast.success('Added to cart!');
      refreshCartCount();
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add to cart');
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col" data-testid="products-page">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-gradient-to-br from-[#F4F1E8] to-white py-12" data-testid="products-header">
          <div className="container">
            <h1 className="text-4xl font-bold mb-4">Our Products</h1>
            <p className="text-muted-foreground max-w-2xl">
              Explore our complete range of biodegradable cups. All products are 100% compostable and eco-friendly.
            </p>
          </div>
        </div>
        
        <div className="container py-8">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="search-input"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-64 flex-shrink-0" data-testid="category-filters">
              <div className="bg-white border rounded-lg p-6 sticky top-20">
                <h2 className="font-semibold text-lg mb-4">Categories</h2>
                <div className="space-y-2">
                  <Button
                    variant={selectedCategory === null ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(null)}
                    data-testid="category-all"
                  >
                    All Products
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category.id)}
                      data-testid={`category-${category.slug}`}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </aside>
            
            {/* Products Grid */}
            <div className="flex-1" data-testid="products-grid">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <>
                  <div className="mb-6 text-sm text-muted-foreground" data-testid="products-count">
                    Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <Card key={product.id} className="overflow-hidden card-hover" data-testid={`product-card-${product.slug}`}>
                        <Link to={`/products/${product.slug}`}>
                          <div className="aspect-square overflow-hidden bg-muted">
                            <img
                              src={product.imageUrl || 'https://via.placeholder.com/400'}
                              alt={product.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </Link>
                        <CardContent className="p-4">
                          <Link to={`/products/${product.slug}`}>
                            <h3 className="font-semibold text-base mb-2 hover:text-primary">{product.name}</h3>
                          </Link>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                            {product.capacity && <span>• {product.capacity}</span>}
                            {product.material && <span>• {product.material}</span>}
                          </div>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xl font-bold text-primary">₹{(product.price / 100).toFixed(2)}</p>
                              <p className="text-xs text-muted-foreground">per 1000 units</p>
                            </div>
                            <Button 
                              size="sm" 
                              onClick={() => handleAddToCart(product.id)}
                              data-testid={`add-to-cart-btn-${product.slug}`}
                            >
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12" data-testid="no-products">
                  <p className="text-muted-foreground text-lg">No products found.</p>
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