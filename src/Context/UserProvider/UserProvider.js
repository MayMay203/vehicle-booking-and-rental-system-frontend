import PropTypes from 'prop-types'
import { createContext, useEffect, useState, useCallback, useContext } from 'react'
import { refreshToken } from '~/apiServices/refreshToken'
import { useGlobalModal } from '../GlobalModalProvider'

const UserContext = createContext()

function UserProvider({ children }) {
  const [isLogin, setIsLogin] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState({})
  const [email, setEmail] = useState(null)
  const { openGlobalModal } = useGlobalModal()

  const checkLogin = useCallback(async () => {
    const hasCookie = Boolean(document.cookie)
    if (hasCookie) {
      setIsLogin(true)
    } else {
      const response = await refreshToken()
      if (response) {
        setIsLogin(true)
      } else {
        setIsLogin(false)
        // openGlobalModal('expiredSession')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkLoginSession = useCallback(async () => {
    if (document.cookie) return true;
    const response = await refreshToken()
    if (!response) {
      openGlobalModal('expiredSession')
      setIsLogin(false)
      return false;
    }
    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    checkLogin()
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = {
    isLogin,
    toggleLogin: () => setIsLogin((prev) => !prev),
    currentUser,
    setCurrentUser,
    saveEmail: (email) => setEmail(email),
    getEmail: () => email,
    checkLoginSession,
  }

  if (isLoading) {
    return <div>Loading...</div> //Hiển thị spinner
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UserProvider
export const useUserContext = () => useContext(UserContext)
