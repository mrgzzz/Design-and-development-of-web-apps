import React, { useState, useEffect } from 'react';

const AnalyticsDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dateFilter, setDateFilter] = useState('week');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const mockData = {
                    users: 1245,
                    revenue: 45678,
                    orders: 289,
                    conversion: 4.2,
                    chartData: [
                        { day: 'Mon', value: 120 },
                        { day: 'Tue', value: 190 },
                        { day: 'Wed', value: 300 },
                        { day: 'Thu', value: 250 },
                        { day: 'Fri', value: 180 },
                        { day: 'Sat', value: 220 },
                        { day: 'Sun', value: 280 }
                    ]
                };
                
                setData(mockData);
                setError(null);
            } catch (err) {
                setError('Ошибка загрузки данных');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dateFilter]);

    const SimpleChart = ({ data }) => {
        const maxValue = Math.max(...data.map(item => item.value));
        
        return (
            <div style={{ display: 'flex', alignItems: 'end', height: '200px', gap: '10px', marginTop: '20px' }}>
                {data.map((item, index) => (
                    <div key={index} style={{ textAlign: 'center', flex: 1 }}>
                        <div
                            style={{
                                height: `${(item.value / maxValue) * 150}px`,
                                backgroundColor: '#007bff',
                                borderRadius: '4px 4px 0 0'
                            }}
                        />
                        <div style={{ marginTop: '5px', fontSize: '12px' }}>{item.day}</div>
                    </div>
                ))}
            </div>
        );
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <div>Загрузка данных...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
                <div>{error}</div>
                <button onClick={() => window.location.reload()} style={{ marginTop: '10px' }}>
                    Повторить
                </button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <h1>Аналитический дашборд</h1>
            
            <div style={{ marginBottom: '30px' }}>
                {['day', 'week', 'month', 'year'].map(filter => (
                    <button
                        key={filter}
                        onClick={() => setDateFilter(filter)}
                        style={{
                            marginRight: '10px',
                            padding: '8px 16px',
                            backgroundColor: dateFilter === filter ? '#007bff' : '#f8f9fa',
                            color: dateFilter === filter ? 'white' : 'black',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                    >
                        {filter === 'day' && 'День'}
                        {filter === 'week' && 'Неделя'}
                        {filter === 'month' && 'Месяц'}
                        {filter === 'year' && 'Год'}
                    </button>
                ))}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
            }}>
                <div style={{
                    padding: '20px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    textAlign: 'center',
                    backgroundColor: '#f8f9fa'
                }}>
                    <h3>Пользователи</h3>
                    <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#007bff' }}>
                        {data.users.toLocaleString()}
                    </div>
                </div>

                <div style={{
                    padding: '20px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    textAlign: 'center',
                    backgroundColor: '#f8f9fa'
                }}>
                    <h3>Доход</h3>
                    <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#28a745' }}>
                        ${data.revenue.toLocaleString()}
                    </div>
                </div>

                <div style={{
                    padding: '20px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    textAlign: 'center',
                    backgroundColor: '#f8f9fa'
                }}>
                    <h3>Заказы</h3>
                    <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#ffc107' }}>
                        {data.orders}
                    </div>
                </div>

                <div style={{
                    padding: '20px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    textAlign: 'center',
                    backgroundColor: '#f8f9fa'
                }}>
                    <h3>Конверсия</h3>
                    <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#dc3545' }}>
                        {data.conversion}%
                    </div>
                </div>
            </div>

            <div style={{
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: 'white'
            }}>
                <h3>Активность за неделю</h3>
                <SimpleChart data={data.chartData} />
            </div>
        </div>
    );
};

export default AnalyticsDashboard;