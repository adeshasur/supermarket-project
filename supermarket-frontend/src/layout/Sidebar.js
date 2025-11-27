import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">SUPERMARKET</div>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")} end>
            📊 Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>
            📦 Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/inventory" className={({ isActive }) => (isActive ? "active" : "")}>
            📋 Inventory
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders" className={({ isActive }) => (isActive ? "active" : "")}>
            🛒 Orders
          </NavLink>
        </li>
        <li>
          {/* Renamed Customers to Users */}
          <NavLink to="/users" className={({ isActive }) => (isActive ? "active" : "")}>
            👥 Users
          </NavLink>
        </li>
        <li>
          {/* Added Payment */}
          <NavLink to="/payment" className={({ isActive }) => (isActive ? "active" : "")}>
            💳 Payment
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;