import React, { useState } from 'react';
import axios from 'axios';
// Using global styles from App.css

function OrderForm({ onOrderUpdate, orders }) {
  const [customerId, setCustomerId] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  // 1. Create New Order
  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8084/api/orders', { customerId: Number(customerId) });
      setMessage('Order Created Successfully! ✅');
      setIsError(false);
      setCustomerId('');
      onOrderUpdate(); 
    } catch (err) {
      console.error(err);
      setMessage('Failed to create order. ❌');
      setIsError(true);
    }
    setTimeout(() => setMessage(null), 3000);
  };

  // 2. Add Item to Order
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!selectedOrderId) {
        setMessage('Please select an Order ID first! ⚠️');
        setIsError(true);
        return;
    }

    try {
      await axios.post(`http://localhost:8084/api/orders/${selectedOrderId}/items`, {
        productId: Number(productId),
        quantity: Number(quantity),
        price: Number(price)
      });
      setMessage('Item Added Successfully! ✅');
      setIsError(false);
      setProductId(''); setQuantity(''); setPrice('');
      onOrderUpdate(); 
    } catch (err) {
      console.error(err);
      setMessage('Failed to add item. ❌');
      setIsError(true);
    }
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="inventory-form-section">
      {/* Create Order */}
      <div className="form-container" style={{ marginBottom: '20px' }}>
        <h3>Create Order</h3>
        <form onSubmit={handleCreateOrder}>
          <div className="form-group">
            <label>Customer ID:</label>
            <input type="number" value={customerId} onChange={(e) => setCustomerId(e.target.value)} required placeholder="e.g. 101" />
          </div>
          <button type="submit" className="submit-btn">Create Order</button>
        </form>
      </div>

      {/* Add Items */}
      <div className="form-container">
        <h3>Add Items</h3>
        <form onSubmit={handleAddItem}>
          <div className="form-group">
            <label>Order ID:</label>
            <select 
                className="inventory-search-input"
                style={{width: '100%', padding: '10px', background: 'white'}}
                value={selectedOrderId}
                onChange={(e) => setSelectedOrderId(e.target.value)}
                required
            >
                <option value="">Select Order</option>
                {orders && orders.map(order => (
                    <option key={order.id} value={order.id}>Order #{order.id}</option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label>Product ID:</label>
            <input type="number" value={productId} onChange={(e) => setProductId(e.target.value)} required placeholder="Product ID" />
          </div>
          <div className="form-group">
            <label>Quantity:</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required placeholder="Qty" />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required placeholder="Price" />
          </div>
          <button type="submit" className="submit-btn">Add Item</button>
        </form>

        {/* Toast Message */}
        {message && (
            <div className={`popup-toast ${isError ? 'error-toast' : 'success-toast'}`}>
                {message}
            </div>
        )}
      </div>
    </div>
  );
}

// 🔴 IMPORTANT: Ensure this default export exists!
export default OrderForm;