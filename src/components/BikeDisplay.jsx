import React from 'react'
import { Link } from 'react-router-dom'
import './BikeDisplay.css'

const BikeDisplay = ({ bike }) => {
  const { id, name, price, imageURL, manufacturer } = bike

  return (
    <div className="bike-display">
      <Link to={`/product/${id}`} className="bike-display__link">
        <div className="bike-display__image-wrapper">
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
          <p className="bike-display__price">{price}</p>
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
