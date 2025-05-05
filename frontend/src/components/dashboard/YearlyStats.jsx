import React from 'react';

const YearlyStats = ({ stats }) => {
    // Check if stats are available
    if (!stats) return <div className="stats-card">No yearly data available</div>;

    return (
        <div className="stats-card yearly-stats"  style={{ width: 'fit-content' }}>
            <h2>Yearly Statistics</h2>
            <div className="stat-items-container">
                <div className="stat-item">
                    <h3>Year</h3>
                    <p className="stat-value">{stats.year || 'N/A'}</p>
                </div>
                <div className="stat-item">
                    <h3>Total Orders</h3>
                    <p className="stat-value">{stats.total_orders || 0}</p>
                </div>
                <div className="stat-item">
                    <h3>Total Sales</h3>
                    <p className="stat-value">${stats.total_sales?.toFixed(2) || 0}</p>
                </div>
                {stats.monthly_breakdown && stats.monthly_breakdown.length > 0 && (
                    <div className="stat-item">
                        <h3>Best Month</h3>
                        <p className="stat-value">
                            {stats.monthly_breakdown.sort((a, b) => b.sales - a.sales)[0]?.month.split('-')[1] || 'N/A'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default YearlyStats;