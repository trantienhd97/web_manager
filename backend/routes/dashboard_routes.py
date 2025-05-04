from flask import jsonify, request, Blueprint
from models.order import Order
from models.product import Product
from db_config import db
from sqlalchemy import func
from datetime import datetime, timedelta

# Create a blueprint for dashboard routes
dashboard_bp = Blueprint('dashboard', __name__)

# Get daily statistics with product and order counts for the dashboard
@dashboard_bp.route('/api/dashboard/daily-stats', methods=['GET', 'OPTIONS'])
def get_daily_dashboard_stats():
    if request.method == 'OPTIONS':
        return '', 200
        
    # Calculate today's date
    today = datetime.utcnow().date()
    
    # Get today's orders count
    daily_orders = db.session.query(func.count(Order.id)).filter(
        func.date(Order.created_at) == today
    ).scalar() or 0
    
    # Get total orders count
    total_orders = db.session.query(func.count(Order.id)).scalar() or 0
    
    # Count products sold today (from order items)
    today_orders = Order.query.filter(
        func.date(Order.created_at) == today
    ).all()
    
    sold_products = 0
    for order in today_orders:
        for item in order.items:
            sold_products += item.quantity
    
    # Get total products count
    total_products = db.session.query(func.count(Product.id)).scalar() or 0
    
    return jsonify({
        'soldProducts': sold_products,
        'totalProducts': total_products,
        'dailyOrders': daily_orders,
        'totalOrders': total_orders
    })

# Get daily statistics
@dashboard_bp.route('/api/dashboard/daily', methods=['GET', 'OPTIONS'])
def get_daily_stats():
    if request.method == 'OPTIONS':
        return '', 200
        
    # Calculate today's date and yesterday's date
    today = datetime.utcnow().date()
    yesterday = today - timedelta(days=1)
    
    # Get today's orders
    today_orders = Order.query.filter(
        func.date(Order.created_at) == today
    ).all()
    
    # Get today's sales total
    today_sales = sum(order.total_amount for order in today_orders)
    
    # Get yesterday's sales total for comparison
    yesterday_orders = Order.query.filter(
        func.date(Order.created_at) == yesterday
    ).all()
    yesterday_sales = sum(order.total_amount for order in yesterday_orders)
    
    # Calculate sales growth
    sales_growth = 0
    if yesterday_sales > 0:
        sales_growth = ((today_sales - yesterday_sales) / yesterday_sales) * 100
    
    # Get most sold products today
    product_sales = {}
    for order in today_orders:
        for item in order.items:
            if item.product_id in product_sales:
                product_sales[item.product_id] += item.quantity
            else:
                product_sales[item.product_id] = item.quantity
    
    # Get top 5 products
    top_products = []
    if product_sales:
        for product_id, quantity in sorted(product_sales.items(), key=lambda x: x[1], reverse=True)[:5]:
            product = Product.query.get(product_id)
            if product:
                top_products.append({
                    'id': product.id,
                    'name': product.name,
                    'quantity_sold': quantity
                })
    
    return jsonify({
        'date': today.isoformat(),
        'orders_count': len(today_orders),
        'total_sales': today_sales,
        'sales_growth': sales_growth,
        'top_products': top_products
    })

