import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

function Login({ setUsername }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        email,
        password
      });
      const { username } = response.data;
      setUsername(username);
      localStorage.setItem('username', username);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.error || '登录失败');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>登录</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="邮箱"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">登录</button>
        </form>
      </div>
    </div>
  );
}

export default Login; 