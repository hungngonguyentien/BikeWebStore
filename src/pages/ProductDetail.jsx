import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { fetchBikesFromSheets } from '../utils/googleSheets'
import { GOOGLE_SHEETS_URL, SAMPLE_BIKES, CONTACT_INFO } from '../config/constants'
import './ProductDetail.css'

const ProductDetail = () => {
  const { bikeId } = useParams()
  const navigate = useNavigate()
  const [bike, setBike] = useState(null)
  const [selectedImage, setSelectedImage] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [loading, setLoading] = useState(true)

  // Fetch bike data directly from Google Sheets
  useEffect(() => {
    const loadBike = async () => {
      try {
        setLoading(true)
        const bikesData = await fetchBikesFromSheets(GOOGLE_SHEETS_URL)
        const foundBike = bikesData.find(b => b.id.toString() === bikeId)
        
        if (foundBike) {
          setBike(foundBike)
          setSelectedImage(foundBike.imageURL)
          if (foundBike.colors) {
            const colorsList = foundBike.colors.split(',').map(c => c.trim())
            setSelectedColor(colorsList[0] || '')
          }
        } else {
          // Try fallback data
          const fallbackBike = SAMPLE_BIKES.find(b => b.id.toString() === bikeId)
          if (fallbackBike) {
            setBike(fallbackBike)
            setSelectedImage(fallbackBike.imageURL)
            if (fallbackBike.colors) {
              const colorsList = fallbackBike.colors.split(',').map(c => c.trim())
              setSelectedColor(colorsList[0] || '')
            }
          } else {
            // Bike not found, redirect to products
            navigate('/products')
          }
        }
      } catch (error) {
        console.error('Error loading bike data:', error)
        // Try fallback data on error
        const fallbackBike = SAMPLE_BIKES.find(b => b.id.toString() === bikeId)
        if (fallbackBike) {
          setBike(fallbackBike)
          setSelectedImage(fallbackBike.imageURL)
          if (fallbackBike.colors) {
            const colorsList = fallbackBike.colors.split(',').map(c => c.trim())
            setSelectedColor(colorsList[0] || '')
          }
        } else {
          navigate('/products')
        }
      } finally {
        setLoading(false)
      }
    }
    
    loadBike()
  }, [bikeId, navigate])

  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl)
  }

  const formatPrice = (price) => {
    if (!price) return 'Liên hệ để biết giá'
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VNĐ'
  }

  const getAvailableImages = () => {
    if (!bike) return []
    const images = [bike.imageURL, ...bike.moreImages].filter(img => img && img.trim() !== '')
    return images
  }

  const getColorsList = () => {
    if (!bike?.colors) return []
    return bike.colors.split(',').map(c => c.trim()).filter(c => c !== '')
  }

  if (loading) return <div className="loading">Đang tải...</div>
  if (!bike) return <div className="error">Không tìm thấy sản phẩm</div>

  return (
    <>
      <Helmet>
        <title>{bike.name} - Xe Điện Phú Đăng</title>
        <meta name="description" content={`${bike.name} ${bike.shortDescription} - ${bike.manufacturer}. Tầm hoạt động: ${bike.specifications.range}, Tốc độ tối đa: ${bike.specifications.maxSpeed}`} />
        <meta property="og:title" content={`${bike.name} - Xe Điện Phú Đăng`} />
        <meta property="og:description" content={`${bike.shortDescription} - ${bike.manufacturer}`} />
        <meta property="og:image" content={bike.imageURL} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://vinfastphudung.vn/product/${bike.id}`} />
        <link rel="canonical" href={`https://vinfastphudung.vn/product/${bike.id}`} />
      </Helmet>

      <div className="product-detail">
        <div className="product-detail-container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <a href="/">Trang chủ</a>
            <span>/</span>
            <a href="/products">Sản phẩm</a>
            <span>/</span>
            <span>{bike.name}</span>
          </nav>

          <div className="product-main">
            {/* Image Gallery */}
            <div className="product-images">
              <div className="main-image">
                <img 
                  src={selectedImage} 
                  alt={bike.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/500x400?text=Không+có+hình+ảnh'
                  }}
                />
                {getAvailableImages().length > 1 && (
                  <div className="image-counter">
                    {getAvailableImages().indexOf(selectedImage) + 1} / {getAvailableImages().length}
                  </div>
                )}
              </div>
              
              {getAvailableImages().length > 1 && (
                <div className="image-thumbnails">
                  {getAvailableImages().map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${bike.name} ${index + 1}`}
                      className={selectedImage === img ? 'active' : ''}
                      onClick={() => handleImageSelect(img)}
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="product-info">
              <h1>{bike.name}</h1>
              
              <div className="product-meta">
                <span className="manufacturer">Hãng: {bike.manufacturer}</span>
                {bike.version && <span className="version">Phiên bản: {bike.version}</span>}
              </div>

              <div className="price">
                <span className="current-price">{formatPrice(bike.price)}</span>
              </div>

              {bike.shortDescription && (
                <div className="short-description">
                  <p>{bike.shortDescription}</p>
                </div>
              )}

              {/* Colors */}
              {getColorsList().length > 0 && (
                <div className="colors-section">
                  <h3>Màu sắc có sẵn:</h3>
                  <div className="colors-list">
                    {getColorsList().map((color, index) => (
                      <span
                        key={index}
                        className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="product-actions">
                <button className="btn-primary">
                  Liên hệ đặt hàng
                </button>
                <a href={CONTACT_INFO.phoneHref} className="btn-secondary">
                  Gọi tư vấn: {CONTACT_INFO.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="specifications-section">
            <h2>Thông số kỹ thuật</h2>
            <div className="specs-grid">
              {bike.specifications.range && (
                <div className="spec-item">
                  <span className="spec-label">Tầm hoạt động khi sạc đầy:</span>
                  <span className="spec-value">{bike.specifications.range}</span>
                </div>
              )}
              {bike.specifications.maxSpeed && (
                <div className="spec-item">
                  <span className="spec-label">Tốc độ tối đa:</span>
                  <span className="spec-value">{bike.specifications.maxSpeed}</span>
                </div>
              )}
              {bike.specifications.chargeTime && (
                <div className="spec-item">
                  <span className="spec-label">Thời gian sạc:</span>
                  <span className="spec-value">{bike.specifications.chargeTime}</span>
                </div>
              )}
              {bike.specifications.battery && (
                <div className="spec-item">
                  <span className="spec-label">Pin:</span>
                  <span className="spec-value">{bike.specifications.battery}</span>
                </div>
              )}
              {bike.specifications.engine && (
                <div className="spec-item">
                  <span className="spec-label">Động cơ:</span>
                  <span className="spec-value">{bike.specifications.engine}</span>
                </div>
              )}
              {bike.specifications.brake && (
                <div className="spec-item">
                  <span className="spec-label">Phanh:</span>
                  <span className="spec-value">{bike.specifications.brake}</span>
                </div>
              )}
              {bike.specifications.frame && (
                <div className="spec-item">
                  <span className="spec-label">Khung xe:</span>
                  <span className="spec-value">{bike.specifications.frame}</span>
                </div>
              )}
              {bike.specifications.size && (
                <div className="spec-item">
                  <span className="spec-label">Dài x Rộng x Cao:</span>
                  <span className="spec-value">{bike.specifications.size}</span>
                </div>
              )}
              {bike.specifications.weight && (
                <div className="spec-item">
                  <span className="spec-label">Trọng lượng:</span>
                  <span className="spec-value">{bike.specifications.weight}</span>
                </div>
              )}
              {bike.specifications.trunkWidth && (
                <div className="spec-item">
                  <span className="spec-label">Cốp xe:</span>
                  <span className="spec-value">{bike.specifications.trunkWidth}</span>
                </div>
              )}
              {bike.specifications.warranty && (
                <div className="spec-item">
                  <span className="spec-label">Bảo hành:</span>
                  <span className="spec-value">{bike.specifications.warranty}</span>
                </div>
              )}
            </div>
          </div>

          {/* Contact Section */}
          <div className="contact-section">
            <h2>Liên hệ tư vấn</h2>
            <div className="contact-info">
              <div className="contact-item">
                <strong>Điện thoại:</strong> <a href={CONTACT_INFO.phoneHref}>{CONTACT_INFO.phone}</a>
              </div>
              <div className="contact-item">
                <strong>Email:</strong> {CONTACT_INFO.email}
              </div>
              <div className="contact-item">
                <strong>Địa chỉ:</strong> {CONTACT_INFO.address}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail
