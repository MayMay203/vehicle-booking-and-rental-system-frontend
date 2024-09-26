import { Modal } from 'react-bootstrap'
import styles from './Modal.module.scss'
import classNames from 'classnames/bind'
import { useModal } from '~/Context/AuthModalProvider'
import Form from '~/components/Form'
import FormInput from '~/components/Form/FormInput'
import Button from '~/components/Button'

const cx = classNames.bind(styles)
function AuthCodeModal() {
  const { isOpenModal, openModal, modalData, closeModal } = useModal()
  const { type } = modalData

  const handleContinue = () => {
    closeModal('authCode')
    if (type === 'forget') {
      openModal('reset')
    } else if (type === 'register') {
      openModal('info')
    }
  }
  return (
    <Modal show={isOpenModal.authCode} onHide={() => closeModal('authCode')} centered>
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title')}>Nhập mã xác thực</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormInput
            id="phone"
            type="phone"
            title="Nhập mã OTP vừa gửi đến số điện thoại 0984838884"
            placeholder="Nhập OTP"
          />
          <span className={cx('time')}>2:00</span>
          <button className={cx('btn-resend')}>Gửi lại mã</button>
          <Button className={cx('btn-submit')} onClick={handleContinue}>
            Tiếp tục
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AuthCodeModal
