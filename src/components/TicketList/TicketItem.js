import { images } from '~/assets/images'
import styles from './Ticket.module.scss'
import classNames from 'classnames/bind'
import { StarIcon } from '../Icon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Button from '../Button'

const cx = classNames.bind(styles)
function TicketItem() {
  return (
    <div className={cx('wrapper', 'row', 'row-cols-sm-1', 'row-cols-lg-3', 'gap-2')}>
      <div className={cx('image-wrapper')}>
        <img src={images.trip} alt="car" className={cx('image')}></img>
      </div>
      <div className="d-flex flex-column gap-4">
        <span className={cx('name')}>Nhà xe Tú Lạc</span>
        <div className="d-flex align-items-center gap-3">
          <span className={cx('type')}>Limousine 34 giường nằm </span>
          <div className={cx('rating')}>
            <StarIcon className={cx('icon')} width="2.6rem" />
            <span>4.5(5)</span>
          </div>
        </div>
        <div className="d-flex gap-3 align-items-center">
          <img className={cx('location-img')} alt="location" src={images.location} />
          <div className={cx('location-time', 'd-flex', 'flex-column', 'gap-4', 'justify-content-center')}>
            <span>9:00 Hà Nội</span>
            <span className={cx('duration')}>1h30m</span>
            <span>10:30 Hải Phòng</span>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-between align-items-end">
        <div className="d-flex flex-column gap-4 align-items-center">
          <span className={cx('price')}>300.000đ</span>
          <span className={cx('sale-off')}>-50%</span>
        </div>
        <span className={cx('status')}>Còn 19 chỗ trống</span>
        <div className="d-flex align-items-center gap-sm-2 gap-lg-5">
          <button className={cx('actions', 'd-flex','gap-2')}>
            Thông tin chi tiết
            <FontAwesomeIcon icon={faCaretDown} />
          </button>
          <Button rounded>Đặt ngay</Button>
        </div>
      </div>
    </div>
  )
}

export default TicketItem
