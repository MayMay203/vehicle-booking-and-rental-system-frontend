import PropTypes from 'prop-types'
import { createContext, useEffect, useState, useCallback, useContext } from 'react'
import { refreshToken } from '~/apiServices/refreshToken'
import { useGlobalModal } from '../GlobalModalProvider'
import { checkExistCookie } from '~/utils/cookieUtils'
import { getMyAccount } from '~/apiServices/getMyAccount'

const UserContext = createContext()

function UserProvider({ children }) {
  const [isLogin, setIsLogin] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [email, setEmail] = useState(null)
  const { openGlobalModal } = useGlobalModal()

  const checkLogin = async () => {
    if (checkExistCookie('access_token')) {
      setIsLogin(true)
       const userData = await getMyAccount()
       if (userData) {
         setCurrentUser(userData.accountInfo)
         console.log('Vo day roi')
       }
    } else {
      const response = await refreshToken()
      if (response) {
        setIsLogin(true)
        const userData = await getMyAccount()
        if (userData) {
          setCurrentUser(userData.accountInfo)
        }
      } else {
        setIsLogin(false)
      }
    }
  }

  const checkLoginSession = useCallback(async () => {
    if (checkExistCookie('access_token')) return true
    const response = await refreshToken()
    if (!response) {
      openGlobalModal('expiredSession')
      setIsLogin(false)
      return false
    }
    return true
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
    return <></>
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UserProvider
export const useUserContext = () => useContext(UserContext)
