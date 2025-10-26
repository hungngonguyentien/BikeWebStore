import ImageSlider from '../components/ImageSlider'
import BikeDisplay from '../components/BikeDisplay'
import BikeByCompany from '../components/BikeByCompany'
import { useState, useEffect } from 'react'
import { fetchBikesFromSheets } from '../utils/googleSheets'
import { Helmet } from 'react-helmet-async'

// Sample bike data - replace this with your Google Sheets fetch
const sampleBikes = [
  {
    id: 1,
    name: "Honda Winner X",
    price: "45,990,000 VND",
    imageURL: "https://via.placeholder.com/300x200/264653/E0FBFC?text=Honda+Winner+X",
    manufacturer: "Honda"
  },
  {
    id: 2,
    name: "Yamaha Exciter 155",
    price: "47,390,000 VND", 
    imageURL: "https://via.placeholder.com/300x200/E76F51/E0FBFC?text=Yamaha+Exciter",
    manufacturer: "Yamaha"
  },
  {
    id: 3,
    name: "Suzuki Raider R150",
    price: "52,900,000 VND",
    imageURL: "https://via.placeholder.com/300x200/2A9D8F/E0FBFC?text=Suzuki+Raider",
    manufacturer: "Suzuki"
  }
]

function Home(){
    const [bikes, setBikes] = useState([])
    const [bikesByCompany, setBikesByCompany] = useState({})

    useEffect(() => {
        const loadBikes = async () => {
            try {
                // Your Google Sheets URL
                const sheetsUrl = 'https://docs.google.com/spreadsheets/d/1r7Q_Iqo6ScvriOsyAUNOYo_6m3HAHTstUkE-4EX4m44/edit?usp=sharing'
                const bikes = await fetchBikesFromSheets(sheetsUrl)
                setBikes(bikes)
                
                // Group bikes by manufacturer
                const grouped = bikes.reduce((acc, bike) => {
                    const manufacturer = bike.manufacturer || 'Unknown'
                    if (!acc[manufacturer]) {
                        acc[manufacturer] = []
                    }
                    acc[manufacturer].push(bike)
                    return acc
                }, {})
                setBikesByCompany(grouped)
            } catch (error) {
                console.error('Error loading bikes from Google Sheets:', error)
                // Fallback to sample data if sheets fetch fails
                setBikes(sampleBikes)
                
                // Group sample bikes by manufacturer
                const grouped = sampleBikes.reduce((acc, bike) => {
                    const manufacturer = bike.manufacturer || 'Unknown'
                    if (!acc[manufacturer]) {
                        acc[manufacturer] = []
                    }
                    acc[manufacturer].push(bike)
                    return acc
                }, {})
                setBikesByCompany(grouped)
            }
        }
        
        loadBikes()
    }, [])

    return (
        <>
            <Helmet>
                <title>PHÚ DŨNG - Xe Máy Chất Lượng | Cửa Hàng Xe Máy Đắk Lắk</title>
                <meta name="description" content="PHÚ DŨNG - Đại lý xe điện VinFast #1 tại Đắk Lắk. Chuyên xe máy điện, xe đạp điện VinFast tại Quảng Phú, Cư M'gar. Feliz Neo, Theon S, Motio có sẵn. Phục vụ toàn Đắk Lắk. Hotline: 090.350.3600" />
                <meta name="keywords" content="xe điện VinFast Đắk Lắk, xe máy điện VinFast, xe đạp điện VinFast, Feliz Neo Đắk Lắk, Theon S Đắk Lắk, Motio Đắk Lắk, đại lý VinFast Quảng Phú, xe điện Cư M'gar, PHÚ DŨNG" />
                <meta name="author" content="PHÚ DŨNG" />
                <meta property="og:title" content="PHÚ DŨNG - Xe Điện VinFast Đắk Lắk | Đại Lý Chính Hãng" />
                <meta property="og:description" content="Đại lý xe điện VinFast chính hãng #1 tại Đắk Lắk. Chuyên xe máy điện, xe đạp điện VinFast tại Quảng Phú. Feliz Neo, Theon S, Motio - Giá tốt - Bảo hành chính hãng." />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="vi_VN" />
                <meta property="og:url" content="https://vinfastphudung.vn/" />
                <meta property="og:site_name" content="PHÚ DŨNG Xe Máy" />
                <meta property="og:image" content="https://vinfastphudung.vn/og-image.png" />
                <meta property="og:image:alt" content="PHÚ DŨNG - Cửa Hàng Xe Máy & Xe Điện" />
                <meta name="twitter:image" content="https://vinfastphudung.vn/og-image.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="PHÚ DŨNG - Xe Máy Chất Lượng" />
                <meta name="twitter:description" content="Chuyên cung cấp xe máy chất lượng cao từ các thương hiệu hàng đầu" />
                <meta name="twitter:url" content="https://vinfastphudung.vn/" />
                <link rel="canonical" href="https://vinfastphudung.vn/" />
                
                {/* Product Catalog Schema - References products page without duplicating */}
                <script type="application/ld+json">
                  {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "@id": "https://vinfastphudung.vn/#homepage",
                    "name": "PHÚ DŨNG - Xe Máy Chất Lượng",
                    "description": "Cửa hàng xe máy chất lượng cao tại Đắk Lắk",
                    "url": "https://vinfastphudung.vn/",
                    "mainEntity": {
                      "@type": "ItemList",
                      "name": "Danh sách sản phẩm xe máy",
                      "description": "Bộ sưu tập xe máy từ các thương hiệu hàng đầu",
                      "url": "https://vinfastphudung.vn/products",
                      "numberOfItems": bikes.length,
                      "itemListElement": bikes.slice(0, 8).map((bike, index) => ({
                        "@type": "ListItem",
                        "position": index + 1,
                        "url": `https://vinfastphudung.vn/product/${bike.id}`,
                        "name": bike.name
                      }))
                    },
                    "hasPart": [
                      {
                        "@type": "WebPage",
                        "name": "Sản Phẩm",
                        "url": "https://vinfastphudung.vn/products",
                        "description": "Xem tất cả sản phẩm xe máy"
                      }
                    ]
                  })}
                </script>
            </Helmet>
            <main style={{ padding: 0 }}>
                <div style={{ padding: '0 20px' }}>
                    <ImageSlider />
                </div>
                
                {/* Display bikes grouped by manufacturer */}
                <section style={{ marginTop: 40 }}>
                    {Object.entries(bikesByCompany).map(([manufacturer, companyBikes]) => (
                        <BikeByCompany 
                            key={manufacturer}
                            manufacturer={manufacturer}
                            bikes={companyBikes}
                        />
                    ))}
                </section>
                
                {/* Fallback: Show all bikes if no grouping */}
                {Object.keys(bikesByCompany).length === 0 && bikes.length > 0 && (
                    <section style={{ padding: '0 20px', marginTop: 40 }}>
                        <h2 style={{ textAlign: 'center', color: '#264653', marginBottom: 20 }}>
                            Xe Máy Nổi Bật
                        </h2>
                        <div style={{ 
                            display: 'flex', 
                            gap: 20, 
                            overflowX: 'auto', 
                            padding: '10px 0',
                            justifyContent: bikes.length <= 3 ? 'center' : 'flex-start'
                        }}>
                            {bikes.map((bike) => (
                                <BikeDisplay key={bike.id} bike={bike} />
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </>
    )
}

export default Home;