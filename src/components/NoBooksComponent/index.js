import React from 'react'
import './index.css'

const NoBooksComponent = props => {
  const { searchText } = props

  return (
    <div className="no-books-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-books-view.png"
        alt="no books"
        className="no-books-image"
      />
      <p className="no-books-description">
        Your search for "{searchText}" did not find any matches. Please try again.
      </p>
    </div>
  )
}

export default NoBooksComponent
