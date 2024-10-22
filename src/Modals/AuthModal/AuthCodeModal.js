import { Modal } from 'react-bootstrap'
import styles from './AuthModal.module.scss'
import classNames from 'classnames/bind'
import FormInput from '~/components/Form/FormInput'
import Button from '~/components/Button'
import { useCallback, useEffect, useRef, useState } from 'react'
import { verifyOTP } from '~/apiServices/verifyOTP'
import { resendOTP } from '~/apiServices/resendOTP'
import { toast } from 'react-toastify'
import { useUserContext } from '~/Context/UserProvider'
import { useDispatch, useSelector } from 'react-redux'
import { modalNames, setAuthModalVisible } from '~/redux/slices/authModalSlice'

const cx = classNames.bind(styles)

function AuthCodeModal() {
  console.log('re-render auth code modal')
  const showAuthCodeModal = useSelector((state) => state.authModal.authCodeModal)
  const dispatch = useDispatch()

  const [timeLeft, setTimeLeft] = useState(0)
  const { getEmail } = useUserContext()

  const [isValid, setIsValid] = useState(false)
  const [otp, setOtp] = useState('')
  const formRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity())
    }
  }, [otp])

  useEffect(() => {
    if (timeLeft > 0) {
      timeoutRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)

      return () => clearTimeout(timeoutRef.current)
    }
  }, [timeLeft])

  useEffect(() => {
    if (showAuthCodeModal) {
      setTimeLeft(120)
    }
  }, [showAuthCodeModal])

  const formatTime = useCallback((seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }, [])

  const handleContinue = async (e) => {
    e.preventDefault()
    try {
      await verifyOTP(getEmail(), otp)
      setTimeLeft(0)
      dispatch(setAuthModalVisible({ modalName: modalNames.AUTH_CODE, isVisible: false }))
      setOtp('')
      dispatch(setAuthModalVisible({ modalName: modalNames.INFO, isVisible: true }))
    } catch (message) {
      toast.error(message)
    }
  }

  const handleResendOTP = async (e) => {
    e.preventDefault()
    setOtp('')
    try {
      await resendOTP(getEmail())
      setTimeLeft(120)
      toast.info('Kiểm tra lại email để nhận OTP')
    } catch (message) {
      toast.error(message)
    }
  }

  const handleChange = useCallback((e) => setOtp(e.target.value), [])

  return (
    <Modal
      show={showAuthCodeModal}
      onHide={() => dispatch(setAuthModalVisible({ modalName: modalNames.AUTH_CODE, isVisible: false }))}
      centered
    >
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title')}>Nhập mã xác thực</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form ref={formRef}>
          <FormInput
            title="Nhập OTP gửi từ email"
            id="otp"
            type="text"
            placeholder="Nhập OTP"
            value={otp}
            required
            onChange={handleChange}
            isValid={isValid}
          />
          <span className={cx('time')}>{formatTime(timeLeft)}</span>
          <button className={cx('btn-resend')} onClick={handleResendOTP} disabled={timeLeft > 0} type="button">
            Gửi lại mã
          </button>
          <Button className={cx('btn-submit')} onClick={handleContinue} disabled={!isValid} type="submit">
            Tiếp tục
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default AuthCodeModal
