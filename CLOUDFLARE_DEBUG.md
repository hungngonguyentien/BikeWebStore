# Alternative Cloudflare Pages Configuration

## Option 1: Use _headers file (Simple approach)
Create `/public/_headers` with:

```
/products
  Content-Type: text/html

/faq  
  Content-Type: text/html

/lienlac
  Content-Type: text/html

/product/*
  Content-Type: text/html
```

## Option 2: Use Cloudflare Page Rules
In Cloudflare dashboard > Page Rules:

1. Rule: `vinfastphudung.vn/products`
   - Setting: "Cache Level: Bypass"
   
2. Rule: `vinfastphudung.vn/product/*`  
   - Setting: "Cache Level: Bypass"

## Option 3: Disable SPA Handling in Build
Set environment variable in Cloudflare Pages:
- Variable: `NODE_ENV`
- Value: `production`

## Current Issue Analysis
The redirect error suggests:
1. Cloudflare can't find the prerendered files, OR
2. There's a conflict between _redirects and static file serving, OR  
3. The build didn't deploy correctly

## Debug Steps
1. Check Cloudflare build logs
2. Verify files exist in deployment
3. Test with direct file access (e.g., `/products.html`)
4. Check Cloudflare cache settings