import React from 'react'
import './index.css'

const SomethingWentWrongComponent = props => {
  const { onClickRetry } = props

  return (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/same-what-went-wrong-img.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-heading">Something went wrong. Please try again</p>
      <button
        type="button"
        className="retry-button"
        onClick={onClickRetry}
      >
        Try Again
      </button>
    </div>
  )
}

export default SomethingWentWrongComponent
