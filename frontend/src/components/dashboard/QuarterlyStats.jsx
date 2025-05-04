import React, { useEffect, useState } from 'react';
import { fetchQuarterlyStats } from '../../services/api';

const QuarterlyStats = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getStats = async () => {
            try {
                const data = await fetchQuarterlyStats();
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
            <h2>Quarterly Statistics</h2>
            {stats ? (
                <ul>
                    {stats.map((stat, index) => (
                        <li key={index}>
                            <strong>Quarter:</strong> {stat.quarter} - <strong>Sales:</strong> ${stat.sales}
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No data available</div>
            )}
        </div>
    );
};

export default QuarterlyStats;