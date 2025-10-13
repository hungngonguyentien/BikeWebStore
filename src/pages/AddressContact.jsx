import React from 'react'
import { Helmet } from 'react-helmet-async'
import './AddressContact.css'

const AddressContact = () => {
  return (
    <>
      <Helmet>
        <title>Địa Chỉ & Liên Hệ - PHÚ DŨNG | Cửa Hàng Xe Máy Đắk Lắk</title>
  <meta name="description" content="Liên hệ PHÚ DŨNG - Cửa hàng xe máy chất lượng tại Đắk Lắk. Địa chỉ: Số 32-34 - Cách Mạng Tháng 8, Thị trấn Quảng Phú, Huyện Cư M'gar, Đắk Lắk. Hotline: 090.350.3600 | 098.476.3222" />
        <meta name="keywords" content="liên hệ PHÚ DŨNG, địa chỉ cửa hàng xe máy, Đắk Lắk, Cư M'gar, Quảng Phú, 090.350.3600, 098.476.3222, xe máy Đắk Lắk" />
        <meta property="og:title" content="Địa Chỉ & Liên Hệ - PHÚ DŨNG" />
        <meta property="og:description" content="Liên hệ PHÚ DŨNG - Cửa hàng xe máy chất lượng tại Đắk Lắk" />
        <meta property="og:type" content="place" />
        <meta property="og:url" content="https://vinfastphudung.vn/lienlac" />
        <meta property="og:site_name" content="PHÚ DŨNG Xe Máy" />
        <meta name="geo.region" content="VN-72" />
        <meta name="geo.placename" content="Đắk Lắk" />
        <meta name="geo.position" content="12.6667;108.0333" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Địa Chỉ & Liên Hệ - PHÚ DŨNG" />
        <meta name="twitter:description" content="Liên hệ PHÚ DŨNG - Cửa hàng xe máy chất lượng tại Đắk Lắk" />
        <meta name="twitter:url" content="https://vinfastphudung.vn/lienlac" />
        <meta property="og:image" content="https://vinfastphudung.vn/og-image.png" />
        <meta property="og:image:alt" content="PHÚ DŨNG - Cửa Hàng Xe Máy & Xe Điện" />
        <meta name="twitter:image" content="https://vinfastphudung.vn/og-image.png" />
        <link rel="canonical" href="https://vinfastphudung.vn/lienlac" />
      </Helmet>
      
      <div className="address-contact-page">
        <div className="address-contact-header">
          <h1 className="gradient-text">Địa Chỉ & Liên Hệ</h1>
        </div>
      
        <div className="container section-spacing">
          <div className="address-contact-container">
            <div className="contact-card address-card">
              <h2 className="contact-card-title address-title">📍 Địa Chỉ Cửa Hàng</h2>
              <address className="contact-address">
                Số 32-34 - Cách Mạng Tháng 8<br />
                Thị trấn Quảng Phú - Huyện Cư M'gar<br />
                Đắk Lắk
              </address>
            </div>

            <div className="contact-card contact-info-card">
              <h2 className="contact-card-title contact-title">📞 Liên Hệ</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <a 
              href="tel:0903503600" 
              className="btn btn-primary"
              style={{ width: 'fit-content' }}
            >
              📱 090.350.3600
            </a>
            <a 
              href="tel:0984763222" 
              className="btn btn-primary"
              style={{ width: 'fit-content' }}
            >
              📱 098.476.3222
            </a>
            <p style={{ color: '#264653', margin: 0, fontStyle: 'italic' }}>
              Liên hệ để được tư vấn và báo giá tốt nhất!
            </p>
          </div>
            </div>
          </div>
        </div>
      
        <div className="address-contact-footer">
          <h2 className="gradient-text">PHÚ DŨNG - Xe Máy Chất Lượng</h2>
          <p className="footer-subtitle">
            Chuyên cung cấp xe máy chính hãng - Dịch vụ tận tâm - Giá cả hợp lý
          </p>
        </div>
      </div>
    </>
  )
}

export default AddressContact
