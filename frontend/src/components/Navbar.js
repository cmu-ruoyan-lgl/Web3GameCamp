import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ username, setUsername }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUsername('');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Learning Platform</div>
      <div className="navbar-menu">
        {username ? (
          <>
            <span className="welcome-text">欢迎, {username}!</span>
            <button className="logout-btn" onClick={handleLogout}>登出</button>
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