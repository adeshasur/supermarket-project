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
          <NavLink to="/customers" className={({ isActive }) => (isActive ? "active" : "")}>
            👥 Customers
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;