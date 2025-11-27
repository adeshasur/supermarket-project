import React, { useState } from 'react';
import CustomerList from '../components/CustomerList';
import CustomerForm from '../components/CustomerForm';

function Customers() {
  const [refreshKey, setRefreshKey] = useState(0); 
  const [inputTerm, setInputTerm] = useState('');
  const [finalSearchTerm, setFinalSearchTerm] = useState('');

  const handleCustomerAdded = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  const handleSearchClick = () => {
    setFinalSearchTerm(inputTerm);
  };

  return (
    <div className="inventory-page">
      <h1 className="inventory-title">Customer Management</h1>
      
      {/* Search Section */}
      <div className="inventory-search-group">
        <input 
          type="text" 
          placeholder="Search by Name or Email..." 
          className="inventory-search-input"
          value={inputTerm}
          onChange={(e) => setInputTerm(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearchClick}>Search</button>
      </div>
      
      {/* Content Section */}
      <div className="inventory-content">
        <div className="inventory-form-section">
          <CustomerForm onCustomerAdded={handleCustomerAdded} />
        </div>
        
        <div className="inventory-list-section">
          <CustomerList 
            refreshKey={refreshKey} 
            searchTerm={finalSearchTerm} 
          />
        </div>
      </div>
    </div>
  );
}

export default Customers;