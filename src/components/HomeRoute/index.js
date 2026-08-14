import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import HeaderComponent from '../HeaderComponent'
import Footer from '../Footer'
import TopRatedBookItem from '../TopRatedBookItem'
import SomethingWentWrongComponent from '../SomethingWentWrongComponent'
import endpoints from '../../endpoints'
import statusCodes from '../../constants/apiStatusCodesConstants'
import './index.css'

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const HomeRoute = () => {
  const [apiStatus, setApiStatus] = useState(statusCodes.initialStatusCode)
  const [topRatedBooks, setTopRatedBooks] = useState([])
  const navigate = useNavigate()

  const getTopRatedBooks = async () => {
    setApiStatus(statusCodes.inProgressStatusCode)
    const jwtToken = Cookies.get('jwt_token')
    const url = endpoints.topRatedBooksApi
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
        const formattedBooks = data.books.map(eachBook => ({
          id: eachBook.id,
          authorName: eachBook.author_name,
          coverPic: eachBook.cover_pic,
          title: eachBook.title,
        }))
        setTopRatedBooks(formattedBooks)
        setApiStatus(statusCodes.successStatusCode)
      } else {
        setApiStatus(statusCodes.failureStatusCode)
      }
    } catch (e) {
      setApiStatus(statusCodes.failureStatusCode)
    }
  }

  useEffect(() => {
    getTopRatedBooks()
  }, [])

  const onClickFindBooks = () => {
    navigate('/shelf')
  }

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <div className="spinner" />
    </div>
  )

  const renderFailureView = () => (
    <SomethingWentWrongComponent onClickRetry={getTopRatedBooks} />
  )

  const renderSuccessView = () => (
    <div className="slick-container">
      <Slider {...sliderSettings}>
        {topRatedBooks.map(eachBook => (
          <TopRatedBookItem key={eachBook.id} bookDetails={eachBook} />
        ))}
      </Slider>
    </div>
  )

  const renderTopRatedBooksSection = () => {
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
    <div className="home-route-container">
      <HeaderComponent />
      <div className="home-body-container">
        <div className="home-hero-section">
          <h1 className="home-hero-heading">Find Your Next Favorite Books?</h1>
          <p className="home-hero-description">
            You are in the right place. Tell us what titles or genres you've enjoyed in the past, and we'll give you surprisingly insightful recommendations.
          </p>
          <button
            type="button"
            className="find-books-mobile-button"
            onClick={onClickFindBooks}
          >
            Find Books
          </button>
        </div>

        <div className="top-rated-section">
          <div className="top-rated-header">
            <h1 className="top-rated-heading">Top Rated Books</h1>
            <button
              type="button"
              className="find-books-desktop-button"
              onClick={onClickFindBooks}
            >
              Find Books
            </button>
          </div>
          {renderTopRatedBooksSection()}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HomeRoute
