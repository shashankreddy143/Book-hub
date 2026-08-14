import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const TopRatedBookItem = props => {
  const { bookDetails } = props
  const { id, title, coverPic, authorName } = bookDetails

  return (
    <div className="top-rated-book-item-container">
      <Link to={`/books/${id}`} className="top-rated-book-link">
        <img
          src={coverPic}
          alt={title}
          className="top-rated-book-cover"
        />
        <h1 className="top-rated-book-title">{title}</h1>
        <p className="top-rated-book-author">{authorName}</p>
      </Link>
    </div>
  )
}

export default TopRatedBookItem
