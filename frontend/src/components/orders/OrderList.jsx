import React, { useEffect, useState } from 'react';
import { getOrders } from '../../services/orderService';
import { Link } from 'react-router-dom';
import ErrorDisplay from '../common/ErrorDisplay';
import './OrderList.css'; // We'll create this CSS file

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div className="loading">Loading orders...</div>;
    if (error) return <ErrorDisplay error={error} />;

    return (
        <div className="order-list-container">
            <div className="order-list-header">
                <h2>Order List</h2>
                <Link to="/orders/new" className="add-order-button">
                    <span className="plus-icon">+</span> Create New Order
                </Link>
            </div>

            {orders.length === 0 ? (
                <p className="no-orders">No orders found. Create your first order!</p>
            ) : (
                <div className="order-table-container">
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer Name</th>
                                <th>Total Price</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.customerName}</td>
                                    <td>${typeof order.totalPrice === 'number' ? order.totalPrice.toFixed(2) : order.totalPrice}</td>
                                    <td>{new Date(order.date).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`status-badge ${order.status?.toLowerCase() || 'pending'}`}>
                                            {order.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td>
                                        <Link to={`/orders/${order.id}`} className="view-button">View Details</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderList;