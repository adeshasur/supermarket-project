import React, { useState } from 'react';
import '../styles/Login.css'; // අලුත් Styles ෆයිල් එකක් හදමු

function Login({ onLogin }) {
  const [userType, setUserType] = useState('admin'); // 'admin' or 'customer'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // TODO: මෙතනට පස්සේ අපි Backend API එක සම්බන්ධ කරමු.
    // දැනට Test කරන්න මෙහෙම දාමු:
    
    if (email && password) {
      // සාර්ථක වුනාම App.js එකට කියනවා කවුද ලොග් වුනේ කියලා
      onLogin(userType); 
    } else {
      setError('Please fill in all fields.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">👋 Welcome to Supermarket</h2>
        <p className="login-subtitle">Please login to continue</p>

        {/* Toggle User Type */}
        <div className="user-type-toggle">
          <button 
            className={`toggle-btn ${userType === 'admin' ? 'active' : ''}`}
            onClick={() => setUserType('admin')}
          >
            Admin
          </button>
          <button 
            className={`toggle-btn ${userType === 'customer' ? 'active' : ''}`}
            onClick={() => setUserType('customer')}
          >
            Customer
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="login-btn">
            Login as {userType === 'admin' ? 'Administrator' : 'Customer'}
          </button>
        </form>

        {userType === 'customer' && (
          <p className="register-link">
            Don't have an account? <span style={{color:'#007aff', cursor:'pointer'}}>Register here</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;