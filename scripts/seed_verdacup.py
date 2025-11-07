#!/usr/bin/env python3
"""
Seed script for VerdaCup e-commerce database
Populates categories and products with real data and images
"""

import asyncio
import os
import sys
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).parent.parent / 'backend'))

from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import uuid
from datetime import datetime, timezone

# Load environment
load_dotenv(Path(__file__).parent.parent / 'backend' / '.env')

MONGO_URL = os.environ['MONGO_URL']
DB_NAME = os.environ['DB_NAME']

# Product images generated from vision_expert_agent
PRODUCT_IMAGES = [
    "https://images.unsplash.com/photo-1696568720419-69a7aba97c31?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxiaW9kZWdyYWRhYmxlJTIwcGFwZXIlMjBjdXB8ZW58MHx8fHwxNzYyNTIyODMzfDA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1696568720558-7b6aa2ffe067?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxiaW9kZWdyYWRhYmxlJTIwcGFwZXIlMjBjdXB8ZW58MHx8fHwxNzYyNTIyODMzfDA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1696568720371-6d2a535a1ddf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwzfHxiaW9kZWdyYWRhYmxlJTIwcGFwZXIlMjBjdXB8ZW58MHx8fHwxNzYyNTIyODMzfDA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1696568720493-bd5f7ae24eef?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHw0fHxiaW9kZWdyYWRhYmxlJTIwcGFwZXIlMjBjdXB8ZW58MHx8fHwxNzYyNTIyODMzfDA&ixlib=rb-4.1.0&q=85",
    "https://images.pexels.com/photos/8015724/pexels-photo-8015724.jpeg",
    "https://images.pexels.com/photos/8015717/pexels-photo-8015717.jpeg",
    "https://images.unsplash.com/photo-1605285303431-2419a0336444?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHw0fHxlY28tZnJpZW5kbHklMjBjdXB8ZW58MHx8fHwxNzYyNTIyODQwfDA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1651204424028-2f6b0a5a4c5c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxkaXNwb3NhYmxlJTIwY3VwfGVufDB8fHx8MTc2MjUyMjg0OHww&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1585208067111-77808f9f5346?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxkaXNwb3NhYmxlJTIwY3VwfGVufDB8fHx8MTc2MjUyMjg0OHww&ixlib=rb-4.1.0&q=85",
    "https://images.pexels.com/photos/18794175/pexels-photo-18794175.jpeg",
]

