import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import {Routes, Route, Link} from "react-router-dom"
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import AddressContact from './pages/AddressContact.jsx'
import Faq from './pages/Faq.jsx'
import ProductDetail from './pages/ProductDetail.jsx'

function App() {
	return (
		<>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path='/products' element={<Products />} />
				<Route path='/product/:bikeId' element={<ProductDetail />} />
				<Route path='/lienlac' element={<AddressContact />} />
				<Route path='/faq' element={<Faq />} />
			</Routes>
			<Footer />
		</>
	)
}

export default App
