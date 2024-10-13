import classNames from 'classnames/bind'
import styles from './PaymentMethod.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faMoneyBill } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)
function PaymentMethod({ type, isActive, onClick }) {
  const cash = 'cash'
  const credit_card = 'credit_card'
  return (
    <div className={cx('btn-payment', { active: isActive })} onClick={onClick}>
      <div className={cx('circle')}></div>
      <div className={cx('payment')}>
        {type === cash && <FontAwesomeIcon icon={faMoneyBill} className={cx('icon')}></FontAwesomeIcon>}
        {type === credit_card && <FontAwesomeIcon icon={faCreditCard} className={cx('icon')}></FontAwesomeIcon>}
        <div className={cx('wrap-txt')}>
          <p className={cx('type-payment')}>
            {type === cash && 'Thanh toán bằng tiền mặt'}
            {type === credit_card && 'Thanh toán bằng địa chỉ ngân hàng liên kết'}
          </p>
        </div>
      </div>
    </div>
  )
}
export default PaymentMethod
