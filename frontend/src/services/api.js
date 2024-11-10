const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const api = {
  // ... 你的 API 请求方法
  async login(credentials) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    
    if (response.ok) {
      // 确保正确存储 token 和 username
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      return { success: true, data };
    } else {
      throw new Error(data.message || '登录失败');
    }
  },
  async logout() {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    
    if (response.ok) {
      // 清除本地存储的 token 和 username
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      return { success: true, data };
    } else {
      throw new Error(data.message || '登出失败');
    }
  },
  // ... 其他 API 方法
}; 