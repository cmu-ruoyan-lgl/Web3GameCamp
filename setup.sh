#!/bin/bash

# 设置项目路径
PROJECT_PATH=/www/wwwroot/web3gamecamp

# 创建项目目录
echo "Creating project directories..."
mkdir -p $PROJECT_PATH
cd $PROJECT_PATH

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

# 配置后端环境变量
echo "Configuring backend environment..."
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/web3gamecamp
PORT=3001
NODE_ENV=production
EOF

# 使用PM2启动后端服务
echo "Starting backend service with PM2..."
pm2 delete web3gamecamp-api 2>/dev/null || true
pm2 start server.js --name "web3gamecamp-api"
pm2 save

# 配置Nginx反向代理
echo "Configuring Nginx..."
cat > /www/server/nginx/conf/web3gamecamp.conf << EOF
# 前端配置
server {
    listen 80;
    server_name www.web3gamecamp.xyz;
    root $PROJECT_PATH/frontend/build;

    location / {
        try_files \$uri \$uri/ /index.html;
        index index.html;
    }
}

# 后端API配置
server {
    listen 80;
    server_name api.web3gamecamp.xyz;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
EOF

# 重新加载Nginx配置
nginx -s reload

echo "Deployment completed!"
