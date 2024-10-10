import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'

const UserContext = createContext()

function UserProvider({ children }) {
  const [isLogin, setIsLogin] = useState(null)
  console.log(document.cookie)
  const [currentUser, setCurrentUser] = useState({})
  const [email, setEmail] = useState(null)

  const checkCookie = () => {
    const cookies = document.cookie.split('; ')
    const accessTokenExists = cookies.some((cookie) => cookie.startsWith('refresh_token='))
    setIsLogin(accessTokenExists)
  }

  useEffect(() => {
    // Kiểm tra cookie khi component được mount
    checkCookie()

    const cookieChangeHandler = () => {
      checkCookie()
    }

    window.addEventListener('cookie-change', cookieChangeHandler)

    // Dọn dẹp listener khi component unmount
    return () => {
      window.removeEventListener('cookie-change', cookieChangeHandler)
    }
  }, [])

  const saveEmail = (email) => {
    setEmail(email)
  }

  const getEmail = () => {
    return email
  }

  const toggleLogin = () => {
    setIsLogin((prev) => !prev)
  }

  const value = {
    isLogin,
    toggleLogin,
    currentUser,
    setCurrentUser,
    saveEmail,
    getEmail,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { UserContext, UserProvider }
