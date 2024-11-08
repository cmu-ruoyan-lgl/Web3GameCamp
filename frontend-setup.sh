#!/bin/bash

# 创建前端项目目录
echo "Creating frontend project..."
mkdir -p frontend
cd frontend

# 初始化React项目
echo "Initializing React project..."
npx create-react-app .

# 安装额外的依赖
echo "Installing additional dependencies..."
npm install axios react-router-dom

# 创建环境配置文件
echo "Creating environment files..."
echo "REACT_APP_API_URL=http://localhost:3001" > .env.development
echo "REACT_APP_API_URL=https://api.web3gamecamp.xyz" > .env.production

# 创建必要的目录结构
echo "Creating project structure..."
mkdir -p src/components
mkdir -p src/services

echo "Frontend setup completed!" 