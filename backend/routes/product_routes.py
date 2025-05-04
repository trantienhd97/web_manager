from flask import request, jsonify, Blueprint
from models.product import Product
from db_config import db

# Create a blueprint for product routes
product_bp = Blueprint('products', __name__)

# Get all products
@product_bp.route('/api/products', methods=['GET', 'OPTIONS'])
def get_products():
    if request.method == 'OPTIONS':
        return '', 200  # Return empty response with 200 OK for OPTIONS requests
    
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])

# Get a single product by ID
@product_bp.route('/api/products/<int:product_id>', methods=['GET', 'OPTIONS'])
def get_product(product_id):
    if request.method == 'OPTIONS':
        return '', 200
        
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict())

# Create a new product
@product_bp.route('/api/products', methods=['POST', 'OPTIONS'])
def create_product():
    if request.method == 'OPTIONS':
        return '', 200
        
    data = request.get_json()
    
    # Basic validation
    if not data.get('name') or not data.get('price'):
        return jsonify({'error': 'Name and price are required fields'}), 400
    
    product = Product(
        name=data.get('name'),
        description=data.get('description'),
        price=float(data.get('price')),
        stock=int(data.get('stock', 0)),
        image_url=data.get('image_url'),
        category=data.get('category')
    )
    
    db.session.add(product)
    db.session.commit()
    
    return jsonify(product.to_dict()), 201

# Update a product
@product_bp.route('/api/products/<int:product_id>', methods=['PUT', 'OPTIONS'])
def update_product(product_id):
    if request.method == 'OPTIONS':
        return '', 200
        
    product = Product.query.get_or_404(product_id)
    data = request.get_json()
    
    # Update product attributes
    if 'name' in data:
        product.name = data['name']
    if 'description' in data:
        product.description = data['description']
    if 'price' in data:
        product.price = float(data['price'])
    if 'stock' in data:
        product.stock = int(data['stock'])
    if 'image_url' in data:
        product.image_url = data['image_url']
    if 'category' in data:
        product.category = data['category']
    
    db.session.commit()
    
    return jsonify(product.to_dict())

# Delete a product
@product_bp.route('/api/products/<int:product_id>', methods=['DELETE', 'OPTIONS'])
def delete_product(product_id):
    if request.method == 'OPTIONS':
        return '', 200
        
    product = Product.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': f'Product {product_id} has been deleted successfully'})

# Search products
@product_bp.route('/api/products/search', methods=['GET', 'OPTIONS'])
def search_products():
    if request.method == 'OPTIONS':
        return '', 200
        
    query = request.args.get('q', '')
    category = request.args.get('category', '')
    
    # Start with a base query
    products_query = Product.query
    
    # Apply filters
    if query:
        products_query = products_query.filter(Product.name.like(f'%{query}%') | 
                                             Product.description.like(f'%{query}%'))
    
    if category:
        products_query = products_query.filter(Product.category == category)
    
    # Execute query
    products = products_query.all()
    
    return jsonify([product.to_dict() for product in products])
