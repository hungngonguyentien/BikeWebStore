import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__section">
            <h3 className="footer__title">Địa chỉ cửa hàng</h3>
            <div className="footer__address">
              <p className="footer__address-line">Số 32-34 - Cách Mạng Tháng 8</p>
              <p className="footer__address-line">Thị trấn Quảng Phú - Huyện Cư M'gar</p>
              <p className="footer__address-line">Đắk Lắk</p>
            </div>
          </div>
          
          <div className="footer__section">
            <h3 className="footer__title">Liên hệ</h3>
            <div className="footer__contact">
              <a href="tel:0903503600" className="footer__phone">
                <span className="footer__phone-icon">📞</span>
                090.350.3600
              </a>
              <a href="tel:0984763222" className="footer__phone">
                <span className="footer__phone-icon">📞</span>
                098.476.3222
              </a>
              <a 
                href="https://www.facebook.com/people/VinFast-PHÚ-DŨNG/100057568774434/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer__facebook"
              >
                <span className="footer__facebook-icon">📘</span>
                Facebook Fan Page
              </a>
            </div>
          </div>
          
          <div className="footer__section">
            <h3 className="footer__title">PHÚ DŨNG</h3>
            <p className="footer__description">
              Chuyên cung cấp xe máy chất lượng cao
            </p>
            <p className="footer__description">
              Dịch vụ tận tâm - Giá cả hợp lý
            </p>
          </div>
        </div>
        
        <div className="footer__bottom">
          <div className="footer__divider"></div>
          <p className="footer__copyright">
            © 2025 PHÚ DŨNG - Xe Máy Chất Lượng
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
