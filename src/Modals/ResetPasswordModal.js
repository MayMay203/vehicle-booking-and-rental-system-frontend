import { Modal } from 'react-bootstrap'
import styles from './Modal.module.scss'
import classNames from 'classnames/bind'
import { useModal } from '~/Context/AuthModalProvider'
import Form from '~/components/Form'
import FormInput from '~/components/Form/FormInput'
import Button from '~/components/Button'

const cx = classNames.bind(styles)
function ResetPasswordModal() {
  const { isOpenModal, openModal, closeModal } = useModal()

  const handleChangePass = () => {
    closeModal('reset')
    openModal('login')
  }

  const handleShowLogin = () => {
    closeModal('reset')
    openModal('login')
  }

  return (
    <Modal show={isOpenModal.reset} onHide={() => closeModal('reset')} centered>
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title')}>Đặt lại mật khẩu</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormInput id="newPass" type="phone" title="Mật khẩu mới" />
          <FormInput id="againPass" type="phone" title="Nhập lại mật khẩu" />
          <Button className={cx('btn-submit')} onClick={handleChangePass}>
            Đổi mật khẩu
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

export default ResetPasswordModal
