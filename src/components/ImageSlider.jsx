import React, { useState, useEffect, useRef } from 'react'
import './ImageSlider.css'
import imgA from '../assets/event0.jpg'
import imgB from '../assets/event1.png'
import imgC from '../assets/event2.png'

const images = [imgA, imgB, imgC]

const ImageSlider = ({ interval = 3000 }) => {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef(null)

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex(prev => (prev + 1) % images.length)
    }, interval)
    return () => clearTimeout(timeoutRef.current)
  }, [index, interval])

  const prev = () => setIndex(i => (i - 1 + images.length) % images.length)
  const next = () => setIndex(i => (i + 1) % images.length)

  return (
    <div className="slider">
      <div className="slider__viewport">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`slide-${i}`}
            className={`slider__img ${i === index ? 'is-active' : ''}`}
            style={{ transform: `translateX(${(i - index) * 100}%)` }}
          />
        ))}
      </div>

      <button className="slider__btn slider__btn--prev" onClick={prev} aria-label="Previous">‹</button>
      <button className="slider__btn slider__btn--next" onClick={next} aria-label="Next">›</button>

      <div className="slider__dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`slider__dot ${i === index ? 'is-active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
