import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';

// Icons
const DashboardIcon = () => <>📊</>;
const ProductIcon = () => <>📦</>;
const InventoryIcon = () => <>📋</>;
const OrderIcon = () => <>🛒</>;
const CustomerIcon = () => <>👥</>;
const PromotionIcon = () => <>🏷️</>;

function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <span className="logo-dot"></span>
        Supermarket
      </div>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/" end>
            <DashboardIcon /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/products">
            <ProductIcon /> Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/inventory">
            <InventoryIcon /> Inventory
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders">
            <OrderIcon /> Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/customers">
            <CustomerIcon /> Customers
          </NavLink>
        </li>
        <li>
          <NavLink to="/Payment">
            <PromotionIcon /> Payment
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;