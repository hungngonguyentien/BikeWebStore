import React from 'react'
import BikeDisplay from './BikeDisplay'

const ProductCard = ({ 
  selectedManufacturer, 
  filteredBikes, 
  loading 
}) => {
  return (
    <div className="products-content">
      <div className="products-header">
        <h2 className="products-title">
          {selectedManufacturer === 'Tất cả' ? 'Tất cả sản phẩm' : `Sản phẩm ${selectedManufacturer}`}
        </h2>
        <p className="products-count">
          {filteredBikes.length} sản phẩm
        </p>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Đang tải sản phẩm...</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredBikes.length > 0 ? (
            filteredBikes.map((bike) => (
              <BikeDisplay key={bike.id} bike={bike} />
            ))
          ) : (
            <div className="empty-state">
              <h3>Không có sản phẩm nào</h3>
              <p>Hiện tại chưa có sản phẩm nào từ {selectedManufacturer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductCard
