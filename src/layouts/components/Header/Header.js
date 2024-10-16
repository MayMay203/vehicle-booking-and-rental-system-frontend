import styles from './Header.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import Button from '~/components/Button'
import { BackIcon, MenuIcon, PhoneIcon } from '~/components/Icon'
import Logo from '~/components/Logo'
import Menu from '../../../components/Menu/Menu'
import MenuItem from '../../../components/Menu/MenuItem'
import {useEffect, useRef, useState } from 'react'
import { useAuthModal } from '~/Context/AuthModalProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faMessage } from '@fortawesome/free-regular-svg-icons'
import Image from '~/components/Image'
import Tippy from '@tippyjs/react/headless'
import PopperWrapper from '~/components/PopperWrapper'
import UserMenu from '~/UserMenu'
import { config } from '~/config'
import { useUserContext } from '~/Context/UserProvider'
import ModalChat from '~/components/ModalChat'

const cx = classNames.bind(styles)
function Header({ menus }) {
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const headerRef = useRef(null)
  const [lastScrollY, setLastScrollY] = useState()
  const { openAuthModal } = useAuthModal()
  const { isLogin, currentUser } = useUserContext();
  const messageButtonRef = useRef(null)
  const [isModalChatVisible, setIsModalChatVisible] = useState(true)
  const [modalPosition, setModalPosition] = useState({ top: 60, left: 0 })

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
  const handleShowMessage = () => {
    if (messageButtonRef.current) {
      const rect = messageButtonRef.current.getBoundingClientRect()
      setModalPosition({ top: rect.bottom, left: rect.left})
    }
    setIsModalChatVisible((prev) => !prev) // Toggle modal
  }
  const handleCloseMessage = () => {
    setIsModalChatVisible(false);
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
            {!isLogin ? (
              <Button outline className="d-sm-none" onClick={() => openAuthModal('login')}>
                Đăng nhập
              </Button>
            ) : (
              <div className={cx('actions')}>
                <button className={cx('btn-action', 'd-md-none')}>
                  <FontAwesomeIcon icon={faMessage} />
                </button>
                <button className={cx('btn-action', 'd-md-none')}>
                  <FontAwesomeIcon icon={faBell} />
                </button>
                <Tippy
                  delay={[100, 500]}
                  interactive
                  placement="bottom"
                  render={(attrs) => (
                    <div className={cx('menu')} {...attrs}>
                      <PopperWrapper>
                        <UserMenu></UserMenu>
                      </PopperWrapper>
                    </div>
                  )}
                >
                  <button>
                    <Image src={currentUser?.avatar} alt="avatar" className={cx('avatar', 'd-md-none')}></Image>
                  </button>
                </Tippy>
              </div>
            )}
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
          {!isLogin && (
            <div className={cx('actions')}>
              <Button outline className="d-none d-md-block" onClick={() => openAuthModal('register')}>
                Đăng ký
              </Button>
              <Button outline className="d-none d-sm-block" onClick={() => openAuthModal('login')}>
                Đăng nhập
              </Button>
              <button className={cx('btn-menu', 'd-lg-none')} onClick={hanldeShowMenu}>
                <MenuIcon />
              </button>
            </div>
          )}
          {isLogin && (
            <div className={cx('actions')}>
              <button
                to={config.routes.message}
                className={cx('btn-action', 'd-none', 'd-md-block')}
                onClick={handleShowMessage}
              >
                <FontAwesomeIcon icon={faMessage} />
              </button>
              {isModalChatVisible && (
                <ModalChat
                  style={{
                    position: 'absolute',
                    top: `${modalPosition.top}px`,
                    left: `${modalPosition.left}px`,
                    zIndex: 1000,
                  }}
                  handleClose={handleCloseMessage}
                />
              )}

              <button className={cx('btn-action', 'd-none', 'd-md-block')}>
                <FontAwesomeIcon icon={faBell} />
              </button>
             <div>
                <Tippy
                  offset={[-70, 10]}
                  delay={[100, 500]}
                  interactive
                  placement="bottom"
                  render={(attrs) => (
                    <div className={cx('menu')} {...attrs}>
                      <PopperWrapper>
                        <UserMenu></UserMenu>
                      </PopperWrapper>
                    </div>
                  )}
                >
                  <button>
                    <Image src={currentUser?.avatar} alt="avatar" className={cx('avatar', 'd-none', 'd-md-block')}></Image>
                  </button>
                </Tippy>
             </div>
              <button className={cx('btn-menu', 'd-lg-none')} onClick={hanldeShowMenu}>
                <MenuIcon />
              </button>
            </div>
          )}
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
