import React from 'react'
import { Link } from 'react-router-dom'
import './BikeDisplay.css'

const BikeDisplay = ({ bike }) => {
  const { id, name, price, imageURL, manufacturer, discount = 0 } = bike

  const parsePriceToNumber = (val) => {
    if (val == null) return null
    const digits = String(val).replace(/[^0-9]/g, '')
    if (!digits) return null
    const num = parseInt(digits, 10)
    return Number.isNaN(num) ? null : num
  }

  const formatVND = (num) => {
    if (num == null) return 'Liên hệ để biết giá'
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VNĐ'
  }

  const basePrice = parsePriceToNumber(price)
  const hasDiscount = typeof discount === 'number' && discount > 0 && discount < 1 && basePrice != null
  const finalPrice = hasDiscount ? Math.round(basePrice * (1 - discount)) : basePrice

  return (
    <div className="bike-display">
      <Link to={`/product/${id}`} className="bike-display__link">
        <div className="bike-display__image-wrapper">
          {hasDiscount && (
            <div className="discount-badge">-{Math.round(discount * 100)}%</div>
          )}
          <img 
            src={imageURL} 
            alt={`${name} - ${manufacturer} giá ${price}`}
            className="bike-display__image"
            loading="lazy"
            decoding="async"
            onError={() => {
            }}
          />
        </div>
        <div className="bike-display__info">
          <h3 className="bike-display__name">{name}</h3>
          {hasDiscount ? (
            <div className="bike-display__price-block">
              <p className="bike-display__price bike-display__price--original">{formatVND(basePrice)}</p>
              <p className="bike-display__price bike-display__price--discounted">{formatVND(finalPrice)}</p>
            </div>
          ) : (
            <p className="bike-display__price">{basePrice != null ? formatVND(basePrice) : price}</p>
          )}
          <p className="bike-display__manufacturer">{manufacturer}</p>
        </div>
      </Link>
      <div className="bike-display__actions">
        <Link to={`/product/${id}`} className="btn-view-details">
          Xem chi tiết
        </Link>
      </div>
    </div>
  )
}

export default BikeDisplay
