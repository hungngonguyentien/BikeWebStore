// src/config/constants.js

// Google Sheets Configuration
export const GOOGLE_SHEETS_URL = 'https://docs.google.com/spreadsheets/d/1r7Q_Iqo6ScvriOsyAUNOYo_6m3HAHTstUkE-4EX4m44/edit?usp=sharing'

// Contact Information
export const CONTACT_INFO = {
  phone: '090.350.3600',
  phoneHref: 'tel:0903503600',
  email: 'hanh3503600@gmail.com',
  address: 'Số 32 - Cách Mạng Tháng 8, Thị trấn Quảng Phú, Huyện Cư M\'gar, Đắk Lắk',
  shortAddress: 'Quảng Phú, Cư M\'gar, Đắk Lắk'
}

// Fallback sample bikes used when Google Sheets fails
export const SAMPLE_BIKES = [
  {
    id: 1,
    name: 'Honda Winner X',
    price: '45,990,000 VND',
    imageURL: 'https://via.placeholder.com/300x200/264653/E0FBFC?text=Honda+Winner+X',
    manufacturer: 'Honda',
    shortDescription: 'Xe máy thể thao Honda Winner X với thiết kế mạnh mẽ',
    colors: 'Đỏ, Đen, Trắng',
    moreImages: [],
    specifications: {
      range: '300km',
      maxSpeed: '120km/h',
      chargeTime: 'N/A',
      battery: 'N/A',
      engine: '150cc',
      brake: 'Đĩa trước/sau',
      frame: 'Thép',
      size: '2000x750x1100mm',
      weight: '125kg',
      trunkWidth: '20L',
      warranty: '3 năm'
    }
  },
  {
    id: 2,
    name: 'Yamaha Exciter 155',
    price: '47,390,000 VND',
    imageURL: 'https://via.placeholder.com/300x200/E76F51/E0FBFC?text=Yamaha+Exciter',
    manufacturer: 'Yamaha',
    shortDescription: 'Yamaha Exciter 155 - Xe máy thể thao cao cấp',
    colors: 'Xanh, Đen, Bạc',
    moreImages: [],
    specifications: {
      range: '280km',
      maxSpeed: '125km/h',
      chargeTime: 'N/A',
      battery: 'N/A',
      engine: '155cc',
      brake: 'Đĩa trước/sau',
      frame: 'Thép',
      size: '2020x760x1090mm',
      weight: '130kg',
      trunkWidth: '18L',
      warranty: '3 năm'
    }
  },
  {
    id: 3,
    name: 'Suzuki Raider R150',
    price: '52,900,000 VND',
    imageURL: 'https://via.placeholder.com/300x200/2A9D8F/E0FBFC?text=Suzuki+Raider',
    manufacturer: 'Suzuki',
    shortDescription: 'Suzuki Raider R150 - Sức mạnh vượt trội',
    colors: 'Đỏ, Đen, Xanh',
    moreImages: [],
    specifications: {
      range: '320km',
      maxSpeed: '130km/h',
      chargeTime: 'N/A',
      battery: 'N/A',
      engine: '150cc',
      brake: 'Đĩa trước/sau',
      frame: 'Thép',
      size: '2030x770x1080mm',
      weight: '128kg',
      trunkWidth: '22L',
      warranty: '3 năm'
    }
  }
]
