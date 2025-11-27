import React, { useState } from 'react';
import PaymentList from '../components/PaymentList';
import PaymentForm from '../components/PaymentForm';

function Payment() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [inputTerm, setInputTerm] = useState('');
  const [finalSearchTerm, setFinalSearchTerm] = useState('');

  const handlePaymentAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleSearchClick = () => {
    setFinalSearchTerm(inputTerm);
  };

  return (
    <div className="inventory-page">
      <h1 className="inventory-title">Payment Management</h1>
      
      <div className="inventory-search-group">
        <input 
          type="text" 
          placeholder="Search by Order ID..." 
          className="inventory-search-input"
          value={inputTerm}
          onChange={(e) => setInputTerm(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearchClick}>Search</button>
      </div>
      
      <div className="inventory-content">
        <div className="inventory-form-section">
          <PaymentForm onPaymentAdded={handlePaymentAdded} />
        </div>
        
        <div className="inventory-list-section">
          <PaymentList 
            refreshKey={refreshKey} 
            searchTerm={finalSearchTerm} 
          />
        </div>
      </div>
    </div>
  );
}

export default Payment;