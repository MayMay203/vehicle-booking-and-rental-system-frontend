import Image from '~/components/Image'
import styles from './UserMenu.module.scss'
import classNames from 'classnames/bind'
import { Link, useNavigate } from 'react-router-dom'
import { config } from '~/config'
import Button from '~/components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { generalModalNames, setConfirmModalVisible } from '~/redux/slices/generalModalSlice'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { setMenu } from '~/redux/slices/menuSlice'

const cx = classNames.bind(styles)
function UserMenu() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showMode, setShowMode] = useState(false)
  const currentUser = useSelector((state) => state.user.currentUser)
  const currentRole = useSelector((state) => state.user.currentRole)
  console.log('currentRole', currentRole)

  const handleModeSetting = () => {
    setShowMode((prev) => !prev)
  }

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
      {currentUser?.roles?.length > 1 && (
        <div className={cx('menu')} onClick={handleModeSetting}>
          Cài đặt chế độ{' '}
          <FontAwesomeIcon
            className={cx('ms-1', { 'rotate-up': showMode, 'rotate-down': !showMode })}
            icon={faCaretDown}
          />
        </div>
      )}
      {showMode && (
        <div className="d-flex flex-column">
          <Button
            className={cx('mode-item', { active: true})}
            onClick={() => {
              dispatch(setMenu('userMenu'))
              navigate(config.routes.home)
            }}
          >
            Chế độ người dùng
          </Button>
          {currentUser.roles.includes(config.variables.busPartner) && (
            <Button
              className={cx('mode-item', { active: currentRole === 'BUS_PARTNER' })}
              onClick={() => {
                dispatch(setMenu('busPartnerMenu'))
                navigate(config.routes.busTrip)
              }}
            >
              Đối tác nhà xe
            </Button>
          )}
          {currentUser.roles.includes(config.variables.carRentalPartner) && (
            <Button
              className={cx('mode-item', { active: currentRole === 'CAR_RENTAL_PARTNER' })}
              onClick={() => {
                dispatch(setMenu('carRentalPartnerMenu'))
                navigate(config.routes.serviceManage)
              }}
            >
              Đối tác cho thuê xe
            </Button>
          )}
        </div>
      )}
      {!currentUser.roles?.includes('ADMIN') && (
        <Link to={config.routes.order} className={cx('menu')}>
          Đơn hàng của tôi
        </Link>
      )}
      <Link to={config.routes.accountSetting} className={cx('menu')}>
        Thông tin tài khoản
      </Link>
      <Button outline className={cx('btn')} onClick={handleLogout}>
        Đăng xuất
      </Button>
    </div>
  )
}

export default UserMenu
