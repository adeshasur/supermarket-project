import React, { useState } from 'react';
import axios from 'axios';
import './StockUpdateForm.css'; // අපේ පරණ Form Styles ම පාවිච්චි කරමු

function OrderForm({ onOrderUpdate }) {
  const [customerId, setCustomerId] = useState('');
  
  // Item Adding State
  const [orderId, setOrderId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  
  const [message, setMessage] = useState(null);

  // 1. Create New Order
  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8084/api/orders', { customerId: Number(customerId) });
      setMessage('Order Created Successfully! ✅');
      setCustomerId('');
      onOrderUpdate();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setMessage('Failed to create order. ❌');
    }
  };

  // 2. Add Item to Order
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8084/api/orders/${orderId}/items`, {
        productId: Number(productId),
        quantity: Number(quantity),
        price: Number(price)
      });
      setMessage('Item Added Successfully! ✅');
      setProductId(''); setQuantity(''); setPrice('');
      onOrderUpdate();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setMessage('Failed to add item. Check Order ID. ❌');
    }
  };

  return (
    <div>
      {/* --- Form 1: Create Order --- */}
      <div className="form-container" style={{ marginBottom: '20px' }}>
        <h3>Create New Order</h3>
        <form onSubmit={handleCreateOrder}>
          <div className="form-group">
            <label>Customer ID:</label>
            <input type="number" value={customerId} onChange={(e) => setCustomerId(e.target.value)} required placeholder="e.g. 101" />
          </div>
          <button type="submit" className="submit-btn">Create Order</button>
        </form>
      </div>

      {/* --- Form 2: Add Items --- */}
      <div className="form-container">
        <h3>Add Item to Order</h3>
        <form onSubmit={handleAddItem}>
          <div className="form-group">
            <label>Order ID:</label>
            <input type="number" value={orderId} onChange={(e) => setOrderId(e.target.value)} required placeholder="Order ID" />
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
        {message && <div className="popup-toast success-toast" style={{top: '10%'}}>{message}</div>}
      </div>
    </div>
  );
}

export default OrderForm;