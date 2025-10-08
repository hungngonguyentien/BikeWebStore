import React from 'react'
import { Helmet } from 'react-helmet-async'

const AddressContact = () => {
  return (
    <>
      <Helmet>
        <title>Địa Chỉ & Liên Hệ - PHÚ DŨNG | Cửa Hàng Xe Máy Đắk Lắk</title>
        <meta name="description" content="Liên hệ PHÚ DŨNG - Cửa hàng xe máy chất lượng tại Đắk Lắk. Địa chỉ: Số 32 - Cách Mạng Tháng 8, Thị trấn Quảng Phú, Huyện Cư M'gar, Đắk Lắk. Hotline: 090.350.3600" />
        <meta name="keywords" content="liên hệ PHÚ DŨNG, địa chỉ cửa hàng xe máy, Đắk Lắk, Cư M'gar, Quảng Phú, 090.350.3600, xe máy Đắk Lắk" />
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
      <div>
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px 40px', 
          width: '100%' 
        }}>
          <h1 className="gradient-text">Địa Chỉ & Liên Hệ</h1>
        </div>
      
      <div className="container section-spacing">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '40px'
        }}>
        <div style={{
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 8px 30px rgba(38, 70, 83, 0.1)',
          border: '3px solid transparent',
          background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #2A9D8F, #E9C46A) border-box'
        }}>
          <h2 style={{ color: '#2A9D8F', marginBottom: '20px' }}>📍 Địa Chỉ Cửa Hàng</h2>
          <address style={{ 
            fontStyle: 'normal', 
            lineHeight: '1.8',
            fontSize: '16px',
            color: '#264653'
          }}>
            Số 32 - Cách Mạng Tháng 8<br />
            Thị trấn Quảng Phú - Huyện Cư M'gar<br />
            Đắk Lắk
          </address>
        </div>

        <div style={{
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 8px 30px rgba(38, 70, 83, 0.1)',
          border: '3px solid transparent',
          background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #E9C46A, #F4A261) border-box'
        }}>
          <h2 style={{ color: '#E76F51', marginBottom: '20px' }}>📞 Liên Hệ</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <a 
              href="tel:0903503600" 
              className="btn btn-primary"
              style={{ width: 'fit-content' }}
            >
              📱 090.350.3600
            </a>
            <p style={{ color: '#264653', margin: 0, fontStyle: 'italic' }}>
              Liên hệ để được tư vấn và báo giá tốt nhất!
            </p>
          </div>
        </div>
        </div>
      </div>
      
      <div style={{
        marginTop: '50px',
        textAlign: 'center',
        padding: '40px 20px',
        background: 'linear-gradient(135deg, #E0FBFC, white)',
        width: '100%'
      }}>
        <h2 className="gradient-text">PHÚ DŨNG - Xe Máy Chất Lượng</h2>
        <p style={{ fontSize: '18px', color: '#2A9D8F', margin: '16px 0 0' }}>
          Chuyên cung cấp xe máy chính hãng - Dịch vụ tận tâm - Giá cả hợp lý
        </p>
      </div>
      </div>
    </>
  )
}

export default AddressContact
