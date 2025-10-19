// Cloudflare Pages Function for handling prerendered routes
// This runs on Cloudflare's edge and serves prerendered files

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Define prerendered routes
  const prerenderRoutes = {
    '/products': '/products.html',
    '/faq': '/faq.html', 
    '/lienlac': '/lienlac.html',
    '/product/1': '/product/1.html',
    '/product/2': '/product/2.html',
    '/product/3': '/product/3.html',
    '/product/4': '/product/4.html',
    '/product/5': '/product/5.html',
    '/product/6': '/product/6.html',
    '/product/7': '/product/7.html',
    '/product/8': '/product/8.html',
    '/product/9': '/product/9.html',
    '/product/10': '/product/10.html',
    '/product/11': '/product/11.html',
    '/product/12': '/product/12.html',
    '/product/13': '/product/13.html',
    '/product/14': '/product/14.html'
  };

  // Check if this is a prerendered route
  if (prerenderRoutes[pathname]) {
    try {
      // Try to serve the prerendered file
      const prerenderFile = prerenderRoutes[pathname];
      const response = await env.ASSETS.fetch(new Request(`${url.origin}${prerenderFile}`, request));
      
      if (response.status === 200) {
        // Set proper headers for SEO
        const newResponse = new Response(response.body, {
          status: 200,
          statusText: 'OK',
          headers: {
            ...response.headers,
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=300, s-maxage=3600'
          }
        });
        return newResponse;
      }
    } catch (error) {
      console.log(`Failed to serve prerendered file for ${pathname}:`, error);
    }
  }

  // Continue to next middleware or serve SPA
  return next();
}