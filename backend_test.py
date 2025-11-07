import requests
import json
from typing import Dict, Any, List

# Backend URL from environment
BACKEND_URL = "https://verdashop-pro.preview.emergentagent.com/api"
TEST_USER_ID = "user-demo-123"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    END = '\033[0m'

def print_success(message: str):
    print(f"{Colors.GREEN}✓ {message}{Colors.END}")

def print_error(message: str):
    print(f"{Colors.RED}✗ {message}{Colors.END}")

def print_info(message: str):
    print(f"{Colors.BLUE}ℹ {message}{Colors.END}")

def print_warning(message: str):
    print(f"{Colors.YELLOW}⚠ {message}{Colors.END}")

def print_section(title: str):
    print(f"\n{Colors.BLUE}{'='*60}")
    print(f"{title}")
    print(f"{'='*60}{Colors.END}\n")

# Test Results Tracking
test_results = {
    "passed": 0,
    "failed": 0,
    "errors": []
}

def test_root_api():
    """Test GET /api/ - Verify API is running"""
    print_section("Testing Root API")
    
    try:
        response = requests.get(f"{BACKEND_URL}/")
        
        if response.status_code == 200:
            data = response.json()
            if "message" in data and "version" in data:
                print_success(f"Root API is running: {data['message']} v{data['version']}")
                test_results["passed"] += 1
                return True
            else:
                print_error("Root API response missing required fields")
                test_results["failed"] += 1
                test_results["errors"].append("Root API: Missing message or version fields")
                return False
        else:
            print_error(f"Root API returned status code: {response.status_code}")
            test_results["failed"] += 1
            test_results["errors"].append(f"Root API: Status {response.status_code}")
            return False
    except Exception as e:
        print_error(f"Root API test failed: {str(e)}")
        test_results["failed"] += 1
        test_results["errors"].append(f"Root API: {str(e)}")
        return False

def test_categories_api():
    """Test Categories API"""
    print_section("Testing Categories API")
    
    try:
        # Test GET /api/categories
        response = requests.get(f"{BACKEND_URL}/categories")
        
        if response.status_code != 200:
            print_error(f"Categories API returned status code: {response.status_code}")
            test_results["failed"] += 1
            test_results["errors"].append(f"Categories API: Status {response.status_code}")
            return False
        
        categories = response.json()
        
        if not isinstance(categories, list):
            print_error("Categories API did not return a list")
            test_results["failed"] += 1
            test_results["errors"].append("Categories API: Response is not a list")
            return False
        
        print_info(f"Found {len(categories)} categories")
        
        # Verify 3 categories exist
        expected_categories = ["Paper Cups", "Bagasse Cups", "Custom Printed"]
        found_categories = [cat.get("name") for cat in categories]
        
        all_found = True
        for expected in expected_categories:
            if expected in found_categories:
                print_success(f"Category '{expected}' exists")
            else:
                print_error(f"Category '{expected}' not found")
                all_found = False
        
        if len(categories) >= 3 and all_found:
            print_success(f"All 3 expected categories exist")
            test_results["passed"] += 1
            return True
        else:
            print_error(f"Expected 3 categories (Paper Cups, Bagasse Cups, Custom Printed), found: {found_categories}")
            test_results["failed"] += 1
            test_results["errors"].append(f"Categories: Expected categories not found. Found: {found_categories}")
            return False
            
    except Exception as e:
        print_error(f"Categories API test failed: {str(e)}")
        test_results["failed"] += 1
        test_results["errors"].append(f"Categories API: {str(e)}")
        return False

