import React, { useEffect, useState } from 'react';
import DailyStats from './DailyStats';
import MonthlyStats from './MonthlyStats';
import QuarterlyStats from './QuarterlyStats';
import YearlyStats from './YearlyStats';
import { Link } from 'react-router-dom';
import './DashboardPage.css';
import { fetchDailyStats, fetchMonthlyStats, fetchQuarterlyStats, fetchYearlyStats } from '../../services/api';

const DashboardPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dailyStats, setDailyStats] = useState({
        soldProducts: 0,
        totalProducts: 0,
        dailyOrders: 0,
        totalOrders: 0
    });
    const [monthlyStats, setMonthlyStats] = useState(null);
    const [quarterlyStats, setQuarterlyStats] = useState(null);
    const [yearlyStats, setYearlyStats] = useState(null);

    useEffect(() => {
        const fetchAllStats = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch all stats in parallel
                const [daily, monthly, quarterly, yearly] = await Promise.all([
                    fetchDailyStats(),
                    fetchMonthlyStats(),
                    fetchQuarterlyStats(),
                    fetchYearlyStats()
                ]);
                
                setDailyStats(daily);
                setMonthlyStats(monthly);
                setQuarterlyStats(quarterly);
                setYearlyStats(yearly);
            } catch (error) {
                console.error('Error fetching statistics:', error);
                setError('Failed to load dashboard data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchAllStats();
    }, []);

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
            
            {loading ? (
                <div className="loading-message">Loading dashboard data...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <div className="stats-grid">
                    <DailyStats stats={dailyStats} />
                    <MonthlyStats stats={monthlyStats} />
                    <QuarterlyStats stats={quarterlyStats} />
                    <YearlyStats stats={yearlyStats} />
                </div>
            )}
        </div>
    );
};

export default DashboardPage;