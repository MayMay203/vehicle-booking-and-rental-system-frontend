import Image from '~/components/Image'
import styles from './UserMenu.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { config } from '~/config'
import Button from '~/components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { generalModalNames, setConfirmModalVisible } from '~/redux/slices/generalModalSlice'
import { checkLoginSession } from '~/redux/slices/userSlice'

const cx = classNames.bind(styles)
function UserMenu() {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user.currentUser)

  const handleLogout = async () => {
    if (dispatch(checkLoginSession())) {
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
      {!currentUser.roles.includes('ADMIN') && <span className={cx('menu')}>Cài đặt chế độ</span>}
      <Link to={config.routes.accountSetting} className={cx('menu')}>
        Thông tin tài khoản
      </Link>
      {!currentUser.roles?.includes('ADMIN') && (
        <Link to={config.routes.manageAccounts} className={cx('menu')}>
          Quản lý tài khoản
        </Link>
      )}
      <Button outline className={cx('btn')} onClick={handleLogout}>
        Đăng xuất
      </Button>
    </div>
  )
}

export default UserMenu
