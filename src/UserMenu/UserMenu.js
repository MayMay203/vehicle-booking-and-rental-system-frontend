import Image from '~/components/Image'
import styles from './UserMenu.module.scss'
import classNames from 'classnames/bind'
import { images } from '~/assets/images'
import { Link } from 'react-router-dom'
import { config } from '~/config'
import Button from '~/components/Button'

const cx = classNames.bind(styles)
function UserMenu() {
  return (
    <div className={cx('wrapper')}>
      <div className="d-flex align-items-center gap-3 mb-3">
        <Image src={images.noImage} className={cx('avatar', 'ml-0')}></Image>
        <span className='fw-medium'>Nguyễn Hà An Thư</span>
      </div>
      <span className={cx('menu')}>Cài đặt chế độ</span>
      <Link to={config.routes.account} className={cx('menu')}>Quản lý tài khoản</Link>
          <Link to={config.routes.order} className={cx('menu')}>Quản lý đơn hàng</Link>
          <Button outline className={cx('btn')}>Đăng xuất</Button>
    </div>
  )
}

export default UserMenu
