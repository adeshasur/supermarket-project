import React from 'react';

function Header() {
  return (
    <header className="app-header">
      <div className="header-left">
        {/* වම් පැත්තේ පොඩි Welcome මැසේජ් එකක් */}
        <h3>👋 Welcome Back, Admin</h3>
      </div>

      <div className="header-right">
        {/* දකුණු පැත්තේ Icons ටික */}
        <div className="icon-wrapper">
          <span className="icon">🔔</span>
          <span className="badge">3</span> {/* Notification Count */}
        </div>
        
        <div className="icon-wrapper">
          <span className="icon">🛒</span>
          <span className="badge">5</span> {/* Cart Count */}
        </div>

        <div className="profile-section">
          <div className="profile-pic">👤</div>
          <span className="profile-name">Manager</span>
        </div>
      </div>
    </header>
  );
}

export default Header;