import { Modal } from 'react-bootstrap'
import styles from './Modal.module.scss'
import classNames from 'classnames/bind'
import { useModal } from '~/Context/AuthModalProvider'
import Form from '~/components/Form'
import FormInput from '~/components/Form/FormInput'
import Button from '~/components/Button'
import { useState } from 'react'
import { verifyOTP } from '~/apiServices/verifyOTP'
import { resendOTP } from '~/apiServices/resendOTP'

const cx = classNames.bind(styles)
function AuthCodeModal() {
  const { isOpenModal, openModal, modalData, closeModal } = useModal()
  const { type, email } = modalData
  const [otp, setOtp] = useState('')

  const handleContinue = async (e) => {
    e.preventDefault()
    const data = await verifyOTP(email, otp)
    if (data) {
      console.log(data)
      closeModal('authCode')
      if (type === 'forget') {
        openModal('reset')
      } else if (type === 'register') {
        openModal('info')
      }
    } else {
      alert('Mã OTP hết hạn vui lòng thử lại')
    }
  }

  const handleResendOTP = async (e) => {
    e.preventDefault()
    setOtp('')
    const data = await resendOTP(email)
    if (data) {
      alert('Vui lòng kiểm tra email để nhận OTP')
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
            title="Nhập OTP gửi từ email"
            error="OTP không đúng"
            id="otp"
            type="otp"
            placeholder="Nhập OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          ></FormInput>
          <span className={cx('time')}>2:00</span>
          <button className={cx('btn-resend')} onClick={handleResendOTP}>Gửi lại mã</button>
          <Button className={cx('btn-submit')} onClick={handleContinue}>
            Tiếp tục
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AuthCodeModal
