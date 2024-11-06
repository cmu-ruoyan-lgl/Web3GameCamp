const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// 中间件
app.use(cors());
app.use(express.json());

// 连接数据库
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // 超时时间
  socketTimeoutMS: 45000, // Socket 超时时间
})
.then(() => console.log('MongoDB 连接成功'))
.catch((err) => console.error('MongoDB 连接失败:', err));

// 添加连接错误处理
mongoose.connection.on('error', err => {
  console.error('MongoDB 连接错误:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB 连接断开');
});

// 用户模型
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// 路由
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // 检查用户名是否已存在
    const existingUser = await User.findOne({ 
      $or: [
        { username: username },
        { email: email }
      ]
    });

    if (existingUser) {
      return res.status(400).json({ 
        error: existingUser.username === username ? '用户名已存在' : '邮箱已被注册'
      });
    }

    const user = new User({ username, email, password });
    await user.save();
    
    // 注册成功后返回用户名
    res.status(201).json({ 
      message: '注册成功',
      username: user.username 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: '用户不存在' });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: '密码错误' });
    }
    // 返回用户名
    res.json({ 
      message: '登录成功',
      username: user.username 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`端口 ${PORT} 已被占用，请尝试其他端口`);
    process.exit(1);
  } else {
    console.error('服务器启动错误:', err);
  }
});

// 优雅关闭服务器
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('服务器正常关闭');
    mongoose.connection.close();
    process.exit(0);
  });
}); 