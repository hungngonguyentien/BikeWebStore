// prerender.js - Static site generation for SEO
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes to prerender
const routes = [
  '/',
  '/products',
  '/faq', 
  '/lienlac',
  '/product/1',
  '/product/2',
  '/product/3',
  '/product/4',
  '/product/5',
  '/product/6',
  '/product/7',
  '/product/8',
  '/product/9',
  '/product/10',
  '/product/11',
  '/product/12',
  '/product/13',
  '/product/14'
];

async function prerender() {
  console.log('Starting prerendering process...');
  
  // Build the app first
  console.log('Building the application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Start a simple HTTP server
  console.log('Starting local server...');
  
  const indexHtml = fs.readFileSync(path.join(__dirname, 'dist', 'index.html'), 'utf8');
  
  const server = createServer((req, res) => {
    const url = req.url;
    const filePath = path.join(__dirname, 'dist', url === '/' ? 'index.html' : url);
    
    // Check if static file exists
    if (fs.existsSync(filePath) && !fs.lstatSync(filePath).isDirectory()) {
      const ext = path.extname(filePath);
      let contentType = 'text/html';
      
      if (ext === '.js') contentType = 'application/javascript';
      else if (ext === '.css') contentType = 'text/css';
      else if (ext === '.json') contentType = 'application/json';
      else if (ext === '.png') contentType = 'image/png';
      else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(fs.readFileSync(filePath));
    } else {
      // Serve index.html for SPA routes
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(indexHtml);
    }
  });
  
  server.listen(3000);
  console.log('Local server started on http://localhost:3000');
  
  const browser = await puppeteer.launch({ headless: true });
  
  try {
    for (const route of routes) {
      console.log(`Prerendering ${route}...`);
      
      const page = await browser.newPage();
      
      // Navigate to the route
      await page.goto(`http://localhost:3000${route}`, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });
      
      // Wait for React to render
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Get the rendered HTML
      const html = await page.content();
      
      // Create directory structure if needed
      const routePath = route === '/' ? '/index' : route;
      const filePath = path.join(__dirname, 'dist', `${routePath}.html`);
      const dirPath = path.dirname(filePath);
      
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      
      // Save the prerendered HTML
      fs.writeFileSync(filePath, html);
      console.log(`✓ Saved ${filePath}`);
      
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
    console.log('Prerendering complete!');
  }
}

prerender().catch(console.error);