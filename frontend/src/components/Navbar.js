import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ username, onLogout }) {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">Web3GameCamp</Link>
      <div className="nav-links">
        {username ? (
          <>
            <span className="welcome-text">欢迎, {username}</span>
            <button onClick={onLogout} className="nav-button">退出</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">登录</Link>
            <Link to="/register" className="nav-link">注册</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar; 