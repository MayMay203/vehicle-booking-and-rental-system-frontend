import { Modal } from 'react-bootstrap'
import styles from './Modal.module.scss'
import classNames from 'classnames/bind'
import { useModal } from '~/Context/AuthModalProvider'
import Form from '~/components/Form'
import FormInput from '~/components/Form/FormInput'
import Button from '~/components/Button'
import { images } from '~/assets/images'
import { useContext, useState } from 'react'
import { login } from '~/apiServices/login'
import { UserContext } from '~/Context/UserProvider/UserProvider'

const cx = classNames.bind(styles)
function LoginModal() {
  const { isOpenModal, openModal, closeModal } = useModal()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const userContext = useContext(UserContext)

  const handleShowRegister = () => {
    closeModal('login')
    openModal('register')
  }

  const handleShowForget = () => {
    closeModal('login')
    openModal('forget')
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await login(email, password);
    if (data) {
      alert('Đăng nhập thành công')
      userContext.toggleLogin()
      closeModal('login')
    }
    else {
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
        <Form>
          <FormInput
            title="Email"
            error="Email không đúng định dạng"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormInput>
          <FormInput
            title="Mật khẩu"
            error="Mật khẩu có ít nhất 8 kí tự"
            id="password"
            type="password"
            minLength="8"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></FormInput>
          <Button className={cx('btn-submit')} onClick={handleLogin}>Đăng nhập</Button>
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
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal
