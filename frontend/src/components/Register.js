import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './Auth.css';

function Register({ setUsername }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    // 清除对应字段的错误
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('register.error.passwordMismatch');
    }
    
    if (formData.password.length < 6) {
      newErrors.password = t('register.error.passwordTooShort');
    }

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.username)) {
      newErrors.username = t('register.error.invalidUsername');
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 表单验证
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      if (response.data.success) {
        setUsername(formData.username);
        localStorage.setItem('username', formData.username);
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
          general: errorData?.error || t('register.error.general')
        });
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{t('register.title')}</h2>
        {errors.general && <div className="error-message">{errors.general}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder={t('register.username')}
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'error' : ''}
              required
            />
            {errors.username && <div className="field-error">{errors.username}</div>}
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder={t('register.email')}
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              required
            />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder={t('register.password')}
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              required
            />
            {errors.password && <div className="field-error">{errors.password}</div>}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder={t('register.confirmPassword')}
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
              required
            />
            {errors.confirmPassword && <div className="field-error">{errors.confirmPassword}</div>}
          </div>
          <button type="submit" className="auth-button">
            {t('register.submit')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register; 