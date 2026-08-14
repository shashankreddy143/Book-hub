import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import endpoints from '../../endpoints'
import bookhubLogo from '../../assets/bookhub-logo.svg'
import './index.css'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 })
    navigate('/', { replace: true })
  }

  const onSubmitFailure = errorMsg => {
    setShowSubmitError(true)
    setErrorMsg(errorMsg)
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    const userDetails = { username, password }
    const url = endpoints.loginApi
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        onSubmitSuccess(data.jwt_token)
      } else {
        onSubmitFailure(data.error_msg)
      }
    } catch (e) {
      onSubmitFailure('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="login-container">
      <div className="login-responsive-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/book-hub-login-img.png"
          alt="website login"
          className="login-image-desktop"
        />
        <div className="login-form-container">
          <div className="login-logo-container">
            <img
              src={bookhubLogo}
              alt="BookHub logo"
              className="login-website-logo"
            />
          </div>
          <form className="login-form" onSubmit={onSubmitForm}>
            <div className="input-container">
              <label className="input-label" htmlFor="username">
                Username*
              </label>
              <input
                type="text"
                id="username"
                className="input-field"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter Username"
              />
            </div>
            <div className="input-container">
              <label className="input-label" htmlFor="password">
                Password*
              </label>
              <input
                type="password"
                id="password"
                className="input-field"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
