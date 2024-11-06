import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import './App.css';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  return (
    <Router>
      <div className="App">
        <Navbar username={username} setUsername={setUsername} />
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