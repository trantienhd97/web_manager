from flask import Flask
from flask_cors import CORS
from db_config import db
import os

def create_app():
    # Initialize Flask app
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes

    # Configure SQLite database
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database', 'store.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Ensure database directory exists
    os.makedirs(os.path.join(basedir, 'database'), exist_ok=True)

    # Initialize the app with SQLAlchemy
    db.init_app(app)

    # Import blueprints outside of app context to avoid circular imports
    from routes.product_routes import product_bp
    from routes.order_routes import order_bp
    from routes.dashboard_routes import dashboard_bp

    # Register blueprints
    app.register_blueprint(product_bp)
    app.register_blueprint(order_bp)
    app.register_blueprint(dashboard_bp)

    with app.app_context():
        # Create all tables
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=8080, debug=True)
