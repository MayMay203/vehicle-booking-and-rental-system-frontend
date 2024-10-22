import Image from '~/components/Image'
import styles from './UserMenu.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { config } from '~/config'
import Button from '~/components/Button'
import { useUserContext } from '~/Context/UserProvider'
import { useDispatch } from 'react-redux'
import { generalModalNames, setConfirmModalVisible } from '~/redux/slices/generalModalSlice'

const cx = classNames.bind(styles)
function UserMenu() {
  const dispatch = useDispatch()

  const { currentUser, checkLoginSession } = useUserContext()

  const handleLogout = async () => {
    if (await checkLoginSession()) {
      dispatch(
        setConfirmModalVisible({
          modalType: 'confirm',
          isOpen: true,
          title: 'Xác nhận đăng xuất',
          description: 'Bạn chắc chắn muốn đăng xuất tài khoản?',
          name: generalModalNames.LOGOUT,
        }),
      )
    }
  }

  return (
    <div className={cx('wrapper')}>
      <div className="d-flex align-items-center gap-3 mb-3">
        <Image src={currentUser?.avatar} className={cx('avatar', 'ml-0')}></Image>
        <span className="fw-medium">{currentUser?.name}</span>
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
