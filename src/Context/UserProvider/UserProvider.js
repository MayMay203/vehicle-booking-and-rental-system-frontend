import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'

const UserContext = createContext()

function UserProvider({ children }) {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin') === 'true')
  const [currentUser, setCurrentUser] = useState({})

  //   useEffect(() => {
  //     async function fetchApi() {
  //       const data = await getCurrentUser()
  //       if (data) {
  //         setCurrentUser(data)
  //       }
  //     }
  //     fetchApi()
  //   }, [])

  const toggleLogin = () => {
    setIsLogin((prev) => !prev)
  }

  const value = {
    isLogin,
    toggleLogin,
    setCurrentUser,
    currentUser,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { UserContext, UserProvider }
