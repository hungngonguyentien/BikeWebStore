import ImageSlider from '../components/ImageSlider'
import BikeDisplay from '../components/BikeDisplay'
import BikeByCompany from '../components/BikeByCompany'
import { useState, useEffect } from 'react'
import { fetchBikesFromSheets } from '../utils/googleSheets'

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