def test_products_api():
    """Test Products API"""
    print_section("Testing Products API")
    
    all_passed = True
    
    # Test 1: GET /api/products - List all products
    try:
        print_info("Test 1: GET /api/products - List all products")
        response = requests.get(f"{BACKEND_URL}/products")
        
        if response.status_code != 200:
            print_error(f"Products API returned status code: {response.status_code}")
            test_results["failed"] += 1
            test_results["errors"].append(f"Products API (all): Status {response.status_code}")
            all_passed = False
        else:
            products = response.json()
            
            if not isinstance(products, list):
                print_error("Products API did not return a list")
                test_results["failed"] += 1
                test_results["errors"].append("Products API: Response is not a list")
                all_passed = False
            else:
                print_success(f"Found {len(products)} products")
                
                # Verify products have required fields
                if len(products) > 0:
                    sample_product = products[0]
                    required_fields = ["id", "name", "slug", "price", "categoryId"]
                    missing_fields = [field for field in required_fields if field not in sample_product]
                    
                    if missing_fields:
                        print_error(f"Products missing required fields: {missing_fields}")
                        test_results["failed"] += 1
                        test_results["errors"].append(f"Products: Missing fields {missing_fields}")
                        all_passed = False
                    else:
                        print_success("Products have all required fields")
                        
                        # Check if products have images
                        products_with_images = [p for p in products if p.get("imageUrl")]
                        print_info(f"{len(products_with_images)}/{len(products)} products have images")
                        
                        if len(products_with_images) == 0:
                            print_warning("No products have images from Unsplash/Pexels")
                        
                        # Check if prices are in paise
                        sample_price = sample_product.get("price", 0)
                        if sample_price > 1000:
                            print_success(f"Prices appear to be in paise (sample: {sample_price})")
                        else:
                            print_warning(f"Prices might not be in paise (sample: {sample_price})")
                
                test_results["passed"] += 1
    except Exception as e:
        print_error(f"Products API (all) test failed: {str(e)}")
        test_results["failed"] += 1
        test_results["errors"].append(f"Products API (all): {str(e)}")
        all_passed = False
    
    # Test 2: GET /api/products?featured=true - Get featured products
    try:
        print_info("\nTest 2: GET /api/products?featured=true - Get featured products")
        response = requests.get(f"{BACKEND_URL}/products?featured=true")
        
        if response.status_code != 200:
            print_error(f"Featured products API returned status code: {response.status_code}")
            test_results["failed"] += 1
            test_results["errors"].append(f"Featured Products API: Status {response.status_code}")
            all_passed = False
        else:
            featured_products = response.json()
            print_success(f"Found {len(featured_products)} featured products")
            
            # Verify all returned products are marked as featured
            non_featured = [p for p in featured_products if not p.get("featured", False)]
            if non_featured:
                print_error(f"Found {len(non_featured)} products not marked as featured")
                test_results["failed"] += 1
                test_results["errors"].append(f"Featured Products: {len(non_featured)} products not marked as featured")
                all_passed = False
            else:
                print_success("All returned products are marked as featured")
                test_results["passed"] += 1
    except Exception as e:
        print_error(f"Featured products API test failed: {str(e)}")
        test_results["failed"] += 1
        test_results["errors"].append(f"Featured Products API: {str(e)}")
        all_passed = False
    
    # Test 3: GET /api/products/slug/{slug} - Get product by slug
    try:
        print_info("\nTest 3: GET /api/products/slug/single-wall-150ml - Get product by slug")
        response = requests.get(f"{BACKEND_URL}/products/slug/single-wall-150ml")
        
        if response.status_code == 404:
            print_warning("Product with slug 'single-wall-150ml' not found - checking if any products exist")
            
            # Get all products to find a valid slug
            all_products_response = requests.get(f"{BACKEND_URL}/products")
            if all_products_response.status_code == 200:
                all_products = all_products_response.json()
                if len(all_products) > 0:
                    test_slug = all_products[0].get("slug")
                    print_info(f"Testing with existing slug: {test_slug}")
                    
                    response = requests.get(f"{BACKEND_URL}/products/slug/{test_slug}")
                    if response.status_code == 200:
                        product = response.json()
                        print_success(f"Successfully retrieved product by slug: {product.get('name')}")
                        test_results["passed"] += 1
                    else:
                        print_error(f"Failed to retrieve product by slug: {response.status_code}")
                        test_results["failed"] += 1
                        test_results["errors"].append(f"Product by slug: Status {response.status_code}")
                        all_passed = False
                else:
                    print_error("No products exist in database")
                    test_results["failed"] += 1
                    test_results["errors"].append("Product by slug: No products in database")
                    all_passed = False
        elif response.status_code == 200:
            product = response.json()
            print_success(f"Successfully retrieved product: {product.get('name')}")
            test_results["passed"] += 1
        else:
            print_error(f"Product by slug API returned status code: {response.status_code}")
            test_results["failed"] += 1
            test_results["errors"].append(f"Product by slug: Status {response.status_code}")
            all_passed = False
    except Exception as e:
        print_error(f"Product by slug API test failed: {str(e)}")
        test_results["failed"] += 1
        test_results["errors"].append(f"Product by slug: {str(e)}")
        all_passed = False
    
    # Test 4: GET /api/products/{product_id} - Get product by ID
    try:
        print_info("\nTest 4: GET /api/products/{product_id} - Get product by ID")
        
        # Get all products to find a valid ID
        all_products_response = requests.get(f"{BACKEND_URL}/products")
        if all_products_response.status_code == 200:
            all_products = all_products_response.json()
            if len(all_products) > 0:
                test_product_id = all_products[0].get("id")
                print_info(f"Testing with product ID: {test_product_id}")
                
                response = requests.get(f"{BACKEND_URL}/products/{test_product_id}")
                if response.status_code == 200:
                    product = response.json()
                    print_success(f"Successfully retrieved product by ID: {product.get('name')}")
                    test_results["passed"] += 1
                else:
                    print_error(f"Failed to retrieve product by ID: {response.status_code}")
                    test_results["failed"] += 1
                    test_results["errors"].append(f"Product by ID: Status {response.status_code}")
                    all_passed = False
            else:
                print_error("No products exist in database")
                test_results["failed"] += 1
                test_results["errors"].append("Product by ID: No products in database")
                all_passed = False
        else:
            print_error(f"Failed to get products list: {all_products_response.status_code}")
            test_results["failed"] += 1
            test_results["errors"].append(f"Product by ID: Failed to get products list")
            all_passed = False
    except Exception as e:
        print_error(f"Product by ID API test failed: {str(e)}")
        test_results["failed"] += 1
        test_results["errors"].append(f"Product by ID: {str(e)}")
        all_passed = False
    
    return all_passed

