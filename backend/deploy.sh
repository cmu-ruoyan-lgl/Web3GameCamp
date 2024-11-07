#!/bin/bash

# 更新系统
sudo apt update
sudo apt upgrade -y

# 安装 Node.js 和 npm
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 PM2
sudo npm install -g pm2

# 安装项目依赖
cd /path/to/your/backend
npm install

# 创建环境变量文件
cat > .env << EOF
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secure_jwt_secret
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
EOF

# 使用 PM2 启动服务
pm2 start server.js --name "web3gamecamp-api"
pm2 startup
pm2 save 