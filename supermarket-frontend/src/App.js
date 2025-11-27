import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import Footer from './layout/Footer';

// Pages
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders'; // 1. Import කළා
import Users from './pages/Users';
import Payment from './pages/Payment';

import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="page-content">
          <Header />
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/orders" element={<Orders />} /> {/* 2. Route එක දැම්මා */}
              <Route path="/users" element={<Users />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>
          </div>
          <Footer />
        </main>
      </div>
    </Router>
  );
}

export default App;