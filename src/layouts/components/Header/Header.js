import styles from './Header.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import Button from '~/components/Button'
import { BackIcon, MenuIcon, PhoneIcon } from '~/components/Icon'
import Logo from '~/components/Logo'
import Menu from './Menu/Menu'
import MenuItem from './Menu/MenuItem'
import { useEffect, useRef, useState } from 'react'
import { useModal } from '~/Context/AuthModalProvider'

const cx = classNames.bind(styles)
function Header({ menus }) {
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const headerRef = useRef(null)
  const [lastScrollY, setLastScrollY] = useState()
  const { openModal } = useModal()

  const hanldeBack = () => {
    contentRef.current.style.transform = 'translateX(100%)'
    overlayRef.current.style.visibility = 'hidden'
    overlayRef.current.style.opacity = '0'
  }

  const hanldeShowMenu = () => {
    contentRef.current.style.transform = 'translateX(0)'
    overlayRef.current.style.visibility = 'visible'
    overlayRef.current.style.opacity = '1'
  }

  const handleScroll = () => {
    if (window.innerWidth >= 992) {
      const currentScroll = window.scrollY
      if (currentScroll > lastScrollY) {
        headerRef.current.style.transform = 'translateY(-100%)'
      } else {
        headerRef.current.style.transform = 'translateY(0)'
      }
      setLastScrollY(currentScroll)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY])

  return (
    <header className={cx('wrapper')} ref={headerRef}>
      {/* Mobile header */}
      <div className={cx('mobile-header', 'd-lg-none')}>
        <div className={cx('overlay')} ref={overlayRef} onClick={hanldeBack}></div>
        <div className={cx('content')} ref={contentRef}>
          <div className={cx('content-actions')}>
            <button className={cx('btn-back')} onClick={hanldeBack}>
              <BackIcon />
            </button>
            <Button outline className="d-sm-none" onClick={() => openModal('login')}>
              Đăng nhập
            </Button>
          </div>
          <Menu>
            {menus.map((menu, index) => (
              <MenuItem key={index} menu={menu}></MenuItem>
            ))}
          </Menu>
        </div>
      </div>

      <div className={cx('controls')}>
        <Logo className={cx('logo')} />
        <div className={cx('actions')}>
          <div className={cx('contact', 'd-none d-lg-flex')}>
            <span>Liên hệ: 0842059000</span>
            <p>
              <PhoneIcon className={cx('icon')} />
              <span>7h-19h</span>
            </p>
          </div>
          <div className={cx('actions')}>
            <Button outline className="d-none d-md-block" onClick={() => openModal('register')}>
              Đăng ký
            </Button>
            <Button outline className="d-none d-sm-block" onClick={() => openModal('login')}>
              Đăng nhập
            </Button>
            <button className={cx('btn-menu', 'd-lg-none')} onClick={hanldeShowMenu}>
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>
      <Menu className="d-none d-lg-flex">
        {menus.map((menu, index) => (
          <MenuItem key={index} menu={menu}></MenuItem>
        ))}
      </Menu>
    </header>
  )
}

Header.prototypes = {
  menus: PropTypes.array.isRequired,
}
export default Header
