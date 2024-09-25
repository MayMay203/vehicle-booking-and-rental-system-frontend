import { Modal } from 'react-bootstrap'
import styles from './Modal.module.scss'
import classNames from 'classnames/bind'
import { useModal } from '~/Context/AuthModalProvider'
import Form from '~/components/Form'
import FormInput from '~/components/Form/FormInput'
import Button from '~/components/Button'
import { images } from '~/assets/images'

const cx = classNames.bind(styles)
function RegisterModal() {
  const { isOpenModal, closeModal } = useModal()
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
          <FormInput id="phone" type="phone" title="Số điện thoại" error="Số điện thoại không đúng" />
          <FormInput id="password" type="password" title="Mật khẩu" error="Trường này bắt buộc" />
          <Button className={cx('btn-submit')}>Tiếp tục</Button>
          <div className={cx('other')}>hoặc</div>
          <button className={cx('btn-google')}>
            <span className={cx('icon')}>
              <img src={images.google} alt="google" className={cx('google-img')}></img>
            </span>
            Đăng nhập bằng Google
          </button>
          <div className={cx('bottom')}>
            <span className={cx('content')}>Bạn đã có tài khoản?</span>
            <button className={cx('btn-link', 'btn-bottom')}>Đăng nhập</button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default RegisterModal
