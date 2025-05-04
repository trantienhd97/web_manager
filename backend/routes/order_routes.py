from flask import request, jsonify, Blueprint
from models.order import Order, OrderItem
from models.product import Product
from db_config import db

# Create a blueprint for order routes
order_bp = Blueprint('orders', __name__)

# Get all orders
@order_bp.route('/api/orders', methods=['GET', 'OPTIONS'])
def get_orders():
    if request.method == 'OPTIONS':
        return '', 200
        
    orders = Order.query.all()
    return jsonify([order.to_dict() for order in orders])

# Get a single order by ID
@order_bp.route('/api/orders/<int:order_id>', methods=['GET', 'OPTIONS'])
def get_order(order_id):
    if request.method == 'OPTIONS':
        return '', 200
        
    order = Order.query.get_or_404(order_id)
    return jsonify(order.to_dict())

# Create a new order
@order_bp.route('/api/orders', methods=['POST', 'OPTIONS'])
def create_order():
    if request.method == 'OPTIONS':
        return '', 200
        
    data = request.get_json()
    
    # Basic validation
    if not data.get('customer_name') or not data.get('customer_email') or not data.get('items'):
        return jsonify({'error': 'Customer name, email, and items are required'}), 400
    
    # Create order
    order = Order(
        customer_name=data.get('customer_name'),
        customer_email=data.get('customer_email'),
        shipping_address=data.get('shipping_address'),
        payment_method=data.get('payment_method'),
        status=data.get('status', 'pending')
    )
    
    # Calculate total amount and create order items
    total_amount = 0
    
    for item_data in data.get('items', []):
        product_id = item_data.get('product_id')
        quantity = item_data.get('quantity', 1)
        
        # Get product to ensure it exists and get current price
        product = Product.query.get(product_id)
        if not product:
            return jsonify({'error': f'Product with ID {product_id} not found'}), 404
        
        # Check if enough stock
        if product.stock < quantity:
            return jsonify({'error': f'Insufficient stock for product {product.name}. Available: {product.stock}'}), 400
        
        # Create order item
        order_item = OrderItem(
            product_id=product_id,
            quantity=quantity,
            price=product.price
        )
        
        # Add to total amount
        total_amount += order_item.quantity * order_item.price
        
        # Update product stock
        product.stock -= quantity
        
        # Add order item to order
        order.items.append(order_item)
    
    # Set total amount
    order.total_amount = total_amount
    
    # Save to database
    db.session.add(order)
    db.session.commit()
    
    return jsonify(order.to_dict()), 201

# Update order status
@order_bp.route('/api/orders/<int:order_id>', methods=['PUT', 'OPTIONS'])
def update_order(order_id):
    if request.method == 'OPTIONS':
        return '', 200
        
    order = Order.query.get_or_404(order_id)
    data = request.get_json()
    
    # Update order attributes
    if 'status' in data:
        order.status = data['status']
    if 'shipping_address' in data:
        order.shipping_address = data['shipping_address']
    if 'payment_method' in data:
        order.payment_method = data['payment_method']
    
    db.session.commit()
    
    return jsonify(order.to_dict())

# Delete an order
@order_bp.route('/api/orders/<int:order_id>', methods=['DELETE', 'OPTIONS'])
def delete_order(order_id):
    if request.method == 'OPTIONS':
        return '', 200
        
    order = Order.query.get_or_404(order_id)
    
    # Restore product stock for each order item
    for item in order.items:
        product = Product.query.get(item.product_id)
        if product:
            product.stock += item.quantity
    
    db.session.delete(order)
    db.session.commit()
    
    return jsonify({'message': f'Order {order_id} has been deleted successfully'})
