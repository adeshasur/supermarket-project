import React, { useState } from 'react';
import OrderList from '../components/OrderList';
import OrderForm from '../components/OrderForm';
import OrderItemForm from '../components/OrderItemForm'; // 1. Import New Form

function Orders() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [inputTerm, setInputTerm] = useState('');
  const [finalSearchTerm, setFinalSearchTerm] = useState('');
  const [ordersList, setOrdersList] = useState([]); // Stores loaded orders for the dropdown

  const handleOrderUpdate = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleSearchClick = () => {
    setFinalSearchTerm(inputTerm);
  };

  return (
    <div className="inventory-page">
      <h1 className="page-title">Order Management</h1>

      <div className="inventory-search-group">
        <input
          type="number"
          placeholder="Search by Customer ID..."
          className="inventory-search-input"
          value={inputTerm}
          onChange={(e) => setInputTerm(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearchClick}>Search</button>
      </div>

      <div className="inventory-content">
        {/* --- LEFT COLUMN: Forms --- */}
        <div className="inventory-form-section">

          {/* 1. Create Order Form */}
          <OrderForm onOrderUpdate={handleOrderUpdate} />

          {/* Spacer */}
          <div style={{ height: '30px' }}></div>

          {/* 2. Add Item Form (New) */}
          {/* We pass 'ordersList' so the dropdown knows available orders */}
          <OrderItemForm orders={ordersList} onItemAdded={handleOrderUpdate} />

        </div>

        {/* --- RIGHT COLUMN: List --- */}
        <div className="inventory-list-section">
          <OrderList
            refreshKey={refreshKey}
            searchTerm={finalSearchTerm}
            setOrdersForForm={setOrdersList} // This sends data back up to fill the dropdown
          />
        </div>
      </div>
    </div>
  );
}

export default Orders;