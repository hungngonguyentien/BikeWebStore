# Cloudflare Pages HTTPS Configuration

## Issue: "Page with redirect" error in Google Search Console
The error occurs because Google encounters HTTP redirects when trying to crawl your site.

## Solutions Applied:

### 1. _headers file
- Added HSTS (HTTP Strict Transport Security) headers
- Forces browsers to use HTTPS only
- Prevents HTTP requests from being made

### 2. _redirects file  
- Explicit HTTP to HTTPS redirect rule
- 301 permanent redirect status
- Ensures all HTTP requests redirect to HTTPS

### 3. Cloudflare Dashboard Settings (Manual Steps)

Go to your Cloudflare dashboard and verify:

#### SSL/TLS Settings:
- **SSL/TLS mode**: "Full (strict)" or "Full"
- **Always Use HTTPS**: ON
- **HSTS**: Enabled with these settings:
  - Max Age: 12 months (31536000 seconds)
  - Include subdomains: ON
  - Preload: ON

#### Page Rules (if needed):
Create a page rule for `http://vinfastphudung.vn/*`:
- Setting: "Always Use HTTPS"

#### Edge Certificates:
- **Automatic HTTPS Rewrites**: ON
- **Minimum TLS Version**: 1.2 or higher

### 4. Expected Results:
- All HTTP requests automatically redirect to HTTPS
- Google will only see HTTPS URLs
- "Page with redirect" error should resolve within 1-2 weeks
- Better SEO rankings due to HTTPS-only configuration

### 5. Testing:
Test these URLs to ensure proper redirects:
- http://vinfastphudung.vn → https://vinfastphudung.vn
- http://vinfastphudung.vn/products → https://vinfastphudung.vn/products

All should return 301 redirects to HTTPS versions.