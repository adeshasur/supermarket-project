import React from 'react';

function Header() {
  return (
    <header className="app-header">
      <div className="header-left">
        <h3>👋 Welcome Back, Admin</h3>
      </div>

      <div className="header-right">
        {/* Notifications */}
        <div className="icon-wrapper">
          <span className="icon">🔔</span>
          <span className="badge">3</span>
        </div>
        
        {/* Cart */}
        <div className="icon-wrapper">
          <span className="icon">🛒</span>
          <span className="badge">5</span>
        </div>

        {/* Profile */}
        <div className="profile-section">
          <div className="profile-pic">👤</div>
          <span className="profile-name">Manager</span>
        </div>
      </div>
    </header>
  );
}

export default Header;