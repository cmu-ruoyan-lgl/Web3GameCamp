import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import './App.css';
import { api } from './services/api';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  const onLogout = () => {
    // 清除 localStorage 中的令牌
    localStorage.removeItem('token');

    // 清除所有 cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });

    // 清除 session storage
    sessionStorage.clear();

    // 更新用户名状态
    setUsername(null);

    // 返回主界面
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="App">
        <Navbar username={username} onLogout={onLogout} />
        <Routes>
          <Route path="/" element={username ? <Home username={username} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setUsername={setUsername} />} />
          <Route path="/register" element={<Register setUsername={setUsername} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 