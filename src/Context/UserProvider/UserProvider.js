import PropTypes from 'prop-types'
import { createContext, useState } from 'react'

const UserContext = createContext()

function UserProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [email, setEmail] = useState(null)

  //   useEffect(() => {
  //     async function fetchApi() {
  //       const data = await getCurrentUser()
  //       if (data) {
  //         setCurrentUser(data)
  //       }
  //     }
  //     fetchApi()
  //   }, [])

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
    setCurrentUser,
    currentUser,
    saveEmail, 
    getEmail
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { UserContext, UserProvider }
