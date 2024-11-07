const express = require('express');
const router = express.Router();

// 添加退出登录路由
router.post('/logout', (req, res) => {
  console.log('收到退出请求');
  req.session.destroy((err) => {
    if (err) {
      console.error('销毁session失败:', err);
      return res.status(500).json({ message: '退出登录失败' });
    }
    console.log('session已销毁');
    res.clearCookie('connect.sid');
    res.json({ message: '退出成功' });
  });
});

// 其他路由... 