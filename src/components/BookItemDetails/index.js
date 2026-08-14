import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { BsFillStarFill } from 'react-icons/bs'
import HeaderComponent from '../HeaderComponent'
import Footer from '../Footer'
import SomethingWentWrongComponent from '../SomethingWentWrongComponent'
import endpoints from '../../endpoints'
import statusCodes from '../../constants/apiStatusCodesConstants'
import './index.css'

const BookItemDetails = () => {
  const [apiStatus, setApiStatus] = useState(statusCodes.initialStatusCode)
  const [bookDetails, setBookDetails] = useState({})
  const { id } = useParams()

  const getBookDetails = async () => {
    setApiStatus(statusCodes.inProgressStatusCode)
    const jwtToken = Cookies.get('jwt_token')
    const url = `${endpoints.bookItemDetailsApi}/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const b = data.book_details
        const formattedDetails = {
          id: b.id,
          authorName: b.author_name,
          coverPic: b.cover_pic,
          aboutBook: b.about_book,
          rating: b.rating,
          readStatus: b.read_status,
          title: b.title,
          aboutAuthor: b.about_author,
        }
        setBookDetails(formattedDetails)
        setApiStatus(statusCodes.successStatusCode)
      } else {
        setApiStatus(statusCodes.failureStatusCode)
      }
    } catch (e) {
      setApiStatus(statusCodes.failureStatusCode)
    }
  }

  useEffect(() => {
    getBookDetails()
  }, [id])

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <div className="spinner" />
    </div>
  )

  const renderFailureView = () => (
    <SomethingWentWrongComponent onClickRetry={getBookDetails} />
  )

  const renderSuccessView = () => {
    const {
      title,
      coverPic,
      authorName,
      rating,
      readStatus,
      aboutAuthor,
      aboutBook,
    } = bookDetails

    return (
      <div className="book-details-card">
        <div className="book-details-top-section">
          <img
            src={coverPic}
            alt={title}
            className="book-details-cover"
          />
          <div className="book-details-info">
            <h1 className="book-details-title">{title}</h1>
            <p className="book-details-author">{authorName}</p>
            <div className="book-details-rating-container">
              <span className="details-rating-label">Avg Rating</span>
              <BsFillStarFill className="details-star-icon" />
              <span className="details-rating-value">{rating}</span>
            </div>
            <div className="book-details-status-container">
              <span className="details-status-label">Status : </span>
              <span className="details-status-value">{readStatus}</span>
            </div>
          </div>
        </div>

        <hr className="details-divider" />

        <div className="book-details-section">
          <h1 className="section-heading">About Author</h1>
          <p className="section-description">{aboutAuthor}</p>
        </div>

        <div className="book-details-section">
          <h1 className="section-heading">About Book</h1>
          <p className="section-description">{aboutBook}</p>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (apiStatus) {
      case statusCodes.inProgressStatusCode:
        return renderLoader()
      case statusCodes.successStatusCode:
        return renderSuccessView()
      case statusCodes.failureStatusCode:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <div className="book-details-route-container">
      <HeaderComponent />
      <div className="book-details-body-container">
        {renderContent()}
      </div>
      <Footer />
    </div>
  )
}

export default BookItemDetails
