import { Modal } from 'react-bootstrap'
import styles from './Modal.module.scss'
import classNames from 'classnames/bind'
import { useModal } from '~/Context/AuthModalProvider'
import Form from '~/components/Form'
import FormInput from '~/components/Form/FormInput'
import Button from '~/components/Button'
import { images } from '~/assets/images'
import { useState } from 'react'
import { register } from '~/apiServices/registerService'

const cx = classNames.bind(styles)
function RegisterModal() {
  const { isOpenModal, openModal, closeModal } = useModal()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  const handleContinue = async(e) => {
    e.preventDefault();
    const data = await register(email, password, confirmPass)
    if (data) {
      console.log(data)
      openModal('authCode', { type: 'register', email: email })
      closeModal('register')
    } else {
      console.log('Failed to register with this account')
    }
  }

  const handleShowLogin = () => {
    closeModal('register')
    openModal('login')
  }
  return (
    <Modal show={isOpenModal.register} onHide={() => closeModal('register')} centered>
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title')}>Đăng ký</Modal.Title>
          <p className={cx('desc')}>"Tham gia ngay hôm nay để bắt đầu hành trình của bạn!"</p>
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
          <FormInput
            title="Xác nhận mật khẩu"
            error="Mật khẩu có ít nhất 8 kí tự"
            id="confirmPass"
            type="password"
            minLength="8"
            placeholder="Xác nhận mật khẩu"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          ></FormInput>
          <Button className={cx('btn-submit')} onClick={handleContinue}>
            Tiếp tục
          </Button>
          <div className={cx('other')}>hoặc</div>
          <button className={cx('btn-google')}>
            <span className={cx('icon')}>
              <img src={images.google} alt="google" className={cx('google-img')}></img>
            </span>
            Đăng nhập bằng Google
          </button>
          <div className={cx('bottom')}>
            <span className={cx('content')}>Bạn đã có tài khoản?</span>
            <button className={cx('btn-link', 'btn-bottom')} onClick={handleShowLogin}>
              Đăng nhập
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default RegisterModal
