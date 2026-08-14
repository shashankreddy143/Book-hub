import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillStarFill } from 'react-icons/bs'
import './index.css'

const SearchResultsComponent = props => {
  const { booksData } = props

  return (
    <ul className="books-list-container">
      {booksData.map(eachBook => {
        const { id, title, coverPic, authorName, rating, readStatus } = eachBook
        return (
          <li key={id} className="book-item">
            <Link to={`/books/${id}`} className="book-item-link">
              <img
                src={coverPic}
                alt={title}
                className="book-item-cover"
              />
              <div className="book-item-details">
                <h1 className="book-item-title">{title}</h1>
                <p className="book-item-author">{authorName}</p>
                <div className="book-item-rating-container">
                  <span className="rating-label">Avg Rating</span>
                  <BsFillStarFill className="star-icon" />
                  <span className="rating-value">{rating}</span>
                </div>
                <div className="book-item-status-container">
                  <span className="status-label">Status : </span>
                  <span className="status-value">{readStatus}</span>
                </div>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default SearchResultsComponent
