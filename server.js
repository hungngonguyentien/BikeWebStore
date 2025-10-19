// server.js - Production server with proper routing
import { createServer } from 'http';
import { readFileSync, existsSync, lstatSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');

// Cache for frequently accessed files
const indexHtml = readFileSync(path.join(distPath, 'index.html'), 'utf8');

function getContentType(filePath) {
  const ext = path.extname(filePath);
  switch (ext) {
    case '.html': return 'text/html; charset=utf-8';
    case '.js': return 'application/javascript';
    case '.css': return 'text/css';
    case '.json': return 'application/json';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.svg': return 'image/svg+xml';
    case '.webp': return 'image/webp';
    default: return 'application/octet-stream';
  }
}

function servePrerenderOrFallback(url, res) {
  // Remove query parameters and trailing slash
  const cleanUrl = url.split('?')[0].replace(/\/$/, '') || '/';
  
  // Check for prerendered file
  let prerenderPath;
  if (cleanUrl === '/') {
    prerenderPath = path.join(distPath, 'index.html');
  } else if (cleanUrl.startsWith('/product/')) {
    const productId = cleanUrl.split('/product/')[1];
    prerenderPath = path.join(distPath, 'product', `${productId}.html`);
  } else {
    prerenderPath = path.join(distPath, `${cleanUrl}.html`);
  }
  
  if (existsSync(prerenderPath)) {
    console.log(`Serving prerendered: ${cleanUrl} -> ${prerenderPath}`);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(readFileSync(prerenderPath, 'utf8'));
  } else {
    console.log(`Serving SPA fallback for: ${cleanUrl}`);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(indexHtml);
  }
}

const server = createServer((req, res) => {
  const url = req.url;
  
  // Handle static files
  const filePath = path.join(distPath, url === '/' ? 'index.html' : url.split('?')[0]);
  
  if (existsSync(filePath) && !lstatSync(filePath).isDirectory()) {
    const contentType = getContentType(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(readFileSync(filePath));
    return;
  }
  
  // Handle SPA routes with prerender fallback
  servePrerenderOrFallback(url, res);
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Serving from: ${distPath}`);
});