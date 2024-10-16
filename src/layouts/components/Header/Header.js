import styles from './Header.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import Button from '~/components/Button'
import { BackIcon, MenuIcon, PhoneIcon } from '~/components/Icon'
import Logo from '~/components/Logo'
import Menu from '../../../components/Menu/Menu'
import MenuItem from '../../../components/Menu/MenuItem'
import { useEffect, useRef, useState } from 'react'
import { useAuthModal } from '~/Context/AuthModalProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faComment } from '@fortawesome/free-regular-svg-icons'
import {faMessage} from '@fortawesome/free-regular-svg-icons'
import Image from '~/components/Image'
import Tippy from '@tippyjs/react/headless'
import PopperWrapper from '~/components/PopperWrapper'
import UserMenu from '~/UserMenu'
import { useUserContext } from '~/Context/UserProvider'
import Notification from '~/components/Notification'
import { AuthCodeModal, ForgetPasswordModal, LoginModal, PersonalModal, RegisterModal } from '~/Modals/AuthModal'
import { LogoutModal, SessionExpiredModal } from '~/Modals/GlobalModal'
import ModalChat from '~/components/ModalChat'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)
function Header({ menus }) {
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const { openAuthModal } = useAuthModal()
  const { isLogin, currentUser } = useUserContext()
  const [isShowMenu, setIsShowMenu] = useState(false)
  const [isShowNoti, setIsShowNoti] = useState(false)
  const [isShowMessage, setIsShowMessage] = useState(false)
  const [isSmall, setIsSmall] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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

  const handleCloseMessage = () =>{
    setIsShowMessage(false);
  }

  return (
    <header className={cx('wrapper')}>
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
                {isSmall && (
                  <Tippy
                    offset={[0, 15]}
                    visible={isShowMessage}
                    onClickOutside={() => setIsShowMessage(false)}
                    interactive
                    placement="bottom"
                    render={(attrs) => (
                      <div className={cx('menu')} {...attrs}>
                        <PopperWrapper>
                          <ModalChat handleClose={handleCloseMessage} />
                        </PopperWrapper>
                      </div>
                    )}
                  >
                    <button
                      className={cx('btn-action', 'd-md-none')}
                      onClick={() => {
                        setIsShowMessage((prev) => !prev)
                      }}
                    >
                      <FontAwesomeIcon icon={faMessage} />
                    </button>
                  </Tippy>
                )}
                {isSmall && (
                  <Tippy
                    offset={[0, 15]}
                    visible={isShowNoti}
                    interactive
                    placement="bottom"
                    render={(attrs) => (
                      <div className={cx('menu')} {...attrs}>
                        <PopperWrapper>
                          <Notification />
                        </PopperWrapper>
                      </div>
                    )}
                  >
                    <button
                      className={cx('btn-action')}
                      onClick={() => {
                        setIsShowNoti((prev) => !prev)
                      }}
                    >
                      <FontAwesomeIcon icon={faBell} />
                    </button>
                  </Tippy>
                )}
                {isSmall && (
                  <Tippy
                    style={{ display: 'none' }}
                    visible={isShowMenu}
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
                    <button onClick={() => setIsShowMenu((prev) => !prev)}>
                      <Image src={currentUser?.avatar} alt="avatar" className={cx('avatar')}></Image>
                    </button>
                  </Tippy>
                )}
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
              {!isSmall && (
                <Tippy
                  offset={[0, 15]}
                  visible={isShowMessage && !window.location.href.includes('/message')}
                  onClickOutside={() => setIsShowMessage(false)}
                  interactive
                  placement="bottom"
                  render={(attrs) => (
                    <div className={cx('menu')} {...attrs}>
                      <PopperWrapper>
                        <ModalChat handleClose={handleCloseMessage} />
                      </PopperWrapper>
                    </div>
                  )}
                >
                  <button
                    onClick={() => setIsShowMessage((prev) => !prev)}
                    className={cx('btn-action', 'd-none', 'd-md-block')}
                  >
                    {!window.location.href.includes('/message') ? (
                      <FontAwesomeIcon icon={faComment} />
                    ) : (
                      <FontAwesomeIcon icon={faCommentDots} />
                    )}
                  </button>
                </Tippy>
              )}
              <div>
                {!isSmall && (
                  <Tippy
                    offset={[0, 15]}
                    visible={isShowNoti}
                    onClickOutside={() => setIsShowNoti(false)}
                    interactive
                    placement="bottom"
                    render={(attrs) => (
                      <div className={cx('menu')} {...attrs}>
                        <PopperWrapper>
                          <Notification />
                        </PopperWrapper>
                      </div>
                    )}
                  >
                    <button
                      className={cx('btn-action', 'd-none', 'd-md-block')}
                      onClick={() => setIsShowNoti((prev) => !prev)}
                    >
                      <FontAwesomeIcon icon={faBell} />
                    </button>
                  </Tippy>
                )}
              </div>
              <div>
                {!isSmall && (
                  <Tippy
                    className="d-none d-md-block"
                    visible={isShowMenu}
                    interactive
                    placement="bottom"
                    onClickOutside={() => setIsShowMenu(false)}
                    render={(attrs) => (
                      <div className={cx('menu')} {...attrs}>
                        <PopperWrapper>
                          <UserMenu></UserMenu>
                        </PopperWrapper>
                      </div>
                    )}
                  >
                    <button onClick={() => setIsShowMenu((prev) => !prev)}>
                      <Image
                        src={currentUser?.avatar}
                        alt="avatar"
                        className={cx('avatar', 'd-none', 'd-md-block')}
                      ></Image>
                    </button>
                  </Tippy>
                )}
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
      <LoginModal />
      <RegisterModal />
      <AuthCodeModal />
      <PersonalModal />
      <ForgetPasswordModal />
      <LogoutModal />
      <SessionExpiredModal />
    </header>
  )
}

Header.prototypes = {
  menus: PropTypes.array.isRequired,
}
export default Header
