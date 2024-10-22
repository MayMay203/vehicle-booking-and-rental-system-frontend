import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { loginWithGoogle } from '~/apiServices/loginWithGoogle'
import { toast } from 'react-toastify'
import { config } from '~/config'
import { useUserContext } from '~/Context/UserProvider'
import { useDispatch } from 'react-redux'
import { generalModalNames, setLoadingModalVisible } from '~/redux/slices/generalModalSlice'

function Authenticate() {
  const dispatch = useDispatch()
  const location = useLocation()
  const { setCurrentUser } = useUserContext()

  useEffect(() => {
    async function login() {
      dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: true }))
      const urlSearch = new URLSearchParams(location.search)
      const code = urlSearch.get('code')
      const data = await loginWithGoogle(code)
      if (data) {
        setCurrentUser(data.accountLogin)
      } else {
        toast.error('Đăng nhập thất bại', { autoClose: 1500, position: 'top-center' })
      }
      dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: false }))
      window.location.href = config.routes.home
    }
    login()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])
  return <></>
}

export default Authenticate
