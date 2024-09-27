import { Modal } from 'react-bootstrap'
import styles from './Modal.module.scss'
import classNames from 'classnames/bind'
import { useModal } from '~/Context/AuthModalProvider'
import Form from '~/components/Form'
import FormInput from '~/components/Form/FormInput'
import Button from '~/components/Button'

const cx = classNames.bind(styles)
function ForgetPasswordModal() {
  const { isOpenModal, openModal, closeModal } = useModal()

    const handleReceiveOTP = () => {
        closeModal('forget');
        openModal('authCode',{type: 'forget'})
    }

    const handleShowLogin = () => {
        closeModal('forget')
        openModal('login')
    }
  
  return (
    <Modal show={isOpenModal.forget} onHide={() => closeModal('forget')} centered>
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title')}>Quên mật khẩu</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormInput id="phone" type="phone" title="Số điện thoại" />
          <Button className={cx('btn-submit')} onClick={handleReceiveOTP}>
            Nhận mã OTP
          </Button>
          <div className={cx('bottom')}>
            <span className={cx('content')}>Bạn có muốn quay lại?</span>
            <button className={cx('btn-link', 'btn-bottom')} onClick={handleShowLogin}>
              Đăng nhập
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ForgetPasswordModal