# Get monthly statistics
@dashboard_bp.route('/api/dashboard/monthly', methods=['GET', 'OPTIONS'])
def get_monthly_stats():
    if request.method == 'OPTIONS':
        return '', 200
        
    # Calculate current month's start and end
    today = datetime.utcnow().date()
    month_start = datetime(today.year, today.month, 1).date()
    
    # Get previous month's start for comparison
    if today.month == 1:
        prev_month_start = datetime(today.year - 1, 12, 1).date()
    else:
        prev_month_start = datetime(today.year, today.month - 1, 1).date()
    
    # Get current month's orders
    current_month_orders = Order.query.filter(
        func.date(Order.created_at) >= month_start
    ).all()
    
    # Get current month's sales total
    current_month_sales = sum(order.total_amount for order in current_month_orders)
    
    # Calculate performance metrics
    avg_order_value = 0
    if current_month_orders:
        avg_order_value = current_month_sales / len(current_month_orders)
    
    # Get previous month's sales for comparison
    prev_month_orders = Order.query.filter(
        func.date(Order.created_at) >= prev_month_start,
        func.date(Order.created_at) < month_start
    ).all()
    prev_month_sales = sum(order.total_amount for order in prev_month_orders)
    
    # Calculate growth
    sales_growth = 0
    if prev_month_sales > 0:
        sales_growth = ((current_month_sales - prev_month_sales) / prev_month_sales) * 100
    
    return jsonify({
        'month': f"{today.year}-{today.month:02d}",
        'orders_count': len(current_month_orders),
        'total_sales': current_month_sales,
        'avg_order_value': avg_order_value,
        'sales_growth': sales_growth
    })

# Get quarterly statistics
@dashboard_bp.route('/api/dashboard/quarterly', methods=['GET', 'OPTIONS'])
def get_quarterly_stats():
    if request.method == 'OPTIONS':
        return '', 200
        
    # Calculate current quarter
    today = datetime.utcnow().date()
    current_quarter = (today.month - 1) // 3 + 1
    quarter_start_month = 3 * (current_quarter - 1) + 1
    
    # Get quarter start and end dates
    quarter_start = datetime(today.year, quarter_start_month, 1).date()
    
    # Get quarterly orders and sales
    quarterly_orders = Order.query.filter(
        func.date(Order.created_at) >= quarter_start
    ).all()
    
    quarterly_sales = sum(order.total_amount for order in quarterly_orders)
    
    # Get product category distribution
    category_sales = {}
    for order in quarterly_orders:
        for item in order.items:
            product = Product.query.get(item.product_id)
            if product and product.category:
                category = product.category
                if category in category_sales:
                    category_sales[category] += item.quantity * item.price
                else:
                    category_sales[category] = item.quantity * item.price
    
    # Format category distribution for response
    categories = [
        {'name': category, 'sales': sales}
        for category, sales in category_sales.items()
    ]
    
    return jsonify({
        'quarter': f"Q{current_quarter} {today.year}",
        'orders_count': len(quarterly_orders),
        'total_sales': quarterly_sales,
        'category_distribution': categories
    })

# Get yearly statistics
@dashboard_bp.route('/api/dashboard/yearly', methods=['GET', 'OPTIONS'])
def get_yearly_stats():
    if request.method == 'OPTIONS':
        return '', 200
        
    # Calculate current year start
    today = datetime.utcnow().date()
    year_start = datetime(today.year, 1, 1).date()
    
    # Get yearly orders and sales
    yearly_orders = Order.query.filter(
        func.date(Order.created_at) >= year_start
    ).all()
    
    yearly_sales = sum(order.total_amount for order in yearly_orders)
    
    # Calculate monthly breakdown
    monthly_breakdown = []
    for month in range(1, 13):
        month_start = datetime(today.year, month, 1).date()
        
        # Set month end
        if month < 12:
            month_end = datetime(today.year, month + 1, 1).date()
        else:
            month_end = datetime(today.year + 1, 1, 1).date()
        
        # Only include months up to current month
        if month_start <= today:
            month_orders = Order.query.filter(
                func.date(Order.created_at) >= month_start,
                func.date(Order.created_at) < month_end
            ).all()
            
            month_sales = sum(order.total_amount for order in month_orders)
            
            monthly_breakdown.append({
                'month': f"{today.year}-{month:02d}",
                'orders_count': len(month_orders),
                'sales': month_sales
            })
    
    return jsonify({
        'year': today.year,
        'total_orders': len(yearly_orders),
        'total_sales': yearly_sales,
        'monthly_breakdown': monthly_breakdown
    })
