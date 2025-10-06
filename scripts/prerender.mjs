#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import http from 'node:http'
import finalhandler from 'finalhandler'
import serveStatic from 'serve-static'
import puppeteer from 'puppeteer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DIST_DIR = path.resolve(__dirname, '../dist')
const OUT_DIR = path.resolve(DIST_DIR)

// Define routes to prerender
const routes = [
  '/',
  '/products',
  '/lienlac'
]

function log(msg){
  console.log(`[prerender] ${msg}`)
}

async function startStaticServer(port){
  const serve = serveStatic(DIST_DIR, { index: ['index.html'] })
  const indexFile = path.join(DIST_DIR, 'index.html')
  const server = http.createServer((req, res) => {
    const urlPath = decodeURI(req.url.split('?')[0])
    // If direct file exists, let serve-static handle it
    const possibleFile = path.join(DIST_DIR, urlPath)
    fs.stat(possibleFile, (err, stats) => {
      if(!err && stats.isFile()){
        const done = finalhandler(req, res)
        return serve(req, res, done)
      }
      // For SPA routes (e.g., /products, /lienlac) always return index.html
      fs.readFile(indexFile, (readErr, data) => {
        if(readErr){
          res.statusCode = 500
          res.end('Internal Error')
          return
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(data)
      })
    })
  })
  await new Promise(resolve => server.listen(port, resolve))
  return server
}

async function ensureDir(p){
  await fs.promises.mkdir(p, { recursive: true })
}

async function writeHTML(route, html){
  let filePath
  if(route === '/'){
    filePath = path.join(OUT_DIR, 'index.html')
  } else {
    const routeDir = path.join(OUT_DIR, route)
    await ensureDir(routeDir)
    filePath = path.join(routeDir, 'index.html')
  }
  await fs.promises.writeFile(filePath, html, 'utf8')
  log(`Saved ${filePath}`)
}

function injectPrerenderMarker(html){
  return html.replace('</head>', '<meta name="x-prerendered" content="true" /></head>')
}

async function prerender(){
  if(!fs.existsSync(DIST_DIR)){
    console.error('Dist folder not found. Run build first.')
    process.exit(1)
  }

  const port = 5174
  const server = await startStaticServer(port)
  log(`Static server running on http://localhost:${port}`)

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })
  const page = await browser.newPage()

  for(const route of routes){
    const url = `http://localhost:${port}${route}`
    log(`Rendering ${route}`)
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
      // Optionally wait for specific selector
      // await page.waitForSelector('h1')

      // Remove script tags to produce static snapshot (optional)
      const html = await page.content()
      const cleaned = html
        .replace(/<script[^>]*>[^<]*<\/script>/g, '')
        .replace(/<script[^>]*src=\"[^\"]*\"[^>]*><\/script>/g, '')
      await writeHTML(route, injectPrerenderMarker(cleaned))
    } catch(err){
      console.error(`Failed to render ${route}:`, err.message)
    }
  }

  await browser.close()
  server.close()
  log('Prerender complete.')
}

prerender().catch(e => { console.error(e); process.exit(1) })
