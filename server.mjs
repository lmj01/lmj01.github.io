// server.mjs - Node.js 原生 ESM 静态服务器
import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM 中获取 __dirname 等价物
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || '127.0.0.1';
const STATIC_DIR = process.env.STATIC_DIR || './';

// MIME 类型映射
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject',
  '.wasm': 'application/wasm',
  '.map': 'application/json'
};

// 获取 MIME 类型
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

// 安全地解析路径（防止目录遍历攻击）
function sanitizePath(urlPath) {
  // 解码 URL 编码字符
  let decoded = decodeURIComponent(urlPath);
  
  // 移除 null 字节
  decoded = decoded.replace(/\0/g, '');
  
  // 规范化路径并确保在静态目录内
  const fullPath = path.normalize(path.join(STATIC_DIR, decoded));
  const resolvedRoot = path.resolve(STATIC_DIR);
  const resolvedPath = path.resolve(fullPath);
  
  // 安全检查：确保解析后的路径在根目录内
  if (!resolvedPath.startsWith(resolvedRoot)) {
    throw new Error('路径遍历攻击检测');
  }
  
  return resolvedPath;
}

// 处理请求
async function handleRequest(req, res) {
  const startTime = Date.now();
  
  try {
    // 只处理 GET 和 HEAD
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Method Not Allowed');
      return;
    }

    // 解析路径
    let filePath;
    try {
      filePath = sanitizePath(req.url);
    } catch (err) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Forbidden');
      console.log(`[403] ${req.url} - 路径安全检查失败`);
      return;
    }

    // 检查文件/目录存在性
    let stats;
    try {
      stats = await fs.stat(filePath);
    } catch (err) {
      // 尝试 index.html（SPA 支持）
      if (req.url.endsWith('/')) {
        filePath = path.join(filePath, 'index.html');
        try {
          stats = await fs.stat(filePath);
        } catch {
          throw new Error('Not Found');
        }
      } else {
        // 尝试添加 .html 后缀
        const htmlPath = filePath + '.html';
        try {
          stats = await fs.stat(htmlPath);
          filePath = htmlPath;
        } catch {
          throw new Error('Not Found');
        }
      }
    }

    // 如果是目录，尝试 index.html
    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
      try {
        stats = await fs.stat(filePath);
      } catch {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        return;
      }
    }

    // 读取文件（关键：使用 fs/promises 确保完整读取）
    const data = await fs.readFile(filePath);
    
    // 关键：正确设置 Content-Length，避免 ERR_CONTENT_LENGTH_MISMATCH
    const contentLength = data.length;
    
    // 设置响应头
    const headers = {
      'Content-Type': getMimeType(filePath),
      'Content-Length': contentLength,
      'Cache-Control': 'no-cache',  // 开发环境禁用缓存
      'X-Content-Type-Options': 'nosniff'
    };

    res.writeHead(200, headers);
    
    // HEAD 请求不发送 body
    if (req.method === 'HEAD') {
      res.end();
    } else {
      res.end(data);  // 关键：使用 end() 确保一次性发送完整数据
    }

    const duration = Date.now() - startTime;
    console.log(`[200] ${req.method} ${req.url} - ${contentLength} bytes - ${duration}ms`);

  } catch (err) {
    if (err.message === 'Not Found') {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      console.log(`[404] ${req.method} ${req.url}`);
    } else {
      console.error(`[500] Error serving ${req.url}:`, err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  }
}

// 创建服务器
const server = http.createServer(handleRequest);

// 错误处理
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ 端口 ${PORT} 已被占用`);
    process.exit(1);
  } else {
    console.error('❌ 服务器错误:', err);
    process.exit(1);
  }
});

// 启动服务器
server.listen(PORT, HOST, () => {
  console.log(`
┌─────────────────────────────────────┐
│  🚀 静态服务器已启动                │
├─────────────────────────────────────┤
│  地址: http://${HOST}:${PORT}/          │
│  目录: ${path.resolve(STATIC_DIR)}    │
│  模式: ESM (ES Module)              │
└─────────────────────────────────────┘
`);
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n👋 正在关闭服务器...');
  server.close(() => {
    process.exit(0);
  });
});