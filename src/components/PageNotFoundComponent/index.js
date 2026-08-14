import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const PageNotFoundComponent = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/not-found-img.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      we are sorry, the page you requested could not be found, please go back to the homepage.
    </p>
    <Link to="/" className="go-home-link">
      <button type="button" className="go-home-button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default PageNotFoundComponent
