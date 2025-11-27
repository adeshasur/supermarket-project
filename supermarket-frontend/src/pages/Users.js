import React, { useState } from 'react';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';

function Users() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [inputTerm, setInputTerm] = useState('');
  const [finalSearchTerm, setFinalSearchTerm] = useState('');

  const handleUserAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleSearchClick = () => {
    setFinalSearchTerm(inputTerm);
  };

  return (
    <div className="inventory-page">
      <h1 className="page-title">User Management</h1>

      {/* Search Bar */}
      <div className="inventory-search-group">
        <input
          type="text"
          placeholder="Search by Name or Email..."
          className="inventory-search-input"
          value={inputTerm}
          onChange={(e) => setInputTerm(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearchClick}>Search</button>
      </div>

      {/* Split Layout: Form Left, List Right */}
      <div className="inventory-content">
        <div className="inventory-form-section">
          <UserForm onUserAdded={handleUserAdded} />
        </div>

        <div className="inventory-list-section">
          <UserList
            refreshKey={refreshKey}
            searchTerm={finalSearchTerm}
          />
        </div>
      </div>
    </div>
  );
}

export default Users;