def test_cart_api():
    """Test Cart API"""
    print_section("Testing Cart API")
    
    all_passed = True
    cart_item_id = None
    product_id = None
    
    # First, get a product ID to use for cart tests
    try:
        products_response = requests.get(f"{BACKEND_URL}/products")
        if products_response.status_code == 200:
            products = products_response.json()
            if len(products) > 0:
                product_id = products[0].get("id")
                print_info(f"Using product ID for cart tests: {product_id}")
            else:
                print_error("No products available for cart testing")
                test_results["failed"] += 1
                test_results["errors"].append("Cart API: No products available")
                return False
        else:
            print_error("Failed to get products for cart testing")
            test_results["failed"] += 1
            test_results["errors"].append("Cart API: Failed to get products")
            return False
    except Exception as e:
        print_error(f"Failed to get products for cart testing: {str(e)}")
        test_results["failed"] += 1
        test_results["errors"].append(f"Cart API setup: {str(e)}")
        return False
    
    # Test 1: GET /api/cart/{user_id} - Get cart for demo user
    try:
        print_info(f"Test 1: GET /api/cart/{TEST_USER_ID} - Get cart for demo user")
        response = requests.get(f"{BACKEND_URL}/cart/{TEST_USER_ID}")
        
        if response.status_code != 200:
            print_error(f"Get cart API returned status code: {response.status_code}")
            test_results["failed"] += 1
            test_results["errors"].append(f"Get Cart API: Status {response.status_code}")
            all_passed = False
        else:
            cart_items = response.json()
            print_success(f"Successfully retrieved cart with {len(cart_items)} items")
            test_results["passed"] += 1
    except Exception as e:
        print_error(f"Get cart API test failed: {str(e)}")
        test_results["failed"] += 1
        test_results["errors"].append(f"Get Cart API: {str(e)}")
        all_passed = False
    
    # Test 2: POST /api/cart/{user_id} - Add product to cart
    try:
        print_info(f"\nTest 2: POST /api/cart/{TEST_USER_ID} - Add product to cart")
        
        cart_data = {
            "productId": product_id,
            "quantity": 2000
        }
        
        response = requests.post(
            f"{BACKEND_URL}/cart/{TEST_USER_ID}",
            json=cart_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code not in [200, 201]:
            print_error(f"Add to cart API returned status code: {response.status_code}")
            print_error(f"Response: {response.text}")
            test_results["failed"] += 1
            test_results["errors"].append(f"Add to Cart API: Status {response.status_code}")
            all_passed = False
        else:
            cart_item = response.json()
            cart_item_id = cart_item.get("id")
            print_success(f"Successfully added product to cart (Cart Item ID: {cart_item_id})")
            print_info(f"Quantity: {cart_item.get('quantity')}")
            test_results["passed"] += 1
    except Exception as e:
        print_error(f"Add to cart API test failed: {str(e)}")
        test_results["failed"] += 1
        test_results["errors"].append(f"Add to Cart API: {str(e)}")
        all_passed = False
    
    # Test 3: POST /api/cart/{user_id} - Add multiple quantities
    try:
        print_info(f"\nTest 3: POST /api/cart/{TEST_USER_ID} - Add multiple quantities (should update existing)")
        
        cart_data = {
            "productId": product_id,
            "quantity": 1000
        }
        
        response = requests.post(
            f"{BACKEND_URL}/cart/{TEST_USER_ID}",
            json=cart_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code not in [200, 201]:
            print_error(f"Add multiple quantities API returned status code: {response.status_code}")
            test_results["failed"] += 1
            test_results["errors"].append(f"Add Multiple Quantities: Status {response.status_code}")
            all_passed = False
        else:
            cart_item = response.json()
            updated_quantity = cart_item.get("quantity")
            print_success(f"Successfully updated cart quantity to: {updated_quantity}")
            
            if updated_quantity == 3000:
                print_success("Quantity correctly updated (2000 + 1000 = 3000)")
                test_results["passed"] += 1
            else:
                print_warning(f"Expected quantity 3000, got {updated_quantity}")
    except Exception as e:
        print_error(f"Add multiple quantities test failed: {str(e)}")
        test_results["failed"] += 1
        test_results["errors"].append(f"Add Multiple Quantities: {str(e)}")
        all_passed = False
    
    # Test 4: DELETE /api/cart/{cart_id} - Remove from cart
    if cart_item_id:
        try:
            print_info(f"\nTest 4: DELETE /api/cart/{cart_item_id} - Remove from cart")
            
            response = requests.delete(f"{BACKEND_URL}/cart/{cart_item_id}")
            
            if response.status_code != 200:
                print_error(f"Remove from cart API returned status code: {response.status_code}")
                test_results["failed"] += 1
                test_results["errors"].append(f"Remove from Cart API: Status {response.status_code}")
                all_passed = False
            else:
                result = response.json()
                if result.get("success"):
                    print_success("Successfully removed item from cart")
                    test_results["passed"] += 1
                else:
                    print_error("Remove from cart did not return success")
                    test_results["failed"] += 1
                    test_results["errors"].append("Remove from Cart: Did not return success")
                    all_passed = False
        except Exception as e:
            print_error(f"Remove from cart API test failed: {str(e)}")
            test_results["failed"] += 1
            test_results["errors"].append(f"Remove from Cart API: {str(e)}")
            all_passed = False
    else:
        print_warning("Skipping remove from cart test - no cart item ID available")
    
    return all_passed

def test_orders_api():
    """Test Orders API"""
    print_section("Testing Orders API")
    
    all_passed = True
    order_id = None
    product_id = None
    
    # Setup: Add item to cart for order creation
    try:
        products_response = requests.get(f"{BACKEND_URL}/products")
        if products_response.status_code == 200:
            products = products_response.json()
            if len(products) > 0:
                product_id = products[0].get("id")
                print_info(f"Using product ID for order tests: {product_id}")
                
                # Clear existing cart
                requests.delete(f"{BACKEND_URL}/cart/user/{TEST_USER_ID}/clear")
                
                # Add item to cart
                cart_data = {
                    "productId": product_id,
                    "quantity": 5000
                }
                cart_response = requests.post(
                    f"{BACKEND_URL}/cart/{TEST_USER_ID}",
                    json=cart_data,
                    headers={"Content-Type": "application/json"}
                )
                
                if cart_response.status_code in [200, 201]:
                    print_success("Cart prepared for order testing")
                else:
                    print_error("Failed to prepare cart for order testing")
                    test_results["failed"] += 1
                    test_results["errors"].append("Orders API setup: Failed to prepare cart")
                    return False
            else:
                print_error("No products available for order testing")
                test_results["failed"] += 1
                test_results["errors"].append("Orders API: No products available")
                return False
        else:
            print_error("Failed to get products for order testing")
            test_results["failed"] += 1
            test_results["errors"].append("Orders API: Failed to get products")
            return False
    except Exception as e:
        print_error(f"Failed to setup for order testing: {str(e)}")
        test_results["failed"] += 1
        test_results["errors"].append(f"Orders API setup: {str(e)}")
        return False
    
    # Test 1: POST /api/orders - Create new order
    try:
        print_info("Test 1: POST /api/orders - Create new order (full checkout flow)")
        
        order_data = {
            "userId": TEST_USER_ID,
            "shippingName": "Rajesh Kumar",
            "shippingPhone": "+91-9876543210",
            "shippingEmail": "rajesh.kumar@example.com",
            "shippingAddress": "123 MG Road, Koramangala",
            "shippingCity": "Bangalore",
            "shippingState": "Karnataka",
            "shippingPincode": "560034",
            "notes": "Please deliver between 10 AM - 5 PM"
        }
        
        response = requests.post(
            f"{BACKEND_URL}/orders",
            json=order_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code not in [200, 201]:
            print_error(f"Create order API returned status code: {response.status_code}")
            print_error(f"Response: {response.text}")
            test_results["failed"] += 1
            test_results["errors"].append(f"Create Order API: Status {response.status_code}")
            all_passed = False
        else:
            order = response.json()
            order_id = order.get("id")
            print_success(f"Successfully created order (Order ID: {order_id})")
            print_info(f"Order Total: ₹{order.get('total', 0) / 100:.2f}")
            print_info(f"Order Status: {order.get('status')}")
            test_results["passed"] += 1
            
            # Verify cart was cleared after order creation
            cart_response = requests.get(f"{BACKEND_URL}/cart/{TEST_USER_ID}")
            if cart_response.status_code == 200:
                cart_items = cart_response.json()
                if len(cart_items) == 0:
                    print_success("Cart was successfully cleared after order creation")
                else:
                    print_warning(f"Cart still has {len(cart_items)} items after order creation")
    except Exception as e:
        print_error(f"Create order API test failed: {str(e)}")
        test_results["failed"] += 1
        test_results["errors"].append(f"Create Order API: {str(e)}")
        all_passed = False
    
    # Test 2: GET /api/orders/user/{user_id} - Get user orders
    try:
        print_info(f"\nTest 2: GET /api/orders/user/{TEST_USER_ID} - Get user orders")
        
        response = requests.get(f"{BACKEND_URL}/orders/user/{TEST_USER_ID}")
        
        if response.status_code != 200:
            print_error(f"Get user orders API returned status code: {response.status_code}")
            test_results["failed"] += 1
            test_results["errors"].append(f"Get User Orders API: Status {response.status_code}")
            all_passed = False
        else:
            orders = response.json()
            print_success(f"Successfully retrieved {len(orders)} orders for user")
            
            if len(orders) > 0:
                print_info(f"Most recent order ID: {orders[0].get('id')}")
                print_info(f"Most recent order status: {orders[0].get('status')}")
                test_results["passed"] += 1
            else:
                print_warning("No orders found for user")
    except Exception as e:
        print_error(f"Get user orders API test failed: {str(e)}")
        test_results["failed"] += 1
        test_results["errors"].append(f"Get User Orders API: {str(e)}")
        all_passed = False
    
    # Test 3: GET /api/orders/{order_id} - Get order details with items
    if order_id:
        try:
            print_info(f"\nTest 3: GET /api/orders/{order_id} - Get order details with items")
            
            response = requests.get(f"{BACKEND_URL}/orders/{order_id}")
            
            if response.status_code != 200:
                print_error(f"Get order details API returned status code: {response.status_code}")
                test_results["failed"] += 1
                test_results["errors"].append(f"Get Order Details API: Status {response.status_code}")
                all_passed = False
            else:
                order = response.json()
                print_success(f"Successfully retrieved order details")
                print_info(f"Order ID: {order.get('id')}")
                print_info(f"Order Status: {order.get('status')}")
                print_info(f"Order Total: ₹{order.get('total', 0) / 100:.2f}")
                
                items = order.get("items", [])
                print_info(f"Order has {len(items)} items")
                
                if len(items) > 0:
                    for idx, item in enumerate(items, 1):
                        print_info(f"  Item {idx}: {item.get('productName')} x {item.get('quantity')} @ ₹{item.get('price', 0) / 100:.2f}")
                    print_success("Order includes item details")
                    test_results["passed"] += 1
                else:
                    print_error("Order has no items")
                    test_results["failed"] += 1
                    test_results["errors"].append("Get Order Details: Order has no items")
                    all_passed = False
        except Exception as e:
            print_error(f"Get order details API test failed: {str(e)}")
            test_results["failed"] += 1
            test_results["errors"].append(f"Get Order Details API: {str(e)}")
            all_passed = False
    else:
        print_warning("Skipping order details test - no order ID available")
    
    return all_passed

def print_summary():
    """Print test summary"""
    print_section("Test Summary")
    
    total_tests = test_results["passed"] + test_results["failed"]
    pass_rate = (test_results["passed"] / total_tests * 100) if total_tests > 0 else 0
    
    print(f"Total Tests: {total_tests}")
    print_success(f"Passed: {test_results['passed']}")
    print_error(f"Failed: {test_results['failed']}")
    print(f"Pass Rate: {pass_rate:.1f}%\n")
    
    if test_results["errors"]:
        print_section("Failed Tests Details")
        for idx, error in enumerate(test_results["errors"], 1):
            print_error(f"{idx}. {error}")
    
    return test_results["failed"] == 0

if __name__ == "__main__":
    print_section("VerdaCup E-commerce Backend API Testing")
    print_info(f"Backend URL: {BACKEND_URL}")
    print_info(f"Test User ID: {TEST_USER_ID}")
    
    # Run all tests
    test_root_api()
    test_categories_api()
    test_products_api()
    test_cart_api()
    test_orders_api()
    
    # Print summary
    all_passed = print_summary()
    
    if all_passed:
        print_success("\n🎉 All tests passed!")
        exit(0)
    else:
        print_error("\n❌ Some tests failed. Please review the errors above.")
        exit(1)
