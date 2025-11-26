import React, { useState } from 'react';
import OrderList from '../components/OrderList';
import OrderForm from '../components/OrderForm';

function Orders() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [inputTerm, setInputTerm] = useState('');
  const [finalSearchTerm, setFinalSearchTerm] = useState('');
  const [ordersList, setOrdersList] = useState([]); // To share order IDs with the form

  const handleOrderUpdate = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleSearchClick = () => {
    setFinalSearchTerm(inputTerm);
  };

  return (
    <div className="inventory-page">
      <h1 className="inventory-title">Order Management</h1>

      <div className="inventory-search-group">
        <input 
          type="text" 
          placeholder="Search by Customer ID..." 
          className="inventory-search-input"
          value={inputTerm}
          onChange={(e) => setInputTerm(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearchClick}>Search</button>
      </div>

      <div className="inventory-content">
        {/* Form Section */}
        <div className="inventory-form-section">
          <OrderForm 
            onOrderUpdate={handleOrderUpdate} 
            orders={ordersList} 
          />
        </div>

        {/* List Section */}
        <div className="inventory-list-section">
          <OrderList 
            refreshKey={refreshKey} 
            searchTerm={finalSearchTerm} 
            setOrdersForForm={setOrdersList}
          />
        </div>
      </div>
    </div>
  );
}

export default Orders;