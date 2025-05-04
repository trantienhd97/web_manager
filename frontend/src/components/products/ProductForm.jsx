import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import productService from '../../services/productService';
import './ProductForm.css';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        code: '',
        name: '',
        price: '',
        description: ''
    });
    const [loading, setLoading] = useState(id ? true : false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            productService.getProductById(id)
                .then(data => {
                    setProduct(data);
                    setLoading(false);
                })
                .catch(err => {
                    setError('Failed to load product. ' + err.message);
                    setLoading(false);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: name === 'price' ? parseFloat(value) || '' : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        
        try {
            if (id) {
                await productService.updateProduct(id, product);
                setSuccess('Product updated successfully!');
                setTimeout(() => navigate('/products'), 1500);
            } else {
                await productService.createProduct(product);
                setSuccess('Product created successfully!');
                setTimeout(() => navigate('/products'), 1500);
            }
        } catch (err) {
            setError('Failed to save product. ' + (err.response?.data?.message || err.message));
        }
    };

    if (loading) {
        return <div className="loading">Loading product data...</div>;
    }

    return (
        <div className="product-form-container">
            <div className="form-header">
                <h2>{id ? 'Edit Product' : 'Add New Product'}</h2>
                <Link to="/products" className="back-button">Back to Products</Link>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label htmlFor="code">Product Code:</label>
                    <input 
                        type="text" 
                        id="code" 
                        name="code" 
                        value={product.code} 
                        onChange={handleChange} 
                        required 
                        placeholder="Enter unique product code"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="name">Product Name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={product.name} 
                        onChange={handleChange} 
                        required 
                        placeholder="Enter product name"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="price">Price ($):</label>
                    <input 
                        type="number" 
                        id="price" 
                        name="price" 
                        value={product.price} 
                        onChange={handleChange} 
                        required 
                        min="0.01" 
                        step="0.01" 
                        placeholder="0.00"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        value={product.description} 
                        onChange={handleChange}
                        rows="4"
                        placeholder="Enter product description"
                    ></textarea>
                </div>
                
                <div className="form-actions">
                    <button type="button" className="cancel-button" onClick={() => navigate('/products')}>
                        Cancel
                    </button>
                    <button type="submit" className="submit-button">
                        {id ? 'Update' : 'Create'} Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;