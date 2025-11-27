import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts & Pages
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import Users from './pages/Users';
import Payment from './pages/Payment';
import Login from './pages/Login'; // 1. Login Page එක Import කලා

import './styles/App.css';

function App() {
  // 2. User කෙනෙක් ඉන්නවද බලන්න State එකක් (null = no user)
  const [userRole, setUserRole] = useState(null);

  return (
    <Router>
      {/* 3. User කෙනෙක් නැත්නම් Login Page එක විතරක් පෙන්නන්න */}
      {!userRole ? (
        <Login onLogin={(role) => setUserRole(role)} />
      ) : (
        /* 4. User කෙනෙක් ඉන්නවා නම් Main App එක පෙන්නන්න */
        <div className="app-container">
          <Sidebar />
          <main className="page-content">
            <Header />
            <div className="content-wrapper">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/users" element={<Users />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
            <Footer />
          </main>
        </div>
      )}
    </Router>
  );
}

export default App;