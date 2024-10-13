import PropTypes from 'prop-types'
import { createContext, useEffect, useState, useCallback } from 'react'
import { refreshToken } from '~/apiServices/refreshToken'

const UserContext = createContext()

function UserProvider({ children }) {
  const [isLogin, setIsLogin] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [email, setEmail] = useState(null)

  const checkLogin = useCallback(async ()=>{
      const hasCookie = Boolean(document.cookie)
      if (hasCookie) {
        setIsLogin(true)
      } else {
        const response = await refreshToken()
        setIsLogin(Boolean(response))
        if(!response){
          // alert('Phiên đăng nhập đã kết thúc. Vui lòng đăng nhập lại!')
        }
      }
  },[])

    const checkLoginSession = useCallback(async()=>{
      if(!document.cookie){
        const response =  await refreshToken();
        if(!response){
          // alert('Phiên đăng nhập đã kết thúc. Vui lòng đăng nhập lại');
          setIsLogin(false);
        }
      }
  },[])

  useEffect(() => {
    checkLogin()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = {
    isLogin,
    toggleLogin: () => setIsLogin(prev => !prev),
    currentUser,
    setCurrentUser,
    saveEmail: (email) => setEmail(email),
    getEmail: () => email,
    checkLoginSession,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { UserContext, UserProvider }
