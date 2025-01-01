import { Modal } from 'react-bootstrap'
import styles from './AuthModal.module.scss'
import classNames from 'classnames/bind'
import FormInput from '~/components/Form/FormInput'
import Button from '~/components/Button'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { forgetPassword } from '~/apiServices/forgetPassword'
import { useDispatch, useSelector } from 'react-redux'
import { modalNames, setAuthModalVisible } from '~/redux/slices/authModalSlice'
import { generalModalNames, setLoadingModalVisible } from '~/redux/slices/generalModalSlice'

const cx = classNames.bind(styles)
function ForgetPasswordModal() {
  const showForgotModal = useSelector((state) => state.authModal.forgot)
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity())
    }
  }, [email])

  const handleShowLogin = () => {
    setEmail('')
    dispatch(setAuthModalVisible({ modalName: modalNames.FORGOT, isVisible: false }))
    dispatch(setAuthModalVisible({ modalName: modalNames.LOGIN, isVisible: true }))
  }

  const handleConfirm = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: true }))
      const data = await forgetPassword(email)
      dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: false }))
      toast.success(data.info, { autoClose: 1200, position: 'top-center' })
    } catch (message) {
      dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: false }))
      toast.error(message, { autoClose: 1500, position: 'top-center' })
    }
  }

  return (
    <Modal
      show={showForgotModal}
      onHide={() => dispatch(setAuthModalVisible({ modalName: modalNames.FORGOT, isVisible: false }))}
      centered
    >
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title')}>Quên mật khẩu</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form ref={formRef}>
          <FormInput
            title="Email"
            error="Email không đúng định dạng"
            id="email"
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="[\-a-zA-Z0-9~!$%^&amp;*_=+\}\{'?]+(\.[\-a-zA-Z0-9~!$%^&amp;*_=+\}\{'?]+)*@[a-zA-Z0-9_][\-a-zA-Z0-9_]*(\.[\-a-zA-Z0-9_]+)*\.[cC][oO][mM](:[0-9]{1,5})?"
            isValid={isValid}
            required
          ></FormInput>
          <Button className={cx('btn-submit')} onClick={handleConfirm} type="submit" disabled={!isValid}>
            Xác nhận
          </Button>
          <div className={cx('bottom')}>
            <span className={cx('content')}>Bạn có muốn quay lại?</span>
            <button className={cx('btn-link', 'btn-bottom')} onClick={handleShowLogin}>
              Đăng nhập
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default ForgetPasswordModal
