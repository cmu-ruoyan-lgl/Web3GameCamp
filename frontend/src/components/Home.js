import React from 'react';
import './Home.css';

function Home({ username }) {
  return (
    <div className="home-container">
      <h1>欢迎来到学习平台</h1>
      <div className="welcome-card">
        <h2>你好, {username}!</h2>
        <p>开始你的学习之旅吧</p>
      </div>
    </div>
  );
}

export default Home; 