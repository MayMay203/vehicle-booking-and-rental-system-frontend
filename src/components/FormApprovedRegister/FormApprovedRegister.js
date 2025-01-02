import classNames from "classnames/bind"
import styles from './FormApprovedRegister.module.scss'
import Notice from "../Notice"
const cx = classNames.bind(styles)
function FormApprovedRegister() {
    return (
      <Notice
        type={'success'}
        subtitle={'Đã trở thành đối tác!'}
        content={
          'Bạn đã trở thành đối tác của Safety Travel!\nCảm ơn vì đã tin tưởng và đồng hành cùng chúng tôi. Safety Travel chúc bạn sẽ có nhiều hành trình tuyệt vời và an toàn nhé!'
        }
        className = {cx('')}
      ></Notice>
    )
}
export default FormApprovedRegister