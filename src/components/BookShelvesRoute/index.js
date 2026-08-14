import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { BsSearch } from 'react-icons/bs'
import HeaderComponent from '../HeaderComponent'
import Footer from '../Footer'
import SearchResultsComponent from '../SearchResultsComponent'
import NoBooksComponent from '../NoBooksComponent'
import SomethingWentWrongComponent from '../SomethingWentWrongComponent'
import endpoints from '../../endpoints'
import statusCodes from '../../constants/apiStatusCodesConstants'
import './index.css'

const bookshelvesList = [
  {
    id: 'ALL',
    value: 'ALL',
    label: 'All',
  },
  {
    id: 'READ',
    value: 'READ',
    label: 'Read',
  },
  {
    id: 'CURRENTLY_READING',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: 'WANT_TO_READ',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const BookShelvesRoute = () => {
  const [activeShelf, setActiveShelf] = useState(bookshelvesList[0].id)
  const [activeShelfLabel, setActiveShelfLabel] = useState(bookshelvesList[0].label)
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [apiStatus, setApiStatus] = useState(statusCodes.initialStatusCode)
  const [booksData, setBooksData] = useState([])

  const getBooks = async (shelf = activeShelf, searchText = search) => {
    setApiStatus(statusCodes.inProgressStatusCode)
    const jwtToken = Cookies.get('jwt_token')
    const url = `${endpoints.booksShelfApi}?shelf=${shelf}&search=${searchText}`
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
          title: eachBook.title,
          readStatus: eachBook.read_status,
          rating: eachBook.rating,
          authorName: eachBook.author_name,
          coverPic: eachBook.cover_pic,
        }))
        setBooksData(formattedBooks)
        setApiStatus(statusCodes.successStatusCode)
      } else {
        setApiStatus(statusCodes.failureStatusCode)
      }
    } catch (e) {
      setApiStatus(statusCodes.failureStatusCode)
    }
  }

  useEffect(() => {
    getBooks(activeShelf, search)
  }, [activeShelf, search])

  const onClickShelfItem = shelfItem => {
    setActiveShelf(shelfItem.id)
    setActiveShelfLabel(shelfItem.label)
  }

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const onClickSearchButton = () => {
    setSearch(searchInput)
  }

  const onKeyDownSearchInput = event => {
    if (event.key === 'Enter') {
      setSearch(searchInput)
    }
  }

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <div className="spinner" />
    </div>
  )

  const renderFailureView = () => (
    <SomethingWentWrongComponent onClickRetry={() => getBooks(activeShelf, search)} />
  )

  const renderSuccessView = () => {
    if (booksData.length === 0) {
      return <NoBooksComponent searchText={search} />
    }
    return <SearchResultsComponent booksData={booksData} />
  }

  const renderBooksContent = () => {
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
    <div className="bookshelves-route-container">
      <HeaderComponent />
      <div className="bookshelves-body-container">
        {/* Bookshelves Filter Menu */}
        <div className="bookshelves-filter-section">
          <h1 className="bookshelves-filter-heading">Bookshelves</h1>
          <ul className="bookshelves-list">
            {bookshelvesList.map(eachShelf => {
              const isActive = eachShelf.id === activeShelf
              return (
                <li key={eachShelf.id} className="bookshelf-item">
                  <button
                    type="button"
                    className={`bookshelf-button ${isActive ? 'active-bookshelf-button' : ''}`}
                    onClick={() => onClickShelfItem(eachShelf)}
                  >
                    {eachShelf.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Main Books Content Area */}
        <div className="books-main-section">
          <div className="books-main-header">
            <h1 className="books-heading">{activeShelfLabel} Books</h1>
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchInput}
                onChange={onChangeSearchInput}
                onKeyDown={onKeyDownSearchInput}
              />
              <button
                type="button"
                className="search-button"
                data-testid="searchButton"
                onClick={onClickSearchButton}
                aria-label="search button"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
          </div>
          {renderBooksContent()}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default BookShelvesRoute
