import styles from './InforRental.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
function SurchargeFee() {
  return (
    <div className="p-0">
      <div className={cx('txt-title')}>Phí phụ thu có thể phát sinh</div>
      <div className={cx('txt-content')}>
        <span>Phụ phí xăng</span>
        <span className={cx('align-right')}>25.000đ/1 lít</span>
      </div>
      <div className={cx('txt-sub-content')}>
        <span>
          Chủ xe chỉ thu khi vạch xăng thấp hơn lúc nhận xe. Trả lại đúng vạch xăng như lúc nhận để không phải trả phí
          này.
        </span>
      </div>
      <div className={cx('txt-content')}>
        <span>Phí vệ sinh</span>
        <span className={cx('align-right')}>100.000đ-200.000đ</span>
      </div>
      <div className={cx('txt-sub-content')}>
        <span>Vui lòng trả lại hiện trạng xe được vệ sinh như lúc nhận để không mất phí này.</span>
      </div>
  
      <div className={cx('txt-content')}>
        <span className={cx('txt', 'note')}>Lưu ý:</span>
        <span className={cx('txt', 'note-content')}>
          Mọi tiền bạn đã thanh toán sẽ được hoàn trả 100% nếu chủ xe hủy đơn và hệ thống sẽ đánh giá xe 1 sao.
        </span>
      </div>
    </div>
  )
}
export default SurchargeFee
