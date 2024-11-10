import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './Auth.css';

function Login({ setUsername }) {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: '',
      general: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        identifier: formData.identifier,
        password: formData.password
      });
      
      if (response.data.success) {
        setUsername(response.data.username);
        localStorage.setItem('username', response.data.username);
        navigate('/');
      }
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData?.field) {
        setErrors({
          [errorData.field]: errorData.error
        });
      } else {
        setErrors({
          general: errorData?.error || t('login.error.general')
        });
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{t('login.title')}</h2>
        {errors.general && <div className="error-message">{errors.general}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="identifier"
              placeholder={t('login.username')}
              value={formData.identifier}
              onChange={handleChange}
              className={errors.identifier ? 'error' : ''}
              required
            />
            {errors.identifier && <div className="field-error">{errors.identifier}</div>}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder={t('login.password')}
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              required
            />
            {errors.password && <div className="field-error">{errors.password}</div>}
          </div>
          <button type="submit" className="auth-button">
            {t('login.submit')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login; 