import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/productService';
import { Link } from 'react-router-dom';
import ErrorDisplay from '../common/ErrorDisplay';
import './ProductList.css'; // We'll create this CSS file

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProductData = async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, []);

    if (loading) return <div className="loading">Loading products...</div>;
    if (error) return <ErrorDisplay error={error} retry={fetchProductData} />;

    return (
        <div className="product-list-container">
            <div className="product-list-header">
                <h2>Product List</h2>
                <Link to="/products/new" className="add-product-button">
                    <span className="plus-icon">+</span> Add New Product
                </Link>
            </div>

            {products.length === 0 ? (
                <p className="no-products">No products found. Add your first product!</p>
            ) : (
                <div className="product-grid">
                    {products.map(product => (
                        <div className="product-card" key={product.id}>
                            <h3>{product.name}</h3>
                            <p><strong>Code:</strong> {product.code}</p>
                            <p><strong>Price:</strong> ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</p>
                            <div className="product-actions">
                                <Link to={`/products/${product.id}`} className="view-button">View Details</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;