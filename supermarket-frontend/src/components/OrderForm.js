import React, { useState } from 'react';
import axios from 'axios';
import '../styles/FormStyles.css';

function OrderForm({ onOrderUpdate }) {
  const [customerId, setCustomerId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    // Backend එකේ Order Model එකට අනුව Payload එක හදමු
    const payload = {
      customerId: parseInt(customerId) // Backend එක Long ඉල්ලන නිසා Number කලා
    };

    try {
      // Backend URL (Port 8084)
      await axios.post('http://localhost:8084/api/orders', payload);

      setMessage('Order Created Successfully! ✅');
      setCustomerId('');

      // List එක Refresh කරන්න Signal එකක් යවමු
      if (onOrderUpdate) onOrderUpdate();

      setTimeout(() => setMessage(null), 3000);

    } catch (err) {
      console.error(err);
      setMessage('Error: Could not create order. Check Backend (8084).');
    }
    setSubmitting(false);
  };

  return (
    <div className="form-container">
      <h3>Create New Order</h3>
      <p>Enter Customer ID to start a new order.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Customer ID:</label>
          <input
            type="number"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
            placeholder="e.g. 1"
          />
        </div>
        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? 'Creating...' : 'Create Order'}
        </button>
      </form>
      {message && <div className="popup-toast success-toast" style={{ background: message.includes('Error') ? '#dc3545' : '#28a745' }}>{message}</div>}
    </div>
  );
}

export default OrderForm;