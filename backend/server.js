const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const app = express();
dotenv.config();

// CORS配置
app.use(cors({
  origin: ['https://www.web3gamecamp.xyz', 'http://localhost:3000'],
  credentials: true
}));

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
    
    // 检查用户名和邮箱是否存在
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ 
        error: '用户名已被使用',
        field: 'username'
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ 
        error: '邮箱已被注册',
        field: 'email'
      });
    }

    // 生成盐值并对密码进行加密
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 创建新用户，使用加密后的密码
    const user = new User({ 
      username, 
      email, 
      password: hashedPassword  // 存储加密后的密码
    });
    
    await user.save();
    
    res.status(201).json({ 
      success: true,
      message: '注册成功',
      username: user.username 
    });
  } catch (error) {
    console.error('注册错误:', error);
    res.status(400).json({ 
      success: false,
      error: error.message 
    });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;
    
    // 查找用户（通过用户名或邮箱）
    const user = await User.findOne({
      $or: [
        { username: identifier },
        { email: identifier }
      ]
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        field: 'identifier',
        error: '用户不存在'
      });
    }

    // 使用 bcrypt.compare 比较密码
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        field: 'password',
        error: '密码错误'
      });
    }

    res.json({
      success: true,
      username: user.username
    });
  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误'
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

// 优雅关闭服务器
process.on('SIGTERM', () => {
  app.close(() => {
    console.log('服务器正常关闭');
    mongoose.connection.close();
    process.exit(0);
  });
}); 