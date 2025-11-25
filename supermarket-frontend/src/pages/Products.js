import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

function Products() {
  const [refreshKey, setRefreshKey] = useState(0); 
  const [inputTerm, setInputTerm] = useState('');
  const [finalSearchTerm, setFinalSearchTerm] = useState('');

  const handleProductAdded = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  const handleSearchClick = () => {
    setFinalSearchTerm(inputTerm);
  };

  return (
    <div className="inventory-page">
      <h1 className="inventory-title">Product Management</h1>
      
      {/* --- Search Bar Section --- */}
      <div className="inventory-search-group">
        <input 
          type="text" 
          placeholder="Search by Product Name..." 
          className="inventory-search-input"
          value={inputTerm}
          onChange={(e) => setInputTerm(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearchClick}>Search</button>
      </div>
      
      {/* --- Content Section --- */}
      <div className="inventory-content">
        <div className="inventory-form-section">
          <ProductForm onProductAdded={handleProductAdded} />
        </div>
        
        <div className="inventory-list-section">
          <ProductList 
            refreshKey={refreshKey} 
            searchTerm={finalSearchTerm} 
          />
        </div>
      </div>
    </div>
  );
}

export default Products;