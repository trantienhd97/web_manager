import React from 'react';

const MonthlyStats = ({ stats }) => {
    // Check if stats are available
    if (!stats) return <div className="stats-card">No monthly data available</div>;

    return (
        <div className="stats-card monthly-stats"  style={{ width: 'fit-content' }}>
            <h2>Monthly Statistics</h2>
            <div className="stat-items-container">
                <div className="stat-item">
                    <h3>Month</h3>
                    <p className="stat-value">{stats.month || 'N/A'}</p>
                </div>
                <div className="stat-item">
                    <h3>Orders Count</h3>
                    <p className="stat-value">{stats.orders_count || 0}</p>
                </div>
                <div className="stat-item">
                    <h3>Total Sales</h3>
                    <p className="stat-value">${stats.total_sales?.toFixed(2) || 0}</p>
                </div>
                <div className="stat-item">
                    <h3>Average Order Value</h3>
                    <p className="stat-value">${stats.avg_order_value?.toFixed(2) || 0}</p>
                </div>
                {stats.sales_growth !== undefined && (
                    <div className="stat-item">
                        <h3>Growth</h3>
                        <p className="stat-value">{stats.sales_growth.toFixed(1) || 0}%</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MonthlyStats;