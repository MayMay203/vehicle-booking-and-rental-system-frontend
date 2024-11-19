import classNames from 'classnames/bind'
import styles from './FormPendingApproveRegister.module.scss'
import Notice from '../Notice'
const cx = classNames.bind(styles)
function FormPendingApproveRegister() {
  return (
    <Notice
      type={'wait'}
      subtitle={'Đang xét duyệt!'}
      content={
        // 'Chúc mừng bạn đã trở thành đối tác nhà xe!\nCảm ơn vì đã tin tưởng và đồng hành cùng chúng tôi. Safety Travel chúc bạn sẽ có nhiều hành trình tuyệt vời và an toàn nhé!'
        'Đơn đăng ký của bạn đang trong quá trình xét duyệt!\nQuá trình xét duyệt sẽ mất một ít thời gian, nếu gặp vấn đề hay thắc mắc gì xin hãy liên hệ với chúng tôi qua số điện thoại: 0842059000.\n Safety Travel mong đợi hợp tác cùng bạn.'
      }
      className={cx('')}
    ></Notice>
  )
}
export default FormPendingApproveRegister
