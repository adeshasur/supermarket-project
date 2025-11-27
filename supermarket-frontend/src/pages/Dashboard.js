import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  // 1. Data තියාගන්න State හදමු
  const [stats, setStats] = useState({
    income: 0,
    orders: 0,
    users: 0,
    lowStock: 0
  });

  const [loading, setLoading] = useState(true);

  // 2. ඔක්කොම Microservices වලින් Data අදින්න useEffect ලියමු
  useEffect(() => {
    const fetchData = async () => {
      try {
        // --- A. Orders Service (Income & Order Count) ---
        const ordersRes = await axios.get('http://localhost:8084/api/orders');
        const orders = ordersRes.data;

        // Income එක හදන්න (හැම Order එකේම totalAmount එකතු කරනවා)
        const totalIncome = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

        // --- B. Product Service (Low Stock Count) ---
        const productsRes = await axios.get('http://localhost:8081/api/products');
        // Stock එක 20 ට අඩු ඒවා ගණන් කරනවා
        const lowStockCount = productsRes.data.filter(p => p.stock < 20).length;

        // --- C. User Service (User Count) ---
        const usersRes = await axios.get('http://localhost:8083/api/customers');
        const userCount = usersRes.data.length;

        // State Update කරමු
        setStats({
          income: totalIncome,
          orders: orders.length,
          lowStock: lowStockCount,
          users: userCount
        });

      } catch (error) {
        console.error("Error loading dashboard data:", error);
        // Error ආවොත් බය වෙන්න දෙයක් නෑ, පරණ (0) අගයන්ම තියෙයි
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="page-title">Dashboard Overview</h1>
      <p style={{ marginBottom: '30px', color: '#666' }}>Welcome back! Here is what's happening with your store today.</p>

      {/* --- STATS CARDS SECTION --- */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>

        {/* Card 1: Total Income */}
        <div style={{ ...statCardStyle, borderLeft: '5px solid #28a745' }}>
          <h3 style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Total Income</h3>
          <h2 style={{ margin: '10px 0', fontSize: '2rem', color: '#28a745' }}>
            Rs. {loading ? '...' : stats.income.toLocaleString()}
          </h2>
        </div>

        {/* Card 2: Total Orders */}
        <div style={{ ...statCardStyle, borderLeft: '5px solid #007aff' }}>
          <h3 style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Total Orders</h3>
          <h2 style={{ margin: '10px 0', fontSize: '2rem', color: '#007aff' }}>
            {loading ? '...' : stats.orders}
          </h2>
        </div>

        {/* Card 3: Low Stock Warning */}
        <div style={{ ...statCardStyle, borderLeft: '5px solid #dc3545' }}>
          <h3 style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Low Stock Items</h3>
          <h2 style={{ margin: '10px 0', fontSize: '2rem', color: '#dc3545' }}>
            {loading ? '...' : stats.lowStock}
          </h2>
        </div>

        {/* Card 4: Total Users */}
        <div style={{ ...statCardStyle, borderLeft: '5px solid #ffc107' }}>
          <h3 style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Active Users</h3>
          <h2 style={{ margin: '10px 0', fontSize: '2rem', color: '#ffc107' }}>
            {loading ? '...' : stats.users}
          </h2>
        </div>

      </div>

      {/* --- NAVIGATION CARDS --- */}
      <h3 style={{ marginBottom: '20px', color: '#333' }}>Quick Access</h3>
      <div className="dashboard-grid">
        <Link to="/products" className="card">
          <h2>📦</h2>
          <h3>Products</h3>
          <p>Manage Catalog</p>
        </Link>
        <Link to="/inventory" className="card">
          <h2>📋</h2>
          <h3>Inventory</h3>
          <p>Update Stock</p>
        </Link>
        <Link to="/orders" className="card">
          <h2>🛒</h2>
          <h3>Orders</h3>
          <p>Process Orders</p>
        </Link>
        <Link to="/users" className="card">
          <h2>👥</h2>
          <h3>Users</h3>
          <p>Customer Details</p>
        </Link>
        <Link to="/payment" className="card">
          <h2>💳</h2>
          <h3>Payments</h3>
          <p>Transactions</p>
        </Link>
      </div>
    </div>
  );
}

// පොඩි CSS කෑල්ලක් මේ ෆයිල් එක ඇතුලෙම ලියමු (ලේසි වෙන්න)
const statCardStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  flex: 1,
  minWidth: '200px'
};

export default Dashboard;