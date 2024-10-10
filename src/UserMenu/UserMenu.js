import Image from '~/components/Image'
import styles from './UserMenu.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { config } from '~/config'
import Button from '~/components/Button'
import { useContext } from 'react'
import { UserContext } from '~/Context/UserProvider'
import { toast } from 'react-toastify'
import { logout } from '~/apiServices/logout'

const cx = classNames.bind(styles)
function UserMenu() {
  const { currentUser, toggleLogin } = useContext(UserContext)

  const handleLogout = async () => {
    try {
      await logout()
      // document.cookie = 'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
      toggleLogin()
    } catch (message) {
      toast.error(String(message))
    }
  }

  return (
    <div className={cx('wrapper')}>
      <div className="d-flex align-items-center gap-3 mb-3">
        <Image src={currentUser.avatar} className={cx('avatar', 'ml-0')}></Image>
        <span className="fw-medium">{currentUser.name}</span>
      </div>
      <span className={cx('menu')}>Cài đặt chế độ</span>
      <Link to={config.routes.account} className={cx('menu')}>
        Quản lý tài khoản
      </Link>
      <Link to={config.routes.order} className={cx('menu')}>
        Quản lý đơn hàng
      </Link>
      <Button outline className={cx('btn')} onClick={handleLogout}>
        Đăng xuất
      </Button>
    </div>
  )
}

export default UserMenu
