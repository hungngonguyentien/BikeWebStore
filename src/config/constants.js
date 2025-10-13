// src/config/constants.js

// Google Sheets Configuration
export const GOOGLE_SHEETS_URL = 'https://docs.google.com/spreadsheets/d/1r7Q_Iqo6ScvriOsyAUNOYo_6m3HAHTstUkE-4EX4m44/edit?usp=sharing'

// Contact Information
export const CONTACT_INFO = {
  phone: '090.350.3600',
  phoneHref: 'tel:0903503600',
  email: 'hanh3503600@gmail.com',
  address: 'Số 32-34 - Cách Mạng Tháng 8, Thị trấn Quảng Phú, Huyện Cư M\'gar, Đắk Lắk',
  shortAddress: 'Quảng Phú, Cư M\'gar, Đắk Lắk'
}

// Fallback sample bikes used when Google Sheets fails
export const SAMPLE_BIKES = [
  {
    id: 1,
    name: 'Motio',
    price: '12,000,000',
    discount: 0.12,
    imageURL: 'https://res.cloudinary.com/dnfpec5yg/image/upload/v1760042676/img-motio2-black_mkex9c.png',
    manufacturer: 'Vinfast',
    shortDescription: 'Xe điện đa dụng, hướng tới người dùng đô thị cần sự linh hoạt và độ bền.',
    colors: 'Vàng, Đen, Đỏ, Trắng, Hồng',
    moreImages: [
      'https://res.cloudinary.com/dnfpec5yg/image/upload/v1760198445/4_nct8w7.jpg',
      'https://res.cloudinary.com/dnfpec5yg/image/upload/v1760198497/%C4%90EN_-_NGANG_PH%E1%BA%A2I_jos3gt.jpg',
      'https://res.cloudinary.com/dnfpec5yg/image/upload/v1760198525/%C4%90%E1%BB%8E_-_G%C3%93C_NGHI%C3%8ANG_TR%C3%81I_shur54.jpg',
      'https://res.cloudinary.com/dnfpec5yg/image/upload/v1760198526/H%E1%BB%93ng_xosazr.jpg',
      'https://res.cloudinary.com/dnfpec5yg/image/upload/v1760198526/Tr%E1%BA%AFng_-_G%C3%B3c_Th%E1%BA%B3ng_cc9taf.jpg'
    ],
    specifications: {
      range: '82 km',
      chargeTime: '≈8–10 giờ.',
      maxSpeed: '49 km/h',
      trunkWidth: '22 L',
      warranty: 'Loại pin: Ắc-quy 5 bình 12V → Bảo hành: thân xe theo chính sách cũ 3 năm; ắc-quy 12V: 1 năm.',
      engine: 'Động cơ điện 1500W, cho khả năng vận hành linh hoạt trong phố.',
      battery: 'Pin lithium ioni 20Ah, tiết kiệm năng lượng.',
      brake: 'Phanh đĩa trước + phanh tang trống (phanh cơ) sau',
      frame: 'Khung thép nhẹ, phuộc trước ống lồng giảm xóc hiệu quả.',
      size: '1.785 × 0.680 × 1.075 m',
      weight: '95.6 kg'
    }
  },
  {
    id: 2,
    name: 'Evo Lite Neo',
    price: '14,400,000',
    discount: 0.12,
    imageURL: 'https://res.cloudinary.com/dnfpec5yg/image/upload/v1760317635/EVO_LITE_Neo100003-2_p6kg5o.png',
    manufacturer: 'Vinfast',
    shortDescription: 'Xe máy điện nhỏ gọn, giá tiếp cận, phù hợp học sinh và di chuyển đô thị.',
    colors: 'Xanh, Xanh Rêu, Trắng, Tím Than, Đỏ, Đen',
    moreImages: [
      'https://res.cloudinary.com/dnfpec5yg/image/upload/v1760202469/EVO_LITE_Neo00003_jbko8h.png',
      'https://res.cloudinary.com/dnfpec5yg/image/upload/v1760202468/VVV08629-Enhanced-NR_2_iwg9dp.png',
      'https://res.cloudinary.com/dnfpec5yg/image/upload/v1760202468/EVO_LITE_Neo00001_kt14ti.png',
      'https://res.cloudinary.com/dnfpec5yg/image/upload/v1760202468/EVO_LITE_Neo0000a2_txgkoh.png'
    ],
    specifications: {
      range: '78 km',
      chargeTime: '10 giờ (bộ sạc tiêu chuẩn).',
      maxSpeed: '49 km/h',
      trunkWidth: '22 L',
      warranty: 'Loại pin: Ắc-quy 5 bình 12V → Bảo hành: thân xe theo chính sách cũ 3 năm; ắc-quy 12V: 1 năm.',
      engine: 'Động cơ điện một chiều công suất 1200W, vận hành êm ái và tiết kiệm điện.',
      battery: 'Pin LFP ioni lithium 24Ah, tháo rời dễ dàng.',
      brake: 'Phanh đĩa trước + phanh tang trống (phanh cơ) sau',
      frame: 'Khung thép chắc chắn, phuộc trước ống lồng giảm chấn êm ái.',
      size: '1.806 × 0.678 × 1.132 m',
      weight: '105 kg'
    }
  },
  {
    id: 3,
    name: 'Evo Neo',
    price: '17,800,000',
    discount: 0.12,
    imageURL: 'https://res.cloudinary.com/dnfpec5yg/image/upload/v1760042573/img-top-evoneo-white-sp_i3a9l9.webp',
    manufacturer: 'Vinfast',
    shortDescription: 'Xe tay điện đô thị thiết kế hiện đại, phù hợp cho nhu cầu đi lại hàng ngày.',
    colors: 'Xanh Tím, Xanh Rêu, Trắng, Đỏ, Đen Nhám',
    moreImages: [
      'https://res.cloudinary.com/dnfpec5yg/image/upload/v1760203231/EVO_NEO00004_1_ry1rin.png',
      'https://res.cloudinary.com/dnfpec5yg/image/upload/v1760203231/EVO_NEO00002_ndl8al.png',
      'https://res.cloudinary.com/dnfpec5yg/image/upload/v1760203230/EVO_NEO00001_eompor.png',
      'https://res.cloudinary.com/dnfpec5yg/image/upload/v1760203230/B%E1%BA%A3n_sao_EVO_NEO00003_tpxutn.png',
      'https://res.cloudinary.com/dnfpec5yg/image/upload/v1760203231/VVV08964-Enhanced-NR-Edit_acomr7.jpg'
    ],
    specifications: {
      range: '117 km',
      chargeTime: '5 giờ 20 phút.',
      maxSpeed: '60 km/h',
      trunkWidth: '17 L',
      warranty: 'Loại pin: LFP → Bảo hành: thân xe 6 năm, pin 8 năm.',
      engine: 'Động cơ điện công suất 1500W, tăng tốc nhanh, hoạt động ổn định.',
      battery: 'Pin lithium ioni 24Ah, sạc nhanh và bền bỉ.',
      brake: 'Phanh đĩa trước + phanh tang trống (phanh cơ) sau',
      frame: 'Khung thép chịu lực, phuộc trước ống lồng giảm xóc tốt trên đường phố.',
      size: '1.825 × 0.680 × 1.120 m',
      weight: '88 kg'
    }
  }
]
