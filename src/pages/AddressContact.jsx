import React from 'react'

const AddressContact = () => {
  return (
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
          background: 'white',
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
          background: 'white',
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
  )
}

export default AddressContact
