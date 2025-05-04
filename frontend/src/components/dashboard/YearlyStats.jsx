import React, { useEffect, useState } from 'react';
import { fetchYearlyStats } from '../../services/api';

const YearlyStats = () => {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getYearlyStats = async () => {
            try {
                const data = await fetchYearlyStats();
                setStats(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getYearlyStats();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Yearly Statistics</h2>
            <table>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Total Sales</th>
                        <th>Total Orders</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map((stat) => (
                        <tr key={stat.year}>
                            <td>{stat.year}</td>
                            <td>{stat.totalSales}</td>
                            <td>{stat.totalOrders}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default YearlyStats;