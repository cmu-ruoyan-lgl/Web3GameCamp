#!/bin/bash

# 安装前端依赖并构建
cd frontend
echo "Installing frontend dependencies..."
npm install
echo "Building frontend..."
npm run build

# 安装后端依赖
cd ../backend
echo "Installing backend dependencies..."
npm install

# 创建必要的目录
echo "Creating necessary directories..."
mkdir -p /www/wwwroot/www.web3gamecamp.xyz
mkdir -p /www/wwwroot/api.web3gamecamp.xyz

# 复制前端构建文件到网站目录
echo "Copying frontend build files..."
cp -r ../frontend/build/* /www/wwwroot/www.web3gamecamp.xyz/

# 复制后端文件到API目录
echo "Copying backend files..."
cp -r ./* /www/wwwroot/api.web3gamecamp.xyz/

# 设置权限
echo "Setting permissions..."
chown -R www:www /www/wwwroot/www.web3gamecamp.xyz/
chown -R www:www /www/wwwroot/api.web3gamecamp.xyz/

# 使用PM2启动后端服务
echo "Starting backend service with PM2..."
cd /www/wwwroot/api.web3gamecamp.xyz
pm2 delete web3gamecamp-api 2>/dev/null || true
pm2 start server.js --name "web3gamecamp-api" --env production
pm2 save

echo "Deployment completed!"
