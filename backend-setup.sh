#!/bin/bash

# 创建后端项目目录
echo "Creating backend project..."
mkdir -p backend
cd backend

# 初始化 package.json
echo "Initializing package.json..."
npm init -y

# 安装必要的依赖
echo "Installing dependencies..."
npm install express mongoose cors dotenv bcrypt

# 安装开发依赖
echo "Installing dev dependencies..."
npm install --save-dev nodemon

# 创建环境配置文件
echo "Creating environment file..."
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/web3gamecamp
PORT=3001
NODE_ENV=development
EOF

# 创建必要的目录结构
echo "Creating project structure..."
mkdir -p models
mkdir -p routes
mkdir -p controllers
mkdir -p middleware

# 更新 package.json 的 scripts
node -e "
const fs = require('fs');
const package = require('./package.json');
package.scripts = {
  ...package.scripts,
  'start': 'node server.js',
  'dev': 'nodemon server.js'
};
fs.writeFileSync('package.json', JSON.stringify(package, null, 2));
"

echo "Backend setup completed!" 