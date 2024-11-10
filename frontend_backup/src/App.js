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
    try {
      // 清除 localStorage
      localStorage.clear(); // 清除所有 localStorage 数据
      // 或者只清除特定项
      // localStorage.removeItem('token');
      // localStorage.removeItem('username');

      // 清除 sessionStorage
      sessionStorage.clear();

      // 更新用户名状态
      setUsername(null);

      // 使用 useNavigate 进行导航会更好，但现在先用这个
      window.location.href = '/';
    } catch (error) {
      console.error('退出登录时发生错误:', error);
      // 即使发生错误，也要确保用户被登出
      setUsername(null);
      window.location.href = '/';
    }
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