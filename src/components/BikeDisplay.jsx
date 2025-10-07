import React from 'react'
import './BikeDisplay.css'

const BikeDisplay = ({ bike }) => {
  const { name, price, imageURL, manufacturer } = bike

  return (
    <div className="bike-display">
      <div className="bike-display__image-wrapper">
        <img 
          src={imageURL} 
          alt={name}
          className="bike-display__image"
          onError={() => {
            console.log(bike)
          }}
        />
      </div>
      <div className="bike-display__info">
        <h3 className="bike-display__name">{name}</h3>
        <p className="bike-display__price">{price}</p>
        <p className="bike-display__manufacturer">{manufacturer}</p>
      </div>
    </div>
  )
}

export default BikeDisplay
