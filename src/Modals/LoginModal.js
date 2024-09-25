import { Modal } from 'react-bootstrap'
import styles from './Modal.module.scss'
import classNames from 'classnames/bind'
import { useModal } from '~/Context/AuthModalProvider'
import Form from '~/components/Form'
import FormInput from '~/components/Form/FormInput'
import Button from '~/components/Button'
import { images } from '~/assets/images'

const cx = classNames.bind(styles)
function LoginModal() {
  const { isOpenModal, closeModal } = useModal()
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
          <FormInput id="phone" type="phone" title="Số điện thoại" error="Số điện thoại không đúng" />
          <FormInput id="password" type="password" title="Mật khẩu" error="Trường này bắt buộc" />
          <Button className={cx('btn-submit')}>Đăng nhập</Button>
          <button className={cx('btn-link')}>Quên mật khẩu</button>
          <div className={cx('other')}>hoặc</div>
          <button className={cx('btn-google')}>
            <span className={cx('icon')}>
              <img src={images.google} alt='google' className={cx('google-img')}></img>
            </span>
            Đăng nhập bằng Google
          </button>
          <div className={cx('bottom')}>
            <span className={cx('content')}>Bạn chưa có tài khoản?</span>
            <button className={cx('btn-link','btn-bottom')}>Đăng ký</button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal
