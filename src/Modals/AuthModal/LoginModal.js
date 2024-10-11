import { Modal } from 'react-bootstrap'
import styles from './AuthModal.module.scss'
import classNames from 'classnames/bind'
import { useAuthModal } from '~/Context/AuthModalProvider'
import FormInput from '~/components/Form/FormInput'
import Button from '~/components/Button'
import { images } from '~/assets/images'
import { useContext, useEffect, useRef, useState } from 'react'
import { login } from '~/apiServices/login'
import { UserContext } from '~/Context/UserProvider/UserProvider'

const cx = classNames.bind(styles)
function LoginModal() {
  const { isOpenModal, openModal, closeModal } = useAuthModal()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValid, setIsValid] = useState(false)
  const formRef = useRef(null)
  const userContext = useContext(UserContext)

  useEffect(() => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity())
    }
  }, [email, password])

  const handleShowRegister = () => {
    closeModal('login')
    openModal('register')
  }

  const handleShowForget = () => {
    closeModal('login')
    openModal('forget')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const data = await login(email, password)
    if (data) {
      alert('Đăng nhập thành công')
      userContext.toggleLogin()
      closeModal('login')
    } else {
      alert('Email hoặc mật khẩu sai')
    }
  }

  return (
    <Modal show={isOpenModal.login} onHide={() => closeModal('login')} centered>
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
            placeholder="Nhâp email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            isValid={isValid}
            required
          ></FormInput>
          <FormInput
            title="Mật khẩu"
            error="Mật khẩu có ít nhất 8 kí tự"
            id="password"
            type="password"
            minLength="8"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isValid={isValid}
            required
          ></FormInput>
          <Button className={cx('btn-submit')} onClick={handleLogin} disabled={!isValid} type="submit">
            Đăng nhập
          </Button>
          <button className={cx('btn-link')} onClick={handleShowForget}>
            Quên mật khẩu
          </button>
          <div className={cx('other')}>hoặc</div>
          <button className={cx('btn-google')}>
            <span className={cx('icon')}>
              <img src={images.google} alt="google" className={cx('google-img')}></img>
            </span>
            Đăng nhập bằng Google
          </button>
          <div className={cx('bottom')}>
            <span className={cx('content')}>Bạn chưa có tài khoản?</span>
            <button className={cx('btn-link', 'btn-bottom')} onClick={handleShowRegister}>
              Đăng ký
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal
