import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { FiMenu, FiX } from 'react-icons/fi'
import bookhubLogo from '../../assets/bookhub-logo.svg'
import './index.css'

const HeaderComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', { replace: true })
  }

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  const activePath = location.pathname

  return (
    <nav className="header-navbar">
      <div className="header-content-container">
        <Link to="/" className="header-logo-link">
          <img
            src={bookhubLogo}
            alt="BookHub logo"
            className="header-website-logo"
          />
        </Link>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className="mobile-hamburger-button"
          onClick={toggleMenu}
          aria-label="toggle navigation menu"
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Desktop Navigation Links */}
        <ul className="desktop-nav-menu">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${activePath === '/' ? 'active-nav-link' : ''}`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/shelf"
              className={`nav-link ${activePath === '/shelf' ? 'active-nav-link' : ''}`}
            >
              Bookshelves
            </Link>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className="logout-desktop-button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="mobile-nav-drawer">
          <ul className="mobile-nav-menu">
            <li className="mobile-nav-item">
              <Link
                to="/"
                className={`mobile-nav-link ${activePath === '/' ? 'active-nav-link' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link
                to="/shelf"
                className={`mobile-nav-link ${activePath === '/shelf' ? 'active-nav-link' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Bookshelves
              </Link>
            </li>
            <li className="mobile-nav-item">
              <button
                type="button"
                className="logout-mobile-button"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default HeaderComponent
