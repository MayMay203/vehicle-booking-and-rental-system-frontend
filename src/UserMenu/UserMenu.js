import Image from '~/components/Image'
import styles from './UserMenu.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { config } from '~/config'
import Button from '~/components/Button'
import { useUserContext } from '~/Context/UserProvider'
import { useGlobalModal } from '~/Context/GlobalModalProvider'

const cx = classNames.bind(styles)
function UserMenu() {
  const { currentUser, checkLoginSession} = useUserContext()
  const {openGlobalModal} = useGlobalModal()

  const handleLogout = async () => {
    if (await checkLoginSession()) {
      openGlobalModal('logout')
    }
  }

  return (
    <div className={cx('wrapper')}>
      <div className="d-flex align-items-center gap-3 mb-3">
        <Image src={currentUser.avatar} className={cx('avatar', 'ml-0')}></Image>
        <span className="fw-medium">{currentUser.name}</span>
      </div>
      <span className={cx('menu')}>Cài đặt chế độ</span>
      <Link to={config.routes.accountSetting} className={cx('menu')}>
        Thông tin tài khoản
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
