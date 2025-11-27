import React, { useState } from 'react';
import PaymentList from '../components/PaymentList';
import PaymentForm from '../components/PaymentForm';

function Payment() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [inputTerm, setInputTerm] = useState('');
  const [finalSearchTerm, setFinalSearchTerm] = useState('');

  const handlePaymentAdded = () => {
    setRefreshKey(prev => prev + 1);
    // අලුත් Payment එකක් දැම්මම ඒ Order ID එකෙන් Auto Search වෙන්න හදමු
    // (මේක Optional, ඕන නම් අයින් කරන්න පුළුවන්)
  };

  const handleSearchClick = () => {
    setFinalSearchTerm(inputTerm);
  };

  return (
    <div className="inventory-page">
      <h1 className="page-title">Payment Management</h1>

      {/* Search Bar (Search by Order ID) */}
      <div className="inventory-search-group">
        <input
          type="number"
          placeholder="Search by Order ID..."
          className="inventory-search-input"
          value={inputTerm}
          onChange={(e) => setInputTerm(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearchClick}>Search</button>
      </div>

      {/* Split Layout */}
      <div className="inventory-content">
        <div className="inventory-form-section">
          <PaymentForm onPaymentAdded={handlePaymentAdded} />
        </div>

        <div className="inventory-list-section">
          {/* මෙතන searchTerm එක inputTerm එකටම සමාන කලා, 
              එතකොට Type කරනකොටම Real-time ලිස්ට් එක එනවා (List Component එකේ delay එකක් තියෙන නිසා අවුලක් නෑ) */}
          <PaymentList
            refreshKey={refreshKey}
            searchTerm={inputTerm}
          />
        </div>
      </div>
    </div>
  );
}

export default Payment;