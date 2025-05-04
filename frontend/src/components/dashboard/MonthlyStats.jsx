import React, { useEffect, useState } from 'react';
import { fetchMonthlyStats } from '../../services/api';

const MonthlyStats = () => {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMonthlyStats = async () => {
            try {
                const data = await fetchMonthlyStats();
                setStats(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getMonthlyStats();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Monthly Statistics</h2>
            <ul>
                {stats.map((stat, index) => (
                    <li key={index}>
                        {stat.month}: {stat.value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MonthlyStats;