import { Modal } from 'react-bootstrap'
import styles from './AuthModal.module.scss'
import classNames from 'classnames/bind'
import FormInput from '~/components/Form/FormInput'
import Button from '~/components/Button'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { modalNames, setAuthModalVisible } from '~/redux/slices/authModalSlice'
import { changePassword } from '~/apiServices/changePassword'
import { checkLoginSession } from '~/redux/slices/userSlice'

const cx = classNames.bind(styles)
function ChangePassword() {
  console.log('re-render change passsword modal')
  const showChangePassModal = useSelector((state) => state.authModal.changePassword)
  console.log(showChangePassModal)
  const dispatch = useDispatch()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isValid, setIsValid] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity())
    }
    if (newPassword !== confirmPassword) {
      setIsValid(false)
    }
  }, [newPassword, confirmPassword])

  const reset = useCallback(() => {
    setNewPassword('')
    setCurrentPassword('')
    setConfirmPassword('')
  }, [])

  const handleChangePassword = async (e) => {
    e.preventDefault()
    try {
      if (dispatch(checkLoginSession())) {
        const data = await changePassword(currentPassword, newPassword, confirmPassword)
        dispatch(setAuthModalVisible({ modalName: modalNames.CHANGE_PASSWORD, isVisible: false }))
        toast.success(data.info, { autoClose: 1000, position: 'top-center' })
        reset()
      }
    } catch (message) {
      toast.error(message, { autoClose: 1000, position: 'top-center' })
    }
  }
  const handleChange = useCallback((value, functionChange) => {
    functionChange(value)
  }, [])

  return (
    <Modal
      show={showChangePassModal}
      onHide={() => dispatch(setAuthModalVisible({ modalName: modalNames.CHANGE_PASSWORD, isVisible: false }))}
      centered
    >
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title')}>Đổi mật khẩu</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form ref={formRef}>
          <FormInput
            title="Mật khẩu hiện tại"
            error={currentPassword ? 'Mật khẩu có ít nhất 8 kí tự' : 'Vui lòng nhập mật khẩu'}
            id="currentPassword"
            type="password"
            minLength="8"
            placeholder="Nhập mật khẩu hiện tại"
            value={currentPassword}
            onChange={(e) => handleChange(e.target.value, setCurrentPassword)}
            required
            isValid={isValid}
            autoComplete="new-password"
          ></FormInput>
          <FormInput
            title="Mật khẩu mới"
            error={newPassword ? 'Mật khẩu có ít nhất 8 kí tự' : 'Vui lòng nhập mật khẩu'}
            id="newPassword"
            type="password"
            minLength="8"
            placeholder="Nhập mật khẩu mới"
            value={newPassword}
            onChange={(e) => handleChange(e.target.value, setNewPassword)}
            required
            isValid={isValid}
            autoComplete="new-password"
          ></FormInput>
          <FormInput
            title="Nhập lại mật khẩu"
            error="Mật khẩu xác nhận không đúng"
            id="confirmPassword"
            type="password"
            minLength="8"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            password={newPassword}
            onChange={(e) => handleChange(e.target.value, setConfirmPassword)}
            isValid={isValid}
            required
            autoComplete="new-password"
          ></FormInput>
          <Button className={cx('btn-submit', 'm-0')} onClick={handleChangePassword} disabled={!isValid} type="submit">
            Đổi mật khẩu
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default ChangePassword
