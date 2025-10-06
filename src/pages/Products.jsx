import React, { useState, useEffect } from 'react'
import ProductMenu from '../components/ProductMenu'
import ProductCard from '../components/ProductCard'
import { fetchBikesFromSheets } from '../utils/googleSheets'
import './Products.css'

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
  )
}

export default Products
