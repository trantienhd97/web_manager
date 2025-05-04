from datetime import datetime
from models.product import Product
from models.order import Order, OrderItem
from db_config import db

def seed_database():
    """Populate database with sample data."""
    print("Starting database seeding...")
    
    # Add sample products
    products = [
        Product(
            name="Laptop Pro X",
            description="High-performance laptop with 16GB RAM, 512GB SSD, and dedicated GPU",
            price=1299.99,
            stock=15,
            category="Electronics",
            image_url="https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
        ),
        Product(
            name="Smartphone Ultra",
            description="Latest smartphone with 6.7-inch display, 128GB storage, and 5G capability",
            price=899.99,
            stock=25,
            category="Electronics",
            image_url="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
        ),
        Product(
            name="Wireless Headphones",
            description="Noise-cancelling headphones with 30-hour battery life",
            price=199.99,
            stock=30,
            category="Accessories",
            image_url="https://images.unsplash.com/photo-1583394838336-acd977736f90"
        ),
        Product(
            name="Smart Watch",
            description="Fitness and health tracking with heart rate monitor",
            price=249.99,
            stock=20,
            category="Wearables",
            image_url="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1"
        ),
        Product(
            name="Bluetooth Speaker",
            description="Portable waterproof speaker with 360° sound",
            price=79.99,
            stock=40,
            category="Audio",
            image_url="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1"
        ),
        Product(
            name="Coffee Maker",
            description="Programmable coffee machine with built-in grinder",
            price=129.99,
            stock=10,
            category="Kitchen",
            image_url="https://images.unsplash.com/photo-1517668698849-31aaf85d57fe"
        ),
        Product(
            name="Ergonomic Office Chair",
            description="Adjustable office chair with lumbar support",
            price=199.99,
            stock=8,
            category="Furniture",
            image_url="https://images.unsplash.com/photo-1589884629108-3193400c7cc9"
        ),
        Product(
            name="Wireless Mouse",
            description="Precision wireless mouse with customizable buttons",
            price=49.99,
            stock=50,
            category="Accessories",
            image_url="https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7"
        ),
        Product(
            name="4K Monitor",
            description="32-inch 4K display with HDR support",
            price=349.99,
            stock=12,
            category="Electronics",
            image_url="https://images.unsplash.com/photo-1586210579191-33b45e38fa2c"
        ),
        Product(
            name="External SSD",
            description="1TB portable solid-state drive with USB-C",
            price=159.99,
            stock=35,
            category="Storage",
            image_url="https://images.unsplash.com/photo-1603732551663-d0f9b92e0d7d"
        ),
    ]
    
    # Add products to database
    for product in products:
        existing = Product.query.filter_by(name=product.name).first()
        if not existing:
            db.session.add(product)
    
    # Commit products first to get their IDs
    db.session.commit()
    print(f"Added {len(products)} products")
    
    # Add sample orders
    current_date = datetime.now()
    
    orders = [
        Order(
            customer_name="John Doe",
            customer_email="john@example.com",
            shipping_address="123 Main St, Anytown, CA 94105",
            payment_method="Credit Card",
            status="completed",
            created_at=datetime(2025, 4, 15)
        ),
        Order(
            customer_name="Jane Smith",
            customer_email="jane@example.com",
            shipping_address="456 Oak Ave, Somewhere, NY 10001",
            payment_method="PayPal",
            status="processing",
            created_at=datetime(2025, 4, 28)
        ),
        Order(
            customer_name="Robert Johnson",
            customer_email="robert@example.com",
            shipping_address="789 Pine Rd, Elsewhere, TX 75001",
            payment_method="Credit Card",
            status="pending",
            created_at=current_date
        ),
        Order(
            customer_name="Emily Davis",
            customer_email="emily@example.com",
            shipping_address="101 Cedar Blvd, Nowhere, WA 98001",
            payment_method="Debit Card",
            status="completed",
            created_at=datetime(2025, 4, 10)
        ),
        Order(
            customer_name="Michael Wilson",
            customer_email="michael@example.com",
            shipping_address="202 Elm St, Anyplace, IL 60007",
            payment_method="PayPal",
            status="completed",
            created_at=datetime(2025, 3, 22)
        ),
    ]
    
    # Add orders to database
    for order in orders:
        db.session.add(order)
    
    # Commit orders to get their IDs
    db.session.commit()
    print(f"Added {len(orders)} orders")
    
    # Get all products
    all_products = Product.query.all()
    
    # Add order items with different products
    order_items = [
        # Items for first order (John Doe)
        OrderItem(order_id=1, product_id=1, quantity=1, price=all_products[0].price),
        OrderItem(order_id=1, product_id=3, quantity=1, price=all_products[2].price),
        
        # Items for second order (Jane Smith)
        OrderItem(order_id=2, product_id=2, quantity=1, price=all_products[1].price),
        OrderItem(order_id=2, product_id=8, quantity=2, price=all_products[7].price),
        
        # Items for third order (Robert Johnson)
        OrderItem(order_id=3, product_id=4, quantity=1, price=all_products[3].price),
        OrderItem(order_id=3, product_id=5, quantity=1, price=all_products[4].price),
        
        # Items for fourth order (Emily Davis)
        OrderItem(order_id=4, product_id=6, quantity=1, price=all_products[5].price),
        
        # Items for fifth order (Michael Wilson)
        OrderItem(order_id=5, product_id=9, quantity=1, price=all_products[8].price),
        OrderItem(order_id=5, product_id=7, quantity=1, price=all_products[6].price),
        OrderItem(order_id=5, product_id=10, quantity=2, price=all_products[9].price),
    ]
    
    # Add order items to database
    for item in order_items:
        db.session.add(item)
    
    # Calculate total amounts for each order
    orders = Order.query.all()
    for order in orders:
        total = sum(item.price * item.quantity for item in order.items)
        order.total_amount = total
    
    db.session.commit()
    print(f"Added {len(order_items)} order items")
    print("Database seeded successfully!")

if __name__ == "__main__":
    # This allows you to run the script directly for testing
    from app import create_app
    app = create_app()
    with app.app_context():
        seed_database()