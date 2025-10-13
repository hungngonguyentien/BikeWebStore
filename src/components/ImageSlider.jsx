import React, { useState, useEffect, useRef } from 'react'
import './ImageSlider.css'
import imgA from '../assets/event0.jpg'
import imgB from '../assets/event1.jpg'
import imgC from '../assets/event2.jpg'

const slides = [
  {
    src: imgA,
    alt: "Hành trình 1 chiếc xe tới gặp bạn tại Vinfast Phú Dũng"
  },
  {
    src: imgB,
    alt: "Ra mắt Feliz phiên bản 02 pin, quãng đường lên đến 262km/lần sạc, chỉ từ 25.900.000 VNĐ"
  },
  {
    src: imgC,
    alt: "Mở bán Vero X, xe máy điện 2 pin với công nghệ thông minh, chỉ từ 34.900.000 VNĐ"
  }
]

const ImageSlider = ({ interval = 3000 }) => {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef(null)

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex(prev => (prev + 1) % slides.length)
    }, interval)
    return () => clearTimeout(timeoutRef.current)
  }, [index, interval])

  const prev = () => setIndex(i => (i - 1 + slides.length) % slides.length)
  const next = () => setIndex(i => (i + 1) % slides.length)

  return (
    <div className="slider">
      <div className="slider__viewport">
        {slides.map((item, i) => (
          <img
            key={i}
            src={item.src}
            alt={item.alt}
            className={`slider__img ${i === index ? 'is-active' : ''}`}
            style={{ transform: `translateX(${(i - index) * 100}%)` }}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        ))}
      </div>

      <button className="slider__btn slider__btn--prev" onClick={prev} aria-label="Previous">‹</button>
      <button className="slider__btn slider__btn--next" onClick={next} aria-label="Next">›</button>

      <div className="slider__dots">
        {slides.map((_, i) => (
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
