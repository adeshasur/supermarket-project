import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // useNavigate ගත්තා redirect කරන්න
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // දැනට Alert එකක් දාලා Dashboard එකටම යවමු (හෝ Login Page එකට)
    if (window.confirm("Are you sure you want to logout?")) {
      alert("Logged out successfully! 👋");
      // මෙතන පස්සේ Login page එකට redirect කරන්න පුළුවන්
      navigate('/');
    }
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <span className="logo-dot"></span>
        Supermarket
      </div>

      {/* Menu Items */}
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')} end>
            <span>📊</span> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
            <span>📦</span> Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/inventory" className={({ isActive }) => (isActive ? 'active' : '')}>
            <span>📋</span> Inventory
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders" className={({ isActive }) => (isActive ? 'active' : '')}>
            <span>🛒</span> Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : '')}>
            <span>👥</span> Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/payment" className={({ isActive }) => (isActive ? 'active' : '')}>
            <span>💳</span> Payment
          </NavLink>
        </li>
      </ul>

      {/* 👇 Logout Button at Bottom */}
      <button className="logout-btn" onClick={handleLogout}>
        <span>🚪</span> Logout
      </button>

    </nav>
  );
}

export default Sidebar;