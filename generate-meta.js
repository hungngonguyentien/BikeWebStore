// generate-meta.js - Generate meta tags for each page
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseTemplate = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const pages = {
  '/products': {
    title: 'Sản Phẩm - PHÚ DŨNG | Xe Máy Honda, Yamaha, Suzuki, VinFast',
    description: 'Khám phá bộ sưu tập xe máy chất lượng cao từ các thương hiệu hàng đầu Honda, Yamaha, Suzuki, VinFast tại PHÚ DŨNG. Giá cả cạnh tranh, chất lượng đảm bảo.',
    url: 'https://vinfastphudung.vn/products'
  },
  '/faq': {
    title: 'FAQ - Câu Hỏi Thường Gặp | PHÚ DŨNG',
    description: 'Câu hỏi thường gặp về bảo hành pin, trả góp, giờ mở cửa và dịch vụ tại PHÚ DŨNG.',
    url: 'https://vinfastphudung.vn/faq'
  },
  '/lienlac': {
    title: 'Địa Chỉ & Liên Hệ - PHÚ DŨNG | Cửa Hàng Xe Máy Đắk Lắk',
    description: 'Liên hệ PHÚ DŨNG - Cửa hàng xe máy chất lượng tại Đắk Lắk. Địa chỉ: Số 32-34 - Cách Mạng Tháng 8, Thị trấn Quảng Phú, Huyện Cư M\'gar, Đắk Lắk. Hotline: 090.350.3600 | 098.476.3222',
    url: 'https://vinfastphudung.vn/lienlac'
  }
};

// Generate product pages
for (let i = 1; i <= 14; i++) {
  pages[`/product/${i}`] = {
    title: `Sản Phẩm ${i} - Xe Điện Phú Dũng | Đại Lý VinFast`,
    description: `Chi tiết sản phẩm xe điện số ${i} tại PHÚ DŨNG. Xem thông số kỹ thuật, giá bán và liên hệ tư vấn.`,
    url: `https://vinfastphudung.vn/product/${i}`
  };
}

// Generate static HTML files for each page
Object.entries(pages).forEach(([route, meta]) => {
  let html = baseTemplate;
  
  // Replace meta tags
  html = html.replace(
    /<title>.*?<\/title>/, 
    `<title>${meta.title}</title>`
  );
  
  html = html.replace(
    /<meta name="description" content=".*?"/, 
    `<meta name="description" content="${meta.description}"`
  );
  
  // Add canonical URL
  html = html.replace(
    /<link rel="canonical" href=".*?"/, 
    `<link rel="canonical" href="${meta.url}"`
  );
  
  // Add Open Graph tags
  html = html.replace(
    /<meta property="og:url" content=".*?"/, 
    `<meta property="og:url" content="${meta.url}"`
  );
  
  // Create directory if needed
  const routePath = route === '/' ? '/index' : route;
  const outputDir = path.join(__dirname, 'dist', path.dirname(routePath));
  const outputFile = path.join(__dirname, 'dist', `${routePath}.html`);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write the file
  fs.writeFileSync(outputFile, html);
  console.log(`Generated: ${outputFile}`);
});

console.log('Meta tags generation complete!');