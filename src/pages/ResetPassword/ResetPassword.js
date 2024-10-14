import { useEffect, useRef, useState } from 'react'
import FormInput from '~/components/Form/FormInput'
import classNames from 'classnames/bind'
import styles from './ResetPassword.module.scss'
import Button from '~/components/Button'
import {useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { changePassword } from '~/apiServices/changePassword'
import { checkTokenReset } from '~/apiServices/checkTokenReset'

const cx = classNames.bind(styles)
function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [isValid, setIsValid] = useState(null)
  const [isValidToken, setIsValidToken] = useState(null)
  const [token, setToken] = useState(null)
  const [success, setSucess] = useState(false)
  const location = useLocation()
  const formRef = useRef(null)

  useEffect(() => {
    async function checkValidToken() {
      const queryParams = new URLSearchParams(location.search)
      const tokenParam = queryParams.get('token')
      setToken(tokenParam)
      const result = await checkTokenReset(tokenParam)
      setIsValidToken(result.info)
    }
    checkValidToken()
  }, [location.search])

  useEffect(() => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity())
    }
    if (password !== confirmPass) {
      setIsValid(false)
    }
  }, [password, confirmPass])

  const handleChangePass = async (e) => {
    e.preventDefault()
    try {
      await changePassword(token, password, confirmPass)
      setSucess(true)
    } catch (message) {
      toast.error(message)
    }
  }

  return (
    <div className={cx('wrapper')}>
      {!success ? isValidToken ? (
        <form className={cx('inner')} ref={formRef}>
          <FormInput
            value={password}
            title="Mật khẩu mới"
            error="Mật khẩu có ít nhất 8 kí tự"
            id="password"
            type="password"
            minLength="8"
            placeholder="Nhập mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
            isValid={isValid}
            required
          ></FormInput>
          <FormInput
            title="Xác nhận mật khẩu"
            error="Mật khẩu xác nhận không đúng"
            id="confirmPassword"
            type="password"
            minLength="8"
            placeholder="Nhập mật khẩu xác nhận"
            value={confirmPass}
            password={password}
            onChange={(e) => setConfirmPass(e.target.value)}
            isValid={isValid}
            required
          ></FormInput>
          <Button className={cx('btn-submit')} onClick={handleChangePass} disabled={!isValid}>
            Đổi mật khẩu
          </Button>
        </form>
      ) : (
        <div className={cx('box')}>
          <h1 className={cx('title')}>Yêu cầu đặt lại mật khẩu thất bại</h1>
          <p className={cx('message')}>
            Liên kết đã được sử dụng để đặt lại mật khẩu hoặc đã hết hạn thời gian thực hiện.
          </p>
          <p className={cx('message')}>Vui lòng thử lại!</p>
        </div>
      ) : (
        <div className={cx('box')}>
          <h1 className={cx('title')}>Yêu cầu đặt lại mật khẩu thành công</h1>
          <p className={cx('message')}>Quay lại trang để tiếp tục với phiên đăng nhập mới.</p>
        </div>
      )}
    </div>
  )
}

export default ResetPassword
