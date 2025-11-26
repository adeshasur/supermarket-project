import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './styles/FormStyles.css';
import './styles/TableStyles.css';

// Layouts
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import Footer from './layout/Footer';

// Pages
import Login from './pages/Login'; // 🔴 New Import
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Payment from './pages/Payment';

function App() {
  // User Role State ('guest', 'admin', 'customer')
  const [userRole, setUserRole] = useState('guest'); 

  // Login Function
  const handleLogin = (role) => {
    setUserRole(role);
  };

  // Logout Function
  const handleLogout = () => {
    setUserRole('guest');
  };

  // --- 1. GUEST VIEW (Login Page) ---
  if (userRole === 'guest') {
    return <Login onLogin={handleLogin} />;
  }

  // --- 2. ADMIN VIEW (Full Dashboard) ---
  if (userRole === 'admin') {
    return (
      <BrowserRouter>
        <div className="app-container">
          <Sidebar />
          <main className="page-content">
            <Header />
            <div className="content-wrapper">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/products" element={<Products />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
            <Footer />
          </main>
        </div>
      </BrowserRouter>
    );
  }

  // --- 3. CUSTOMER VIEW (Simple Layout) ---
  if (userRole === 'customer') {
    return (
      <BrowserRouter>
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <h1>🛒 Supermarket Store</h1>
            <button onClick={handleLogout} className="search-btn" style={{backgroundColor: '#dc3545'}}>Logout</button>
          </header>
          
          {/* Customer ට පෙනෙන්නේ Products විතරයි දැනට */}
          <Products />
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;