import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const cardStyle = {
    background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    textAlign: 'center', flex: 1, minWidth: '200px', textDecoration: 'none', color: '#333', transition: 'transform 0.2s'
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '30px', fontSize: '2rem' }}>👋 Welcome Back, Admin</h1>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <Link to="/products" style={cardStyle}>
            <h2 style={{ fontSize: '3rem', margin: '0 0 10px', color: '#007aff' }}>📦</h2>
            <h3>Products</h3>
            <p>Manage Catalog</p>
        </Link>
        <Link to="/inventory" style={cardStyle}>
            <h2 style={{ fontSize: '3rem', margin: '0 0 10px', color: '#28a745' }}>📋</h2>
            <h3>Inventory</h3>
            <p>Check Stock Levels</p>
        </Link>
        <Link to="/orders" style={cardStyle}>
            <h2 style={{ fontSize: '3rem', margin: '0 0 10px', color: '#f59e0b' }}>🛒</h2>
            <h3>Orders</h3>
            <p>Process Orders</p>
        </Link>
        <Link to="/customers" style={cardStyle}>
            <h2 style={{ fontSize: '3rem', margin: '0 0 10px', color: '#6f42c1' }}>👥</h2>
            <h3>Customers</h3>
            <p>View User Base</p>
        </Link>
      </div>
    </div>
  );
}
export default Dashboard;