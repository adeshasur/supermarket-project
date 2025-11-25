import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Sidebar from './layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Inventory from './pages/Inventory';
import Customers from './pages/Customers';
import Payment from './pages/Payment';
import Orders from './pages/Orders';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {

        }
        <Sidebar />

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/Payment" element={<Payment />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
