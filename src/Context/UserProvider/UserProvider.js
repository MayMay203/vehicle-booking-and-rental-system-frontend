import PropTypes from 'prop-types'
import { createContext, useEffect, useState, useCallback, useContext } from 'react'
import { refreshToken } from '~/apiServices/refreshToken'
import { checkExistCookie } from '~/utils/cookieUtils'
import { getMyAccount } from '~/apiServices/getMyAccount'
import { useDispatch } from 'react-redux'
import { generalModalNames, setGeneralModalVisible } from '~/redux/slices/generalModalSlice'

const UserContext = createContext()

function UserProvider({ children }) {
  const dispatch = useDispatch()
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [email, setEmail] = useState(null)

  // const checkLogin = async () => {
  //   if (checkExistCookie('access_token')) {
  //     setIsLogin(true)
  //     const userData = await getMyAccount()
  //     if (userData) {
  //       setCurrentUser(userData.accountInfo)
  //     }
  //   } else {
  //     const response = await refreshToken()
  //     if (response) {
  //       setIsLogin(true)
  //       const userData = await getMyAccount()
  //       if (userData) {
  //         setCurrentUser(userData.accountInfo)
  //       }
  //     } else {
  //       setIsLogin(false)
  //     }
  //   }
  // }

  const checkLoginSession = useCallback(async () => {
    // if (checkExistCookie('access_token')) return true
    // const response = await refreshToken()
    // if (!response) {
    //   dispatch(
    //     setGeneralModalVisible({
    //       modalType: 'confirm',
    //       isOpen: true,
    //       title: 'Thông báo',
    //       description: 'Phiên đăng nhập đã kết thúc. Vui lòng đăng nhập lại!',
    //       name: generalModalNames.EXPIRED_SESSION,
    //     }),
    //   )
    //   setIsLogin(false)
    //   return false
    // }
    return true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   checkLogin()
  //   setIsLoading(false)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

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
