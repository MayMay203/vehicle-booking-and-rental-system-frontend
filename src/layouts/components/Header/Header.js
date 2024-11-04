import styles from './Header.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import Button from '~/components/Button'
import { BackIcon, MenuIcon, PhoneIcon } from '~/components/Icon'
import Logo from '~/components/Logo'
import Menu from '../../../components/Menu/Menu'
import MenuItem from '../../../components/Menu/MenuItem'
import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faComment } from '@fortawesome/free-regular-svg-icons'
import { faMessage } from '@fortawesome/free-regular-svg-icons'
import Image from '~/components/Image'
import Tippy from '@tippyjs/react/headless'
import PopperWrapper from '~/components/PopperWrapper'
import UserMenu from '~/UserMenu'
import Notification from '~/components/Notification'
import ModalChat from '~/components/ModalChat'
import { faCaretDown, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { modalNames, setAuthModalVisible } from '~/redux/slices/authModalSlice'
import { NavLink } from 'react-router-dom'
import { config } from '~/config'

const cx = classNames.bind(styles)
function Header({ menus }) {
  console.log('re-render header')
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const { isLogin, currentUser, loading } = useSelector((state) => state.user)
  const [isShowMenu, setIsShowMenu] = useState(false)
  const [isShowNoti, setIsShowNoti] = useState(false)
  const [isShowMessage, setIsShowMessage] = useState(false)
  const [isShowDetailPartner, setShowDetailPartner] = useState(false)
  const [isSmall, setIsSmall] = useState(window.innerWidth < 768)

  const dispatch = useDispatch()

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

  const handleCloseMessage = () => {
    setIsShowMessage(false)
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
              <Button
                outline
                className="d-sm-none"
                onClick={() => dispatch(setAuthModalVisible({ modalName: modalNames.LOGIN, isVisible: true }))}
              >
                Đăng nhập
              </Button>
            ) : (
              <div className={cx('actions')}>
                {isSmall && (
                  <div>
                    <Tippy
                      offset={[0, 15]}
                      visible={isShowMessage && !window.location.href.includes('/message')}
                      onClickOutside={() => setIsShowMessage(false)}
                      interactive
                      placement="bottom"
                      render={(attrs) => (
                        <div {...attrs}>
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
                  </div>
                )}
                {isSmall && (
                  <div>
                    <Tippy
                      offset={[0, 15]}
                      visible={isShowNoti}
                      interactive
                      placement="bottom"
                      render={(attrs) => (
                        <div {...attrs}>
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
                  </div>
                )}
                {isSmall && (
                  <div>
                    <Tippy
                      visible={isShowMenu}
                      delay={[100, 500]}
                      interactive
                      placement="bottom"
                      render={(attrs) => (
                        <div {...attrs}>
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
                  </div>
                )}
              </div>
            )}
          </div>
          <Menu>
            {menus.map((menu, index) =>
              menu.content.toLowerCase().includes('đối tác') ? (
                <>
                  <button className={cx('drop-down')} onClick={() => setShowDetailPartner((prev) => !prev)}>
                    {currentUser.roles?.includes('ADMIN') ? 'Đối tác' : 'Trở thành đối tác'}
                    <FontAwesomeIcon icon={faCaretDown} />
                  </button>
                  <div className={cx('d-flex', 'flex-column', { hidden: !isShowDetailPartner })}>
                    <div className={cx('wrap-link')}>
                      <NavLink
                        className={cx('link')}
                        to={`${
                          currentUser.roles?.includes('ADMIN') ? config.routes.managePartners : config.routes.partner
                        }?type=${config.variables.busPartner}`}
                        onClick={() => setShowDetailPartner(false)}
                      >
                        Đối tác nhà xe
                      </NavLink>
                    </div>
                    <div className={cx('wrap-link')}>
                      <NavLink
                        className={cx('link')}
                        to={`${
                          currentUser.roles?.includes('ADMIN') ? config.routes.managePartners : config.routes.partner
                        }?type=${config.variables.carRentalPartner}`}
                        onClick={() => setShowDetailPartner(false)}
                      >
                        Đối tác cho thuê xe
                      </NavLink>
                    </div>
                    <div className={cx('wrap-link')}>
                      <NavLink
                        className={cx('link')}
                        to={`${
                          currentUser.roles?.includes('ADMIN')
                            ? config.routes.managePartners
                            : config.routes.partner
                        }?type=${config.variables.driverPartner}`}
                        onClick={() => setShowDetailPartner(false)}
                      >
                        Đối tác tài xế
                      </NavLink>
                    </div>
                  </div>
                </>
              ) : (
                <MenuItem key={index} menu={menu}></MenuItem>
              ),
            )}
          </Menu>
        </div>
      </div>

      <div className={cx('controls')}>
        <Logo className={cx('logo')} />
        <div className={cx('actions')}>
          {!loading && (
            <div className={cx('contact', 'd-none d-lg-flex')}>
              <span>Liên hệ: 0842059000</span>
              <p>
                <PhoneIcon className={cx('icon')} />
                <span>7h-19h</span>
              </p>
            </div>
          )}
          {!isLogin && !loading && (
            <div className={cx('actions')}>
              <Button
                outline
                className="d-none d-md-block"
                onClick={() => dispatch(setAuthModalVisible({ modalName: modalNames.REGISTER, isVisible: true }))}
              >
                Đăng ký
              </Button>
              <Button
                outline
                className="d-none d-sm-block"
                onClick={() => dispatch(setAuthModalVisible({ modalName: modalNames.LOGIN, isVisible: true }))}
              >
                Đăng nhập
              </Button>
              <button className={cx('btn-menu', 'd-lg-none')} onClick={hanldeShowMenu}>
                <MenuIcon />
              </button>
            </div>
          )}
          {isLogin && !loading && (
            <div className={cx('actions')}>
              {!isSmall && (
                <div>
                  <Tippy
                    offset={[0, 15]}
                    visible={isShowMessage && !window.location.href.includes('/message')}
                    onClickOutside={() => setIsShowMessage(false)}
                    interactive
                    placement="bottom"
                    render={(attrs) => (
                      <div {...attrs}>
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
                </div>
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
                      <div {...attrs}>
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
                  <div>
                    <Tippy
                      visible={isShowMenu}
                      interactive
                      placement="bottom"
                      onClickOutside={() => setIsShowMenu(false)}
                      render={(attrs) => (
                        <div {...attrs}>
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
                  </div>
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
        {menus.map((menu, index) =>
          menu.content.toLowerCase().includes('đối tác') ? (
            <div>
              <Tippy
                offset={[-1, 0]}
                visible={isShowDetailPartner}
                interactive
                placement="bottom"
                render={(attrs) => (
                  <div {...attrs}>
                    <PopperWrapper className={cx('custom-border')}>
                      <div className="d-flex flex-column">
                        <div className={cx('wrap-link')}>
                          <NavLink
                            className={cx('link')}
                            to={`${
                              currentUser.roles?.includes('ADMIN')
                                ? config.routes.managePartners
                                : config.routes.partner
                            }?type=${config.variables.busPartner}`}
                            onClick={() => setShowDetailPartner(false)}
                          >
                            Đối tác nhà xe
                          </NavLink>
                        </div>
                        <div className={cx('wrap-link')}>
                          <NavLink
                            className={cx('link')}
                            to={`${
                              currentUser.roles?.includes('ADMIN')
                                ? config.routes.managePartners
                                : config.routes.partner
                            }?type=${config.variables.carRentalPartner}`}
                            onClick={() => setShowDetailPartner(false)}
                          >
                            Đối tác cho thuê xe
                          </NavLink>
                        </div>
                        <div className={cx('wrap-link')}>
                          <NavLink
                            className={cx('link')}
                            to={`${
                              currentUser.roles?.includes('ADMIN')
                                ? config.routes.managePartners
                                : config.routes.partner
                            }?type=${config.variables.driverPartner}`}
                            onClick={() => setShowDetailPartner(false)}
                          >
                            Đối tác tài xế
                          </NavLink>
                        </div>
                      </div>
                    </PopperWrapper>
                  </div>
                )}
                onClickOutside={() => setShowDetailPartner(false)}
              >
                <button className={cx('drop-down')} onClick={() => setShowDetailPartner((prev) => !prev)}>
                  {currentUser.roles?.includes('ADMIN') ? 'Đối tác' : 'Trở thành đối tác'}
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
              </Tippy>
            </div>
          ) : (
            <MenuItem key={index} menu={menu}></MenuItem>
          ),
        )}
      </Menu>
    </header>
  )
}

Header.prototypes = {
  menus: PropTypes.array.isRequired,
}

export default Header
