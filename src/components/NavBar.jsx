import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
    const [open, setOpen] = useState(false)
    const menuRef = useRef(null)

    useEffect(() => {
        function onDocClick(e) {
        if (open && menuRef.current && !menuRef.current.contains(e.target)) {
            setOpen(false)
        }
        }
        document.addEventListener('mousedown', onDocClick)
        return () => document.removeEventListener('mousedown', onDocClick)
    }, [open])

  return (
    <nav className="nav" ref={menuRef}>
        <div className="nav__left"><Link to="/" className="nav__brand">PHÚ DŨNG</Link></div>
        <div className="nav__middle">
            <Link to="/" className="nav__link">Trang Chủ</Link>
            <Link to="/products" className="nav__link">Sản Phẩm</Link>
            <Link to="/lienlac" className="nav__link">Địa chỉ và liên hệ</Link>
        </div>
        <div className="nav__right"><span className="nav__phone">0903 503 600</span></div>

      {/* mobile toggle */}
        <button
            className="nav__toggle"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
            >
            <span className="nav__hamburger" aria-hidden="true">☰</span>
            <span className="sr-only">Menu</span>
        </button>

        <div id="mobile-menu" className={`nav__mobileMenu ${open ? 'is-open' : ''}`}>
            <Link to="/" className="nav__link" onClick={() => setOpen(false)}>Trang Chủ</Link>
            <Link to="/products" className="nav__link" onClick={() => setOpen(false)}>Sản Phẩm</Link>
            <Link to="/lienlac" className="nav__link" onClick={() => setOpen(false)}>Địa chỉ và liên hệ</Link>
            <div className="nav__mobilePhone"><span className="nav__phone">0903 503 600</span></div>
        </div>
    </nav>
    )
}

export default NavBar
