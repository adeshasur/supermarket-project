import React, { useState } from 'react';
import axios from 'axios';
import './StockUpdateForm.css'; // Reusing form styles

function ProductForm({ onProductAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // Added Image URL field support
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null); 
  const [isError, setIsError] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setIsError(false);

    const payload = {
      name: name,
      description: description,
      price: parseFloat(price),
      imageUrl: imageUrl // Sending image URL if available
    };

    try {
      // 🔴 FIX: Updated URL to match Backend Controller ("/api/products")
      await axios.post('http://localhost:8081/api/products', payload);
      
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
      setMessage('Product Added Successfully!'); 
      
      onProductAdded(); 
      
      setTimeout(() => setMessage(null), 3000); 

    } catch (err) {
      setIsError(true);
      if (err.code === 'ERR_NETWORK') {
        setMessage('Error: Could not connect to Product Service (Port 8081).');
      } else {
        setMessage('Failed to add product. Ensure all fields are valid.');
      }
      console.error("Product Error:", err);
    }
    setSubmitting(false);
  };

  return (
    <div className="form-container">
      <h3>Add New Product</h3>
      <p>Enter product details below.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Milk Packet"
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., 1L Full Cream"
            required
          />
        </div>
        <div className="form-group">
          <label>Price (LKR):</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g., 450.00"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL (Optional):</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="e.g., https://example.com/image.jpg"
          />
        </div>
        
        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save Product'}
        </button>
      </form>
      
      {message && <div className={`popup-toast ${isError ? 'error-toast' : 'success-toast'}`}>{message}</div>}
    </div>
  );
}

export default ProductForm;