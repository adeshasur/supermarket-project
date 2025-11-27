import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1>Overview</h1>
      <p>Welcome to the Supermarket Management System.</p>
      
      <div className="dashboard-grid">
        <Link to="/products" className="card">
            <h2>📦</h2>
            <h3>Products</h3>
            <p>Manage Items</p>
        </Link>
        <Link to="/inventory" className="card">
            <h2>📋</h2>
            <h3>Inventory</h3>
            <p>Stock Levels</p>
        </Link>
        <Link to="/orders" className="card">
            <h2>🛒</h2>
            <h3>Orders</h3>
            <p>View Orders</p>
        </Link>
        {/* Changed to Users */}
        <Link to="/users" className="card">
            <h2>👥</h2>
            <h3>Users</h3>
            <p>User Details</p>
        </Link>
        {/* Added Payment Card (Optional) */}
        <Link to="/payment" className="card">
            <h2>💳</h2>
            <h3>Payment</h3>
            <p>Transactions</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;