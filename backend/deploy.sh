#!/bin/bash

# 设置项目路径
BACKEND_PATH=/www/wwwroot/api.web3gamecamp.xyz

# 安装项目依赖
cd $BACKEND_PATH
npm install

# 创建或更新环境变量文件
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/web3gamecamp
PORT=3001
NODE_ENV=production
EOF

# 使用 PM2 重启服务
pm2 delete web3gamecamp-api 2>/dev/null || true
pm2 start server.js --name "web3gamecamp-api"
pm2 save

echo "Backend deployment completed!"