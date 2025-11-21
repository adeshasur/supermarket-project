import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InventoryList.css';

function InventoryList({ refreshKey }) { // refreshKey එක prop එකක් විදියට ගන්නවා
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true); 
        setError(null);
        
        // --- REAL API CALL ---
        const response = await axios.get('http://localhost:8082/inventory/all');
        // --- END REAL API CALL ---

        setInventory(response.data);
      } catch (err) {
        setError('Could not fetch inventory. Is the backend running?');
        console.error(err);
      }
      setLoading(false);
    };

    fetchInventory();
  }, [refreshKey]); // refreshKey එක වෙනස් වෙන හැම වෙලේම ආයෙ data ගේනවා

  const getStockClass = (quantity) => {
    if (quantity < 10) return 'low-stock';
    if (quantity < 50) return 'medium-stock';
    return 'in-stock';
  };

  if (loading) {
    return (
      <div className="list-container" style={{ textAlign: 'center', padding: '50px' }}>
        <h3>Loading Inventory...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="list-container low-stock" style={{ borderColor: '#dc3545' }}>
        <h3 style={{ color: '#dc3545' }}>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="list-container">
      <h3>Inventory Status Dashboard</h3>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Current Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {inventory.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>
                No inventory data found in the database.
              </td>
            </tr>
          ) : (
            inventory.map((item) => (
              <tr key={item.id} className={getStockClass(item.quantity)}>
                <td data-label="Product ID">{item.productId}</td>
                <td data-label="Quantity" className="quantity-cell">
                  {item.quantity}
                </td>
                <td data-label="Status" className="status-cell">
                  <span className="status-dot"></span>
                  {item.quantity < 10 ? 'Low Stock' : item.quantity < 50 ? 'Medium Stock' : 'In Stock'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryList;