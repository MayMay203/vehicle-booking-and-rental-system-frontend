import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { loginWithGoogle } from '~/apiServices/loginWithGoogle'
import { toast } from 'react-toastify'
import { config } from '~/config'
import { useDispatch } from 'react-redux'
import { generalModalNames, setLoadingModalVisible } from '~/redux/slices/generalModalSlice'

function Authenticate() {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    async function login() {
      dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: true }))
      const urlSearch = new URLSearchParams(location.search)
      const code = urlSearch.get('code')
      if (code) {
        const data = await loginWithGoogle(code)
        if (data) {
          console.log(data)
          localStorage.setItem('accessToken', data.access_token)
          dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: false }))
        } else {
          toast.error('Đăng nhập thất bại', { autoClose: 1500, position: 'top-center' })
          dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: false }))
        }
        window.location.href = config.routes.home
      }
      else {
        dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: false }))
        navigate('/')
      }
    }
    login()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])
  return <></>
}

export default Authenticate
