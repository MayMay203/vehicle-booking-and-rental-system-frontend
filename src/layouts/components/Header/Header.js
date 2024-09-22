import styles from './Header.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import Button from '~/components/Button'
import { PhoneIcon } from '~/components/Icon'
import Logo from '~/components/Logo'
import Menu from './Menu/Menu'
import MenuItem from './Menu/MenuItem'

const cx = classNames.bind(styles)
function Header({ menus }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('controls')}>
        <Logo />
        <div className={cx('actions')}>
          <div className={cx('contact')}>
            <span>Liên hệ: 0842059000</span>
            <p>
              <PhoneIcon className={cx('icon')} />
              <span>7h-19h</span>
            </p>
          </div>
          <div className={cx('actions')}>
            <Button outline>Đăng ký</Button>
            <Button outline>Đăng nhập</Button>
          </div>
        </div>
      </div>
      <Menu>
        {menus.map((menu, index) => (
          <MenuItem key={index} menu={menu}></MenuItem>
        ))}
      </Menu>
    </div>
  )
}

Header.prototypes = {
  menus: PropTypes.array.isRequired,
}
export default Header
