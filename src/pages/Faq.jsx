import { Helmet } from 'react-helmet-async'

const faqs = [
  {
    q: 'Thời gian bảo hành pin xe điện VinFast là bao lâu?',
    a: 'Pin xe điện VinFast thường được bảo hành 1–2 năm (tùy mẫu xe và chính sách từng thời điểm). Vui lòng liên hệ trực tiếp để biết chi tiết hiện hành.'
  },
  {
    q: 'Cửa hàng có hỗ trợ mua xe trả góp không?',
    a: 'Có. Chúng tôi hỗ trợ trả góp linh hoạt sau khi thẩm định giấy tờ. Đem theo CMND/CCCD và một số giấy tờ bổ sung nếu cần.'
  },
  {
    q: 'Thời gian mở cửa hằng ngày?',
    a: 'Cửa hàng mở cửa 07:00–17:30 tất cả các ngày trong tuần.'
  },
  {
    q: 'Có hỗ trợ thay pin và bảo dưỡng định kỳ?',
    a: 'Chúng tôi cung cấp dịch vụ thay pin, kiểm tra và bảo dưỡng định kỳ cho xe máy & xe điện chính hãng.'
  },
  {
    q: 'Làm sao để chọn mẫu xe điện phù hợp?',
    a: 'Hãy xác định quãng đường di chuyển trung bình mỗi ngày, tốc độ mong muốn và ngân sách. Nhân viên tư vấn sẽ giúp bạn so sánh các mẫu cụ thể.'
  }
]

function Faq() {
  return (
    <>
      <Helmet>
        <title>FAQ - Câu Hỏi Thường Gặp | PHÚ DŨNG</title>
        <meta name="description" content="Câu hỏi thường gặp về bảo hành pin, trả góp, giờ mở cửa và dịch vụ tại PHÚ DŨNG." />
        <link rel="canonical" href="https://vinfastphudung.vn/faq" />
        <meta property="og:title" content="FAQ - Câu Hỏi Thường Gặp | PHÚ DŨNG" />
        <meta property="og:description" content="Giải đáp về bảo hành pin, trả góp, giờ mở cửa và dịch vụ tại PHÚ DŨNG." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vinfastphudung.vn/faq" />
        <meta property="og:image" content="https://vinfastphudung.vn/og-image.png" />
        <meta property="og:image:alt" content="PHÚ DŨNG - Cửa Hàng Xe Máy & Xe Điện" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FAQ - Câu Hỏi Thường Gặp | PHÚ DŨNG" />
        <meta name="twitter:description" content="Giải đáp về bảo hành pin, trả góp, giờ mở cửa và dịch vụ tại PHÚ DŨNG." />
        <meta name="twitter:image" content="https://vinfastphudung.vn/og-image.png" />
      </Helmet>
      <main style={{ padding: '60px 20px', maxWidth: 960, margin: '0 auto' }}>
        <h1 className="gradient-text" style={{ textAlign: 'center', marginBottom: 40 }}>Câu Hỏi Thường Gặp</h1>
        <div style={{ display: 'grid', gap: 32 }}>
          {faqs.map((item, idx) => (
            <div key={idx} itemScope itemType="https://schema.org/Question">
              <h2 style={{ fontSize: '20px', margin: '0 0 8px', color: '#2A9D8F' }} itemProp="name">{idx + 1}. {item.q}</h2>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p style={{ margin: 0 }} itemProp="text">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default Faq
