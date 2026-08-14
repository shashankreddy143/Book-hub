import React from 'react'
import { FaGoogle, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <footer className="footer-container">
    <div className="footer-icons-container">
      <button type="button" className="footer-icon-button" aria-label="Google">
        <FaGoogle className="footer-icon" />
      </button>
      <button type="button" className="footer-icon-button" aria-label="Twitter">
        <FaTwitter className="footer-icon" />
      </button>
      <button type="button" className="footer-icon-button" aria-label="Instagram">
        <FaInstagram className="footer-icon" />
      </button>
      <button type="button" className="footer-icon-button" aria-label="Youtube">
        <FaYoutube className="footer-icon" />
      </button>
    </div>
    <p className="footer-contact-text">Contact Us</p>
  </footer>
)

export default Footer
