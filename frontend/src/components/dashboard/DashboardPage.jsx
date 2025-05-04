import React, { useEffect, useState } from 'react';
import DailyStats from './DailyStats';
import MonthlyStats from './MonthlyStats';
import QuarterlyStats from './QuarterlyStats';
import YearlyStats from './YearlyStats';
import { Link } from 'react-router-dom';
import './DashboardPage.css';

const DashboardPage = () => {
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     // Simulate loading data
    //     const timer = setTimeout(() => {
    //         setIsLoading(false);
    //     }, 1000);
        
    //     return () => clearTimeout(timer);
    // }, []);

    // if (isLoading) {
    //     return <div className="dashboard-loading">Loading dashboard data...</div>;
    // }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Store Manager Dashboard</h1>
                <p className="dashboard-date">Date: {new Date().toLocaleDateString()}</p>
            </header>
            
            <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                    <Link to="/products/new" className="action-button products-action">
                        <span className="action-icon">+</span>
                        <span>Add Product</span>
                    </Link>
                    <Link to="/orders/new" className="action-button orders-action">
                        <span className="action-icon">+</span>
                        <span>Create Order</span>
                    </Link>
                    <Link to="/products" className="action-button view-action">
                        <span className="action-icon">👁</span>
                        <span>View Products</span>
                    </Link>
                    <Link to="/orders" className="action-button view-action">
                        <span className="action-icon">👁</span>
                        <span>View Orders</span>
                    </Link>
                </div>
            </div>
            
            <div className="stats-grid">
                <div className="stats-card">
                    <DailyStats />
                </div>
                <div className="stats-card">
                    <MonthlyStats />
                </div>
                <div className="stats-card">
                    <QuarterlyStats />
                </div>
                <div className="stats-card">
                    <YearlyStats />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;