async def seed_database():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    print("🌱 Seeding VerdaCup database...")
    
    # Clear existing data
    print("  Clearing existing data...")
    await db.categories.delete_many({})
    await db.products.delete_many({})
    
    # Create categories
    print("  Creating categories...")
    categories = [
        {
            "id": str(uuid.uuid4()),
            "name": "Paper Cups",
            "slug": "paper-cups",
            "description": "Eco-friendly paper cups for hot and cold beverages",
            "createdAt": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Bagasse Cups",
            "slug": "bagasse-cups",
            "description": "100% compostable cups made from sugarcane waste",
            "createdAt": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Custom Printed",
            "slug": "custom-printed",
            "description": "Branded cups with custom printing for businesses",
            "createdAt": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    result = await db.categories.insert_many(categories)
    print(f"  ✓ Created {len(result.inserted_ids)} categories")
    
    # Create products
    print("  Creating products...")
    paper_cat_id = categories[0]["id"]
    bagasse_cat_id = categories[1]["id"]
    custom_cat_id = categories[2]["id"]
    
    products = [
        {
            "id": str(uuid.uuid4()),
            "name": "Single Wall Paper Cup 150ml",
            "slug": "single-wall-150ml",
            "description": "Perfect for tea, coffee, and cold beverages. Food-grade paper with leak-proof design.",
            "price": 75,  # ₹0.75 per cup in 1000 pack
            "categoryId": paper_cat_id,
            "imageUrl": PRODUCT_IMAGES[0],
            "stock": 50000,
            "capacity": "150ml",
            "material": "Paper",
            "wallType": "Single Wall",
            "minOrderQty": 1000,
            "featured": True,
            "createdAt": datetime.now(timezone.utc).isoformat(),
            "updatedAt": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Single Wall Paper Cup 200ml",
            "slug": "single-wall-200ml",
            "description": "Ideal for standard coffee servings. Eco-friendly and biodegradable.",
            "price": 85,
            "categoryId": paper_cat_id,
            "imageUrl": PRODUCT_IMAGES[1],
            "stock": 50000,
            "capacity": "200ml",
            "material": "Paper",
            "wallType": "Single Wall",
            "minOrderQty": 1000,
            "featured": True,
            "createdAt": datetime.now(timezone.utc).isoformat(),
            "updatedAt": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Single Wall Paper Cup 250ml",
            "slug": "single-wall-250ml",
            "description": "Large size for generous servings. Suitable for hot and cold drinks.",
            "price": 95,
            "categoryId": paper_cat_id,
            "imageUrl": PRODUCT_IMAGES[2],
            "stock": 40000,
            "capacity": "250ml",
            "material": "Paper",
            "wallType": "Single Wall",
            "minOrderQty": 1000,
            "featured": True,
            "createdAt": datetime.now(timezone.utc).isoformat(),
            "updatedAt": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Double Wall Paper Cup 200ml",
            "slug": "double-wall-200ml",
            "description": "Insulated double wall keeps drinks hot longer. No sleeve needed.",
            "price": 120,
            "categoryId": paper_cat_id,
            "imageUrl": PRODUCT_IMAGES[3],
            "stock": 30000,
            "capacity": "200ml",
            "material": "Paper",
            "wallType": "Double Wall",
            "minOrderQty": 1000,
            "featured": False,
            "createdAt": datetime.now(timezone.utc).isoformat(),
            "updatedAt": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Double Wall Paper Cup 250ml",
            "slug": "double-wall-250ml",
            "description": "Premium insulated cup for hot beverages. Superior heat retention.",
            "price": 135,
            "categoryId": paper_cat_id,
            "imageUrl": PRODUCT_IMAGES[4],
            "stock": 30000,
            "capacity": "250ml",
            "material": "Paper",
            "wallType": "Double Wall",
            "minOrderQty": 1000,
            "featured": False,
            "createdAt": datetime.now(timezone.utc).isoformat(),
            "updatedAt": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Bagasse Cup 150ml",
            "slug": "bagasse-150ml",
            "description": "100% compostable cup made from sugarcane fiber. Completely biodegradable.",
            "price": 90,
            "categoryId": bagasse_cat_id,
            "imageUrl": PRODUCT_IMAGES[5],
            "stock": 20000,
            "capacity": "150ml",
            "material": "Bagasse",
            "wallType": "Single Wall",
            "minOrderQty": 1000,
            "featured": False,
            "createdAt": datetime.now(timezone.utc).isoformat(),
            "updatedAt": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Bagasse Cup 200ml",
            "slug": "bagasse-200ml",
            "description": "Eco-premium cup from renewable sugarcane waste. Sturdy and sustainable.",
            "price": 105,
            "categoryId": bagasse_cat_id,
            "imageUrl": PRODUCT_IMAGES[6],
            "stock": 20000,
            "capacity": "200ml",
            "material": "Bagasse",
            "wallType": "Single Wall",
            "minOrderQty": 1000,
            "featured": False,
            "createdAt": datetime.now(timezone.utc).isoformat(),
            "updatedAt": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Bagasse Cup 250ml",
            "slug": "bagasse-250ml",
            "description": "Large compostable cup for eco-conscious businesses. Zero plastic.",
            "price": 120,
            "categoryId": bagasse_cat_id,
            "imageUrl": PRODUCT_IMAGES[7],
            "stock": 15000,
            "capacity": "250ml",
            "material": "Bagasse",
            "wallType": "Single Wall",
            "minOrderQty": 1000,
            "featured": False,
            "createdAt": datetime.now(timezone.utc).isoformat(),
            "updatedAt": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Custom Printed Cup 200ml",
            "slug": "custom-printed-200ml",
            "description": "Personalized cups with your logo and branding. Minimum order 10,000 units.",
            "price": 110,
            "categoryId": custom_cat_id,
            "imageUrl": PRODUCT_IMAGES[8],
            "stock": 100000,
            "capacity": "200ml",
            "material": "Paper",
            "wallType": "Single Wall",
            "minOrderQty": 10000,
            "featured": False,
            "createdAt": datetime.now(timezone.utc).isoformat(),
            "updatedAt": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Custom Printed Cup 250ml",
            "slug": "custom-printed-250ml",
            "description": "Large branded cups for maximum visibility. Full-color printing available.",
            "price": 125,
            "categoryId": custom_cat_id,
            "imageUrl": PRODUCT_IMAGES[9],
            "stock": 100000,
            "capacity": "250ml",
            "material": "Paper",
            "wallType": "Single Wall",
            "minOrderQty": 10000,
            "featured": False,
            "createdAt": datetime.now(timezone.utc).isoformat(),
            "updatedAt": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    result = await db.products.insert_many(products)
    print(f"  ✓ Created {len(result.inserted_ids)} products")
    
    print(f"\n✅ Database seeded successfully!")
    print(f"  Categories: {len(categories)}")
    print(f"  Products: {len(products)}")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
