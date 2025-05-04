import React from 'react';

const DailyStats = ({ stats }) => {
    // Check if stats are available
    if (!stats) return <div className="stats-card">No daily data available</div>;

    return (
        <div className="stats-card daily-stats">
            <h2>Daily Sales Report</h2>
            <div className="stat-items-container">
                <div className="stat-item">
                    <h3>Products Sold</h3>
                    <p className="stat-value">{stats.soldProducts || 0}</p>
                </div>
                <div className="stat-item">
                    <h3>Total Products</h3>
                    <p className="stat-value">{stats.totalProducts || 0}</p>
                </div>
                <div className="stat-item">
                    <h3>Daily Orders</h3>
                    <p className="stat-value">{stats.dailyOrders || 0}</p>
                </div>
                <div className="stat-item">
                    <h3>Total Orders</h3>
                    <p className="stat-value">{stats.totalOrders || 0}</p>
                </div>
                {stats.totalSales !== undefined && (
                    <div className="stat-item">
                        <h3>Total Sales</h3>
                        <p className="stat-value">${stats.totalSales?.toFixed(2) || 0}</p>
                    </div>
                )}
                {stats.newCustomers !== undefined && (
                    <div className="stat-item">
                        <h3>New Customers</h3>
                        <p className="stat-value">{stats.newCustomers || 0}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DailyStats;