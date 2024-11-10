import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home({ username }) {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>欢迎来到 Web3GameCamp</h1>
        <p className="subtitle">探索区块链游戏开发的无限可能</p>
      </section>

      <section className="features-grid">
        <div className="feature-card">
          <h3>区块链基础</h3>
          <p>学习智能合约、Web3.js 和区块链基础知识</p>
          <Link to="/courses/blockchain" className="learn-more">开始学习 →</Link>
        </div>
        <div className="feature-card">
          <h3>游戏开发</h3>
          <p>掌握 Unity3D 和 Unreal Engine 的区块链集成</p>
          <Link to="/courses/game-dev" className="learn-more">开始学习 →</Link>
        </div>
        <div className="feature-card">
          <h3>NFT 游戏资产</h3>
          <p>学习创建和管理游戏内 NFT 资产</p>
          <Link to="/courses/nft" className="learn-more">开始学习 →</Link>
        </div>
        <div className="feature-card">
          <h3>GameFi 经济系统</h3>
          <p>设计和实现游戏代币经济模型</p>
          <Link to="/courses/gamefi" className="learn-more">开始学习 →</Link>
        </div>
      </section>

      <section className="learning-path">
        <h2>学习路线</h2>
        <div className="path-steps">
          <div className="path-step">
            <span className="step-number">1</span>
            <h4>Web3 基础</h4>
            <p>了解区块链技术和智能合约基础</p>
          </div>
          <div className="path-step">
            <span className="step-number">2</span>
            <h4>游戏开发基础</h4>
            <p>学习游戏引擎和开发工具</p>
          </div>
          <div className="path-step">
            <span className="step-number">3</span>
            <h4>区块链集成</h4>
            <p>将 Web3 功能集成到游戏中</p>
          </div>
          <div className="path-step">
            <span className="step-number">4</span>
            <h4>项目实战</h4>
            <p>构建自己的 Web3 游戏</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home; 