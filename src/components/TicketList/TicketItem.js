import { images } from '~/assets/images'
import styles from './Ticket.module.scss'
import classNames from 'classnames/bind'
import { StarIcon } from '../Icon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Button from '../Button'

const cx = classNames.bind(styles)
function TicketItem() {
  return (
   <div className={cx('wrapper')}>
      <div className={cx('row', 'row-cols-1', 'row-cols-md-2', 'row-cols-lg-3', 'gx-4', 'gy-4')}>
        <div className="col">
          <div className={cx('image-wrapper')}>
            <img src={images.trip} alt="car" className={cx('image')}></img>
          </div>
        </div>
        <div className="col d-flex flex-column gap-2 gap-lg-4">
          <span className={cx('name')}>Nhà xe Tú Lạc</span>
          <div className="d-flex flex-wrap align-items-center gap-3">
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
        <div className=" col col-md-12 d-flex flex-column justify-content-between align-items-start align-items-lg-end justify-content-md-end justify-content-lg-between">
          <div className="d-flex justify-content-md-end w-100 flex-lg-column gap-5 mb-4 mb-lg-0 gap-lg-4 align-items-center align-items-lg-end">
            <span className={cx('price')}>300.000đ</span>
            <span className={cx('sale-off')}>-50%</span>
          </div>
          <span className={cx('status', 'w-100')}>Còn 19 chỗ trống</span>
          <div className="d-flex w-100 align-items-center justify-content-between justify-content-md-end justify-content-lg-none mt-4 mt-lg-0 gap-sm-2 gap-md-5 gap-lg-5">
            <button className={cx('actions', 'd-flex', 'gap-2', 'align-items-center')}>
              <span>Thông tin chi tiết</span>
              <FontAwesomeIcon icon={faCaretDown} />
            </button>
            <Button rounded>Đặt ngay</Button>
          </div>
        </div>
      </div>
      <div className={cx('detail')}>
        
      </div>
   </div>
  )
}

export default TicketItem
