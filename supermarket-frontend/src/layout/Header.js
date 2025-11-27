import React from 'react';

function Header() {
  return (
    <div style={{ background: 'white', padding: '15px 30px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h3>👋 Welcome Back, Admin</h3>
      <div style={{ display: 'flex', gap: '15px' }}>
        <span>🔔 3</span>
        <span>👤 Profile</span>
      </div>
    </div>
  );
}

export default Header;