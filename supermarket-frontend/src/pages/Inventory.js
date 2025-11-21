import React, { useState } from 'react';
import InventoryList from '../components/InventoryList';
import StockUpdateForm from '../components/StockUpdateForm';

// Assuming you have a common CSS file or placed your styles in App.css
// import './Inventory.css'; 

function Inventory() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [inputTerm, setInputTerm] = useState('');
  const [finalSearchTerm, setFinalSearchTerm] = useState('');

  /**
   * Triggers a refresh of the inventory list data.
   * This function is passed to StockUpdateForm and called after a successful update.
   */
  const handleStockUpdate = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };

  /**
   * Updates the final search term when the Search button is clicked.
   */
  const handleSearchClick = () => {
    setFinalSearchTerm(inputTerm);
  };

  return (
    <div className="inventory-page">
      <h1 className="inventory-title">Inventory Management</h1>
      
      {/* Search Bar and Button Group */}
      <div className="inventory-search-group">
        <input 
          type="text" 
          placeholder="Search by Product ID..." 
          className="inventory-search-input"
          value={inputTerm}
          onChange={(e) => setInputTerm(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearchClick}>Search</button>
      </div>
      
      <div className="inventory-content">
        {/* Left Column: Stock Update Form (Insert/Update) */}
        <div className="inventory-form-section">
          <StockUpdateForm onStockUpdated={handleStockUpdate} />
        </div>
        
        {/* Right Column: Inventory List */}
        <div className="inventory-list-section">
          <InventoryList 
            refreshKey={refreshKey} 
            searchTerm={finalSearchTerm} 
          />
        </div>
      </div>
    </div>
  );
}

export default Inventory;