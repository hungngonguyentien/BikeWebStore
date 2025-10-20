import React, { useState, useEffect } from 'react'
import ProductMenu from '../components/ProductMenu'
import ProductCard from '../components/ProductCard'
import { fetchBikesFromSheets } from '../utils/googleSheets'
import { GOOGLE_SHEETS_URL, SAMPLE_BIKES } from '../config/constants'
import { Helmet } from 'react-helmet-async'
import './Products.css'

const Products = () => {
  const [bikes, setBikes] = useState([])
  const [selectedManufacturer, setSelectedManufacturer] = useState('Tất cả')
  const [manufacturers, setManufacturers] = useState([])
  const [loading, setLoading] = useState(true)

  // Build ItemList JSON-LD from the loaded bikes
  const buildItemListJsonLd = (items) => {
    if (!items || items.length === 0) return null
    const origin = 'https://vinfastphudung.vn'
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'itemListElement': items.map((bike, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${origin}/product/${bike.id}`,
        name: bike.name,
        item: {
          '@type': 'Product',
          '@id': `${origin}/product/${bike.id}`,
          name: bike.name,
          brand: bike.manufacturer ? { '@type': 'Brand', name: bike.manufacturer } : undefined,
          image: bike.imageURL,
          description: bike.shortDescription || `${bike.name} - ${bike.manufacturer || ''}`.trim(),
          url: `${origin}/product/${bike.id}`,
          offers: bike.price ? {
            '@type': 'Offer',
            priceCurrency: 'VND',
            price: bike.price.toString().replace(/[^\d]/g, ''),
            availability: 'https://schema.org/InStock',
            url: `${origin}/product/${bike.id}`
          } : undefined
        }
      }))
    }
  }

  useEffect(() => {
    const loadBikes = async () => {
      try {
        setLoading(true)
        const bikesData = await fetchBikesFromSheets(GOOGLE_SHEETS_URL)
        setBikes(bikesData)
        
        // Extract unique manufacturers
        const uniqueManufacturers = ['Tất cả', ...new Set(bikesData.map(bike => bike.manufacturer))]
        setManufacturers(uniqueManufacturers)
      } catch (error) {
        console.error('Error loading bikes from Google Sheets:', error)
        // Fallback to sample data
        setBikes(SAMPLE_BIKES)
        const uniqueManufacturers = ['Tất cả', ...new Set(SAMPLE_BIKES.map(bike => bike.manufacturer))]
        setManufacturers(uniqueManufacturers)
      } finally {
        setLoading(false)
      }
    }
    
    loadBikes()
  }, [])

  // Filter bikes based on selected manufacturer
  const filteredBikes = selectedManufacturer === 'Tất cả' 
    ? bikes 
    : bikes.filter(bike => bike.manufacturer === selectedManufacturer)

  return (
    <>
      <Helmet>
        <title>Sản Phẩm - PHÚ DŨNG | Xe Máy Honda, Yamaha, Suzuki, VinFast</title>
        <meta name="description" content="Khám phá bộ sưu tập xe máy chất lượng cao từ các thương hiệu hàng đầu Honda, Yamaha, Suzuki, VinFast tại PHÚ DŨNG. Giá cả cạnh tranh, chất lượng đảm bảo." />
        <meta name="keywords" content="sản phẩm xe máy, Honda Winner, Yamaha Exciter, Suzuki Raider, VinFast, xe máy mới, xe máy chính hãng, Đắk Lắk" />
        <meta property="og:title" content="Sản Phẩm Xe Máy - PHÚ DŨNG" />
        <meta property="og:description" content="Khám phá bộ sưu tập xe máy chất lượng cao từ các thương hiệu hàng đầu" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vinfastphudung.vn/products" />
        <meta property="og:site_name" content="PHÚ DŨNG Xe Máy" />
        <meta property="og:image" content="https://vinfastphudung.vn/og-image.png" />
        <meta property="og:image:alt" content="PHÚ DŨNG - Cửa Hàng Xe Máy & Xe Điện" />
        <meta name="twitter:image" content="https://vinfastphudung.vn/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sản Phẩm Xe Máy - PHÚ DŨNG" />
        <meta name="twitter:description" content="Khám phá bộ sưu tập xe máy chất lượng cao từ các thương hiệu hàng đầu" />
        <meta name="twitter:url" content="https://vinfastphudung.vn/products" />
        <link rel="canonical" href="https://vinfastphudung.vn/products" />
        {bikes.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify(buildItemListJsonLd(bikes))}
          </script>
        )}
      </Helmet>
      <div className="products-page">
        <div className="products-header-section">
          <h1 className="text-center gradient-text">Sản Phẩm</h1>
          <p className="text-center products-subtitle">
            Khám phá bộ sưu tập xe máy chất lượng cao từ các thương hiệu hàng đầu
          </p>
        </div>
      
      <div className="container section-spacing">
        <div className="products-layout">
          <ProductMenu 
            manufacturers={manufacturers}
            selectedManufacturer={selectedManufacturer}
            onManufacturerSelect={setSelectedManufacturer}
            bikes={bikes}
          />
          
          <ProductCard 
            selectedManufacturer={selectedManufacturer}
            filteredBikes={filteredBikes}
            loading={loading}
          />
        </div>
      </div>
      </div>
    </>
  )
}

export default Products
