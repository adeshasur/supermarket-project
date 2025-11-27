import React, { useState } from 'react';
import axios from 'axios';
import '../styles/FormStyles.css'; // Styles හරියටම ගන්න මේක ඕනේ

function ProductForm({ onProductAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
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
      imageUrl: imageUrl
    };

    try {
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
        setMessage('Error: Product Service (8081) is offline.');
      } else {
        setMessage('Failed to add product.');
      }
      console.error(err);
    }
    setSubmitting(false);
  };

  return (
    <div className="form-container">
      <h3>Add Product</h3>
      <p>Enter new item details.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Milk Packet"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. 400g Box"
            required
          />
        </div>

        <div className="form-group">
          <label>Price (LKR)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            step="0.01"
            required
          />
        </div>

        {/* Image URL (Optional) */}
        {/* <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="http://..."
          />
        </div> */}

        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save'}
        </button>
      </form>

      {message && <div className={`popup-toast ${isError ? 'error-toast' : 'success-toast'}`}>{message}</div>}
    </div>
  );
}

export default ProductForm;