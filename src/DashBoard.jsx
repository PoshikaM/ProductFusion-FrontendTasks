import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const fetchSalesData = async (startDate, endDate, category) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const startTimestamp = startDate ? new Date(startDate).getTime() : new Date('2023-01-01').getTime();
  const endTimestamp = endDate ? new Date(endDate).getTime() : new Date().getTime();
  const days = Math.floor((endTimestamp - startTimestamp) / (1000 * 60 * 60 * 24));
  const data = [];
  const categories = ['Electronics', 'Clothing', 'Food', 'Books'];
  const selectedCategories = category ? [category] : categories;

  for (let i = 0; i <= days; i++) {
    const date = new Date(startTimestamp + i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().split('T')[0];
    const dataPoint = { date: dateStr };
    selectedCategories.forEach(cat => {
      const baseValue = (date.getDay() + 1) * 100;
      const multiplier = categories.indexOf(cat) + 1;
      const randomFactor = ((date.getDate() + categories.indexOf(cat)) % 3) * 0.2 + 0.8;
      dataPoint[cat] = Math.round(baseValue * multiplier * randomFactor);
    });
    data.push(dataPoint);
  }
  return data;
};

const Dashboard = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch data with caching
  const getData = async () => {
    setLoading(true);
    setError('');

    const cacheKey = `${startDate}_${endDate}_${category}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setData(JSON.parse(cached));
      setLoading(false);
      return;
    }

    try {
      const result = await fetchSalesData(startDate, endDate, category);
      localStorage.setItem(cacheKey, JSON.stringify(result));
      setData(result);
    } catch (err) {
        console.log(err)
      setError('Failed to load data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [startDate, endDate, category]);

  const categories = ['Electronics', 'Clothing', 'Food', 'Books'];

  const summaryStats = categories.map(cat => ({
    category: cat,
    total: data.reduce((sum, item) => sum + (item[cat] || 0), 0),
  }));

  return (
    <div className="dashboard-container">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Sales Dashboard</h1>

      <div className="filters-container">
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading && <div className="loading">Loading data...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <>
          {/* Line Chart */}
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {(category ? [category] : categories).map(cat => (
                  <Line
                    key={cat}
                    type="monotone"
                    dataKey={cat}
                    stroke={
                      {
                        Electronics: '#8884d8',
                        Clothing: '#82ca9d',
                        Food: '#ffc658',
                        Books: '#ff8042'
                      }[cat]
                    }
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Summary */}
          <div className="summary-container">
            {summaryStats.map(stat => (
              <div key={stat.category} className="summary-card">
                <h3>{stat.category}</h3>
                <p>{stat.total}</p>
              </div>
            ))}
          </div>

          {/* Data Table */}
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  {(category ? [category] : categories).map(cat => (
                    <th key={cat}>{cat}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.date}</td>
                    {(category ? [category] : categories).map(cat => (
                      <td key={cat}>{row[cat]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;