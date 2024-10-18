import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { loginWithGoogle } from '~/apiServices/loginWithGoogle'
import { toast } from 'react-toastify'
import { config } from '~/config'
import { useUserContext } from '~/Context/UserProvider'
import { useGlobalModal } from '~/Context/GlobalModalProvider'
import Spinner from '~/components/Spinner'

function Authenticate() {
  const location = useLocation()
  const { setCurrentUser } = useUserContext()
  const { openGlobalModal, closeGlobalModal } = useGlobalModal()

  useEffect(() => {
    async function login() {
      openGlobalModal('loading')
      const urlSearch = new URLSearchParams(location.search)
      const code = urlSearch.get('code')
      const data = await loginWithGoogle(code)
      if (data) {
        setCurrentUser(data.accountLogin)
      } else {
        toast.error('Đăng nhập thất bại', { autoClose: 1500, position: 'top-center' })
      }
      closeGlobalModal('loading')
      window.location.href = config.routes.home
    }
    login()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])
  return (
    <>
      <Spinner />
    </>
  )
}

export default Authenticate
