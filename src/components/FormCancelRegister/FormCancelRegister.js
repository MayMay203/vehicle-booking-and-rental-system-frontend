import classNames from 'classnames/bind'
import styles from './FormCancelRegister.module.scss'
import Notice from '../Notice'
const cx = classNames.bind(styles)
function FormCancelRegister() {
  return (
    <Notice
      type={'cancel'}
      subtitle={'Tài khoản đối tác của bạn đã bị khóa!'}
      content={
        'Tài khoản đối tác của bạn đã bị khóa. Vui lòng xem chi tiết trong email đã được chúng tôi gửi. Nếu có thắc mắc gì vui lòng liên hệ hotline: 0842059000 hoặc gửi email đến safety travel.'
      }
      className={cx('')}
    ></Notice>
  )
}
export default FormCancelRegister
