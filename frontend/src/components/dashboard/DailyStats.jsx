import React, { useEffect, useState } from 'react';
import { fetchDailyStats } from '../../services/api';

const DailyStats = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getStats = async () => {
            try {
                const data = await fetchDailyStats();
                setStats(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getStats();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Daily Statistics</h2>
            {stats ? (
                <ul>
                    <li>Total Sales: {stats.totalSales}</li>
                    <li>Total Orders: {stats.totalOrders}</li>
                    <li>New Customers: {stats.newCustomers}</li>
                </ul>
            ) : (
                <div>No data available</div>
            )}
        </div>
    );
};

export default DailyStats;