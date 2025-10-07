import React, { useState, useEffect } from 'react'
import ProductMenu from '../components/ProductMenu'
import ProductCard from '../components/ProductCard'
import { fetchBikesFromSheets } from '../utils/googleSheets'
import { Helmet } from 'react-helmet-async'
import './Products.css'

// Fallback sample bikes (copied from Home.jsx) used if Google Sheets fetch fails
const sampleBikes = [
    {
      id: 1,
      name: 'Honda Winner X',
      price: '45,990,000 VND',
      imageURL: 'https://via.placeholder.com/300x200/264653/E0FBFC?text=Honda+Winner+X',
      manufacturer: 'Honda'
    },
    {
      id: 2,
      name: 'Yamaha Exciter 155',
      price: '47,390,000 VND',
      imageURL: 'https://via.placeholder.com/300x200/E76F51/E0FBFC?text=Yamaha+Exciter',
      manufacturer: 'Yamaha'
    },
    {
      id: 3,
      name: 'Suzuki Raider R150',
      price: '52,900,000 VND',
      imageURL: 'https://via.placeholder.com/300x200/2A9D8F/E0FBFC?text=Suzuki+Raider',
      manufacturer: 'Suzuki'
    }
]

const Products = () => {
  const [bikes, setBikes] = useState([])
  const [selectedManufacturer, setSelectedManufacturer] = useState('Tất cả')
  const [manufacturers, setManufacturers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBikes = async () => {
      try {
        setLoading(true)
        // Your Google Sheets URL
        const sheetsUrl = 'https://docs.google.com/spreadsheets/d/1r7Q_Iqo6ScvriOsyAUNOYo_6m3HAHTstUkE-4EX4m44/edit?usp=sharing'
        const bikesData = await fetchBikesFromSheets(sheetsUrl)
        setBikes(bikesData)
        
        // Extract unique manufacturers
        const uniqueManufacturers = ['Tất cả', ...new Set(bikesData.map(bike => bike.manufacturer))]
        setManufacturers(uniqueManufacturers)
      } catch (error) {
        console.error('Error loading bikes from Google Sheets:', error)
        // Fallback to sample data
        setBikes(sampleBikes)
        const uniqueManufacturers = ['Tất cả', ...new Set(sampleBikes.map(bike => bike.manufacturer))]
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
        <link rel="canonical" href="/products" />
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
