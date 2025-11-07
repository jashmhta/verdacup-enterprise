from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from enum import Enum

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ============ MODELS ============

class OrderStatus(str, Enum):
    pending = "pending"
    confirmed = "confirmed"
    processing = "processing"
    shipped = "shipped"
    delivered = "delivered"
    cancelled = "cancelled"

class Category(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    slug: str
    description: Optional[str] = None
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CategoryCreate(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None

class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    slug: str
    description: Optional[str] = None
    price: int  # Price in paise
    categoryId: str
    imageUrl: Optional[str] = None
    stock: int = 0
    capacity: Optional[str] = None
    material: Optional[str] = None
    wallType: Optional[str] = None
    minOrderQty: int = 1000
    featured: bool = False
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updatedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ProductCreate(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    price: int
    categoryId: str
    imageUrl: Optional[str] = None
    stock: int = 0
    capacity: Optional[str] = None
    material: Optional[str] = None
    wallType: Optional[str] = None
    minOrderQty: int = 1000
    featured: bool = False

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[int] = None
    stock: Optional[int] = None
    imageUrl: Optional[str] = None
    featured: Optional[bool] = None

class CartItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    userId: str
    productId: str
    quantity: int
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updatedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CartItemCreate(BaseModel):
    productId: str
    quantity: int

class CartItemUpdate(BaseModel):
    quantity: int

class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    userId: str
    status: OrderStatus = OrderStatus.pending
    total: int
    shippingName: str
    shippingPhone: str
    shippingEmail: Optional[str] = None
    shippingAddress: str
    shippingCity: str
    shippingState: str
    shippingPincode: str
    notes: Optional[str] = None
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updatedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class OrderCreate(BaseModel):
    userId: str
    shippingName: str
    shippingPhone: str
    shippingEmail: Optional[str] = None
    shippingAddress: str
    shippingCity: str
    shippingState: str
    shippingPincode: str
    notes: Optional[str] = None

class OrderItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    orderId: str
    productId: str
    productName: str
    quantity: int
    price: int
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class OrderWithItems(Order):
    items: List[OrderItem] = []

# ============ CATEGORIES ROUTES ============

@api_router.get("/categories", response_model=List[Category])
async def list_categories():
    categories = await db.categories.find({}, {"_id": 0}).to_list(100)
    for cat in categories:
        if isinstance(cat.get('createdAt'), str):
            cat['createdAt'] = datetime.fromisoformat(cat['createdAt'])
    return categories

@api_router.get("/categories/{category_id}", response_model=Category)
async def get_category(category_id: str):
    category = await db.categories.find_one({"id": category_id}, {"_id": 0})
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    if isinstance(category.get('createdAt'), str):
        category['createdAt'] = datetime.fromisoformat(category['createdAt'])
    return category

@api_router.post("/categories", response_model=Category)
async def create_category(category: CategoryCreate):
    category_obj = Category(**category.model_dump())
    doc = category_obj.model_dump()
    doc['createdAt'] = doc['createdAt'].isoformat()
    await db.categories.insert_one(doc)
    return category_obj

# ============ PRODUCTS ROUTES ============

@api_router.get("/products", response_model=List[Product])
async def list_products(categoryId: Optional[str] = None, featured: Optional[bool] = None):
    query = {}
    if categoryId:
        query["categoryId"] = categoryId
    if featured is not None:
        query["featured"] = featured
    
    products = await db.products.find(query, {"_id": 0}).to_list(1000)
    for product in products:
        for field in ['createdAt', 'updatedAt']:
            if isinstance(product.get(field), str):
                product[field] = datetime.fromisoformat(product[field])
    return products

@api_router.get("/products/slug/{slug}", response_model=Product)
async def get_product_by_slug(slug: str):
    product = await db.products.find_one({"slug": slug}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    for field in ['createdAt', 'updatedAt']:
        if isinstance(product.get(field), str):
            product[field] = datetime.fromisoformat(product[field])
    return product

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    for field in ['createdAt', 'updatedAt']:
        if isinstance(product.get(field), str):
            product[field] = datetime.fromisoformat(product[field])
    return product

@api_router.post("/products", response_model=Product)
async def create_product(product: ProductCreate):
    product_obj = Product(**product.model_dump())
    doc = product_obj.model_dump()
    doc['createdAt'] = doc['createdAt'].isoformat()
    doc['updatedAt'] = doc['updatedAt'].isoformat()
    await db.products.insert_one(doc)
    return product_obj

@api_router.patch("/products/{product_id}", response_model=Product)
async def update_product(product_id: str, update: ProductUpdate):
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = {k: v for k, v in update.model_dump().items() if v is not None}
    update_data['updatedAt'] = datetime.now(timezone.utc).isoformat()
    
    await db.products.update_one({"id": product_id}, {"$set": update_data})
    
    updated_product = await db.products.find_one({"id": product_id}, {"_id": 0})
    for field in ['createdAt', 'updatedAt']:
        if isinstance(updated_product.get(field), str):
            updated_product[field] = datetime.fromisoformat(updated_product[field])
    return updated_product

@api_router.delete("/products/{product_id}")
async def delete_product(product_id: str):
    result = await db.products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"success": True}

# ============ CART ROUTES ============

@api_router.get("/cart/{user_id}", response_model=List[dict])
async def get_cart(user_id: str):
    cart_items = await db.cart.find({"userId": user_id}, {"_id": 0}).to_list(1000)
    
    enriched_items = []
    for item in cart_items:
        product = await db.products.find_one({"id": item["productId"]}, {"_id": 0})
        if product:
            for field in ['createdAt', 'updatedAt']:
                if isinstance(product.get(field), str):
                    product[field] = datetime.fromisoformat(product[field])
            enriched_items.append({
                **item,
                "product": product
            })
    
    return enriched_items

@api_router.post("/cart/{user_id}", response_model=CartItem)
async def add_to_cart(user_id: str, cart_item: CartItemCreate):
    # Check if product exists
    product = await db.products.find_one({"id": cart_item.productId})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Check if item already in cart
    existing = await db.cart.find_one({"userId": user_id, "productId": cart_item.productId})
    if existing:
        # Update quantity
        new_quantity = existing["quantity"] + cart_item.quantity
        await db.cart.update_one(
            {"userId": user_id, "productId": cart_item.productId},
            {"$set": {"quantity": new_quantity, "updatedAt": datetime.now(timezone.utc).isoformat()}}
        )
        existing["quantity"] = new_quantity
        for field in ['createdAt', 'updatedAt']:
            if isinstance(existing.get(field), str):
                existing[field] = datetime.fromisoformat(existing[field])
        return CartItem(**existing)
    
    # Add new item
    cart_obj = CartItem(userId=user_id, **cart_item.model_dump())
    doc = cart_obj.model_dump()
    doc['createdAt'] = doc['createdAt'].isoformat()
    doc['updatedAt'] = doc['updatedAt'].isoformat()
    await db.cart.insert_one(doc)
    return cart_obj

@api_router.patch("/cart/{cart_id}", response_model=CartItem)
async def update_cart_item(cart_id: str, update: CartItemUpdate):
    result = await db.cart.update_one(
        {"id": cart_id},
        {"$set": {"quantity": update.quantity, "updatedAt": datetime.now(timezone.utc).isoformat()}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Cart item not found")
    
    cart_item = await db.cart.find_one({"id": cart_id}, {"_id": 0})
    for field in ['createdAt', 'updatedAt']:
        if isinstance(cart_item.get(field), str):
            cart_item[field] = datetime.fromisoformat(cart_item[field])
    return cart_item

@api_router.delete("/cart/{cart_id}")
async def remove_from_cart(cart_id: str):
    result = await db.cart.delete_one({"id": cart_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Cart item not found")
    return {"success": True}

@api_router.delete("/cart/user/{user_id}/clear")
async def clear_cart(user_id: str):
    await db.cart.delete_many({"userId": user_id})
    return {"success": True}

# ============ ORDERS ROUTES ============

@api_router.get("/orders/user/{user_id}", response_model=List[Order])
async def get_user_orders(user_id: str):
    orders = await db.orders.find({"userId": user_id}, {"_id": 0}).sort("createdAt", -1).to_list(1000)
    for order in orders:
        for field in ['createdAt', 'updatedAt']:
            if isinstance(order.get(field), str):
                order[field] = datetime.fromisoformat(order[field])
    return orders

@api_router.get("/orders/{order_id}", response_model=OrderWithItems)
async def get_order(order_id: str):
    order = await db.orders.find_one({"id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    items = await db.order_items.find({"orderId": order_id}, {"_id": 0}).to_list(1000)
    
    for field in ['createdAt', 'updatedAt']:
        if isinstance(order.get(field), str):
            order[field] = datetime.fromisoformat(order[field])
    
    for item in items:
        if isinstance(item.get('createdAt'), str):
            item['createdAt'] = datetime.fromisoformat(item['createdAt'])
    
    return OrderWithItems(**order, items=items)

@api_router.post("/orders", response_model=Order)
async def create_order(order_data: OrderCreate):
    # Get cart items
    cart_items = await db.cart.find({"userId": order_data.userId}, {"_id": 0}).to_list(1000)
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")
    
    # Calculate total
    total = 0
    order_items_data = []
    
    for cart_item in cart_items:
        product = await db.products.find_one({"id": cart_item["productId"]}, {"_id": 0})
        if not product:
            continue
        
        item_total = product["price"] * cart_item["quantity"]
        total += item_total
        
        order_items_data.append({
            "productId": product["id"],
            "productName": product["name"],
            "quantity": cart_item["quantity"],
            "price": product["price"]
        })
    
    # Create order
    order_obj = Order(**order_data.model_dump(), total=total)
    order_doc = order_obj.model_dump()
    order_doc['createdAt'] = order_doc['createdAt'].isoformat()
    order_doc['updatedAt'] = order_doc['updatedAt'].isoformat()
    await db.orders.insert_one(order_doc)
    
    # Create order items
    for item_data in order_items_data:
        item_obj = OrderItem(orderId=order_obj.id, **item_data)
        item_doc = item_obj.model_dump()
        item_doc['createdAt'] = item_doc['createdAt'].isoformat()
        await db.order_items.insert_one(item_doc)
    
    # Clear cart
    await db.cart.delete_many({"userId": order_data.userId})
    
    return order_obj

@api_router.get("/orders", response_model=List[Order])
async def get_all_orders():
    orders = await db.orders.find({}, {"_id": 0}).sort("createdAt", -1).to_list(1000)
    for order in orders:
        for field in ['createdAt', 'updatedAt']:
            if isinstance(order.get(field), str):
                order[field] = datetime.fromisoformat(order[field])
    return orders

@api_router.patch("/orders/{order_id}/status")
async def update_order_status(order_id: str, status: OrderStatus):
    result = await db.orders.update_one(
        {"id": order_id},
        {"$set": {"status": status.value, "updatedAt": datetime.now(timezone.utc).isoformat()}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"success": True}

# ============ ROOT ROUTE ============

@api_router.get("/")
async def root():
    return {"message": "VerdaCup E-commerce API", "version": "1.0.0"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()