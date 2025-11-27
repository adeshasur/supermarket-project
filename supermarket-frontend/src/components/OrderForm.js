import React, { useState } from 'react';
import '../styles/FormStyles.css'; 

function OrderForm({ onOrderUpdate }) {
  const [customerId, setCustomerId] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend Call එක Comment කළා
    alert("Order Created (Mock Mode)! ✅");
    setCustomerId('');
    onOrderUpdate();
  };

  return (
    <div className="form-container">
      <h3>Create New Order</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Customer ID:</label>
          <input type="number" value={customerId} onChange={(e) => setCustomerId(e.target.value)} required placeholder="e.g. 101" />
        </div>
        <button type="submit" className="submit-btn">Create Order</button>
      </form>
    </div>
  );
}
export default OrderForm;