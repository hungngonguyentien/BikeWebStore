import React, { useRef } from 'react'
import BikeDisplay from './BikeDisplay'
import './BikeByCompany.css'

const BikeByCompany = ({ manufacturer, bikes }) => {
  const scrollRef = useRef(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  if (!bikes || bikes.length === 0) {
    return null
  }

  return (
    <div className="bike-by-company">
      <div className="bike-by-company__header">
        <h2 className="bike-by-company__title">{manufacturer}</h2>
        <div className="bike-by-company__controls">
          <button 
            className="bike-by-company__btn bike-by-company__btn--prev"
            onClick={scrollLeft}
            aria-label={`Scroll ${manufacturer} bikes left`}
          >
            ‹
          </button>
          <button 
            className="bike-by-company__btn bike-by-company__btn--next"
            onClick={scrollRight}
            aria-label={`Scroll ${manufacturer} bikes right`}
          >
            ›
          </button>
        </div>
      </div>
      
      <div 
        className="bike-by-company__slider"
        ref={scrollRef}
      >
        {bikes.map((bike) => (
          <div key={bike.id} className="bike-by-company__slide">
            <BikeDisplay bike={bike} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BikeByCompany
