import React from 'react';

const QuarterlyStats = ({ stats }) => {
    // Check if stats are available
    if (!stats) return <div className="stats-card">No quarterly data available</div>;

    return (
        <div className="stats-card quarterly-stats"  style={{ width: 'fit-content' }}>
            <h2>Quarterly Statistics</h2>
            <div className="stat-items-container">
                <div className="stat-item">
                    <h3>Quarter</h3>
                    <p className="stat-value">{stats.quarter || 'N/A'}</p>
                </div>
                <div className="stat-item">
                    <h3>Orders Count</h3>
                    <p className="stat-value">{stats.orders_count || 0}</p>
                </div>
                <div className="stat-item">
                    <h3>Total Sales</h3>
                    <p className="stat-value">${stats.total_sales?.toFixed(2) || 0}</p>
                </div>
                {stats.category_distribution && stats.category_distribution.length > 0 && (
                    <div className="stat-item category-distribution">
                        <h3>Top Category</h3>
                        <p className="stat-value">{stats.category_distribution[0]?.name || 'N/A'}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuarterlyStats;