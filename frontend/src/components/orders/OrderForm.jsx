import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createOrder } from '../../services/orderService';
import { getProducts } from '../../services/productService';
import './OrderForm.css';

const OrderForm = () => {
    const [orderData, setOrderData] = useState({
        productId: '',
        quantity: 1,
        customerName: '',
        customerEmail: '',
        shippingAddress: '',
        notes: ''
    });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    // Fetch products for the dropdown
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const productsData = await getProducts();
                setProducts(productsData);
                setError(null);
            } catch (err) {
                setError('Failed to load products: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderData({
            ...orderData,
            [name]: name === 'quantity' ? parseInt(value) || 1 : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            await createOrder(orderData);
            setSuccess('Order created successfully!');
            setTimeout(() => navigate('/orders'), 1500);
        } catch (err) {
            setError('Error creating order: ' + (err.response?.data?.message || err.message));
        }
    };

    if (loading) {
        return <div className="loading">Loading products data...</div>;
    }

    return (
        <div className="order-form-container">
            <div className="form-header">
                <h2>Create New Order</h2>
                <Link to="/orders" className="back-button">Back to Orders</Link>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            
            <form onSubmit={handleSubmit} className="order-form">
                <div className="form-group">
                    <label htmlFor="productId">Select Product:</label>
                    <select
                        id="productId"
                        name="productId"
                        value={orderData.productId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select a Product --</option>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>
                                {product.name} - ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={orderData.quantity}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="customerName">Customer Name:</label>
                    <input
                        type="text"
                        id="customerName"
                        name="customerName"
                        value={orderData.customerName}
                        onChange={handleChange}
                        required
                        placeholder="Enter customer name"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="customerEmail">Customer Email:</label>
                    <input
                        type="email"
                        id="customerEmail"
                        name="customerEmail"
                        value={orderData.customerEmail}
                        onChange={handleChange}
                        required
                        placeholder="Enter customer email"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="shippingAddress">Shipping Address:</label>
                    <textarea
                        id="shippingAddress"
                        name="shippingAddress"
                        value={orderData.shippingAddress}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Enter shipping address"
                    ></textarea>
                </div>
                
                <div className="form-group">
                    <label htmlFor="notes">Order Notes:</label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={orderData.notes}
                        onChange={handleChange}
                        rows="2"
                        placeholder="Any special instructions for this order"
                    ></textarea>
                </div>
                
                <div className="form-actions">
                    <button type="button" className="cancel-button" onClick={() => navigate('/orders')}>
                        Cancel
                    </button>
                    <button type="submit" className="submit-button">
                        Submit Order
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OrderForm;