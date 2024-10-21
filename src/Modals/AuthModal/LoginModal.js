import { Modal } from 'react-bootstrap'
import styles from './AuthModal.module.scss'
import classNames from 'classnames/bind'
import FormInput from '~/components/Form/FormInput'
import Button from '~/components/Button'
import { images } from '~/assets/images'
import { useCallback, useEffect, useRef, useState } from 'react'
import { login } from '~/apiServices/login'
import { useUserContext } from '~/Context/UserProvider/UserProvider'
import { toast } from 'react-toastify'
import { config } from '~/config'
import { useDispatch, useSelector } from 'react-redux'
import { modalNames, setAuthModalVisible } from '~/redux/slices/authModalSlice'

const cx = classNames.bind(styles)
function LoginModal() {
  console.log('re-render-login modal')
  const showLoginModal = useSelector((state) => state.authModal.login)
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValid, setIsValid] = useState(false)
  const formRef = useRef(null)
  const { setCurrentUser, toggleLogin } = useUserContext()

  useEffect(() => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity())
    }
  }, [email, password])

  const reset = useCallback(() => {
    setEmail('')
    setPassword('')
  }, [])

  const handleShowRegister = () => {
    dispatch(setAuthModalVisible({ modalName: modalNames.LOGIN, isVisible: false }))
    dispatch(setAuthModalVisible({ modalNames: modalNames.REGISTER, isVisible: true }))
  }

  const handleShowForget = (e) => {
    e.preventDefault()
    dispatch(setAuthModalVisible({ modalName: modalNames.LOGIN, isVisible: false }))
    // openAuthModal('forget')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const data = await login(email, password)
      setCurrentUser(data.accountLogin)
      toggleLogin()
      dispatch(setAuthModalVisible({ modalName: modalNames.LOGIN, isVisible: true }))
      reset()
      toast.success('Đăng nhập thành công', { autoClose: 1000, position: 'top-center' })
    } catch (message) {
      toast.error('Email hoặc mật khẩu không đúng')
    }
  }

  const handleGoogleLogin = (e) => {
    e.preventDefault()
    const redirectUri = config.variables.redirectUrl
    const authUrl = config.variables.authGoogleUrl
    const googleClientId = config.variables.googleClientId

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`

    window.location.href = targetUrl
  }

  return (
    <Modal
      show={showLoginModal}
      onHide={() => dispatch(setAuthModalVisible({ modalName: modalNames.LOGIN, isVisible: false }))}
      centered
    >
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title')}>Đăng nhập</Modal.Title>
          <p className={cx('desc')}>"Khởi động hành trình mới của bạn chỉ với vài bước đơn giản"</p>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form ref={formRef} noValidate>
          <FormInput
            title="Email"
            error="Email không đúng định dạng"
            id="email"
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="[\-a-zA-Z0-9~!$%^&amp;*_=+\}\{'?]+(\.[\-a-zA-Z0-9~!$%^&amp;*_=+\}\{'?]+)*@[a-zA-Z0-9_][\-a-zA-Z0-9_]*(\.[\-a-zA-Z0-9_]+)*\.[cC][oO][mM](:[0-9]{1,5})?"
            isValid={isValid}
            required
          ></FormInput>
          <FormInput
            title="Mật khẩu"
            error={password ? 'Mật khẩu có ít nhất 8 kí tự' : 'Vui lòng nhập mật khẩu'}
            id="password"
            type="password"
            minLength="8"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isValid={isValid}
            required
            autoComplete="current-password"
          ></FormInput>
          <Button className={cx('btn-submit')} onClick={handleLogin} disabled={!isValid} type="submit">
            Đăng nhập
          </Button>
          <button className={cx('btn-link')} onClick={handleShowForget}>
            Quên mật khẩu
          </button>
          <div className={cx('other')}>hoặc</div>
          <button className={cx('btn-google')} onClick={handleGoogleLogin}>
            <span className={cx('icon')}>
              <img src={images.google} alt="google" className={cx('google-img')}></img>
            </span>
            Đăng nhập bằng Google
          </button>
          <div className={cx('bottom')}>
            <span className={cx('content')}>Bạn chưa có tài khoản?</span>
            <button className={cx('btn-link', 'btn-bottom')} onClick={handleShowRegister} type="button">
              Đăng ký
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal
