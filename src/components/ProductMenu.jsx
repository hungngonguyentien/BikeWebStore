import React from 'react'

const ProductMenu = ({ 
  manufacturers, 
  selectedManufacturer, 
  onManufacturerSelect, 
  bikes 
}) => {
  return (
    <div className="products-sidebar">
      <h2 className="sidebar-title">Danh mục sản phẩm</h2>
      <div className="category-list">
        {manufacturers.map((manufacturer) => (
          <button
            key={manufacturer}
            className={`category-btn ${selectedManufacturer === manufacturer ? 'active' : ''}`}
            onClick={() => onManufacturerSelect(manufacturer)}
          >
            <span className="category-icon">🏍️</span>
            {manufacturer}
            <span className="category-count">
              ({manufacturer === 'Tất cả' ? bikes.length : bikes.filter(b => b.manufacturer === manufacturer).length})
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductMenu
