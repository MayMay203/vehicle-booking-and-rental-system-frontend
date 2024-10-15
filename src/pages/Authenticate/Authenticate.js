import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import styles from './Authenticate.module.scss'
import classNames from 'classnames/bind'
import { loginWithGoogle } from '~/apiServices/loginWithGoogle'
import { toast } from 'react-toastify'
import { config } from '~/config'
import { useUserContext } from '~/Context/UserProvider'

const cx = classNames.bind(styles)
function Authenticate() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const { setCurrentUser } = useUserContext()

  useEffect(() => {
    async function login() {
      const urlSearch = new URLSearchParams(location.search)
      const code = urlSearch.get('code')
      const data = await loginWithGoogle(code)
      if (data) {
        setCurrentUser(data.accountLogin)
        toast.success('Đăng nhập thành công', { autoClose: 1500, position: 'top-center' })
      } else {
        toast.error('Đăng nhập thất bại', { autoClose: 1500, position: 'top-center' })
      }
      setLoading(false)
      window.location.href = config.routes.home
    }
    login()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])
  return (
    <div className={cx('loading-container')}>
      <ClipLoader color="#d34714" loading={loading} size={70} />
    </div>
  )
}

export default Authenticate
