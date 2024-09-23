import { images } from '~/assets/images'
import styles from './Home.module.scss'
import classNames from 'classnames/bind'
import Search from '~/components/Search'
import { Link } from 'react-router-dom'
import { config } from '~/config'
import { BookingIcon, BusIcon, RentingIcon } from '~/components/Icon'

const cx = classNames.bind(styles)
function Home() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('banner')}>
        <img src={images.banner} alt="banner" className={cx('banner-image')}></img>
        <div className={cx('search-wrapper')}>
          <div className={cx('type')}>
            <Link to={config.routes.ticket} className={cx('type-link')}>
              <BusIcon />
              Mua vé
            </Link>
            <Link to={config.routes.booking} className={cx('type-link')}>
              <BookingIcon />
              Đặt xe
            </Link>
            <Link to={config.routes.renting} className={cx('type-link')}>
              <RentingIcon />
              Thuê xe
            </Link>
          </div>
          <div className={cx('search-block')}>
            <Search />
          </div>
        </div>
      </div>
      <div className={cx('container', 'content')}>
        <h2 className={cx('heading')}>CON SỐ NỔI BẬT</h2>
        <div className={cx('number-list')}>
          <div className={cx('number-item')}>
            <span className={cx('number')}>100+</span>
            <span className={cx('number-title')}>Nhà xe chất lượng cao</span>
          </div>
          <div className={cx('number-item')}>
            <span className={cx('number')}>100+</span>
            <span className={cx('number-title')}>Tuyến đường</span>
          </div>
          <div className={cx('number-item')}>
            <span className={cx('number')}>500+</span>
            <span className={cx('number-title')}>Đối tác cùng phát triển</span>
          </div>
          <div className={cx('number-item')}>
            <span className={cx('number')}>100+</span>
            <span className={cx('number-title')}>Giao dịch thanh toán thành công</span>
          </div>
        </div>
        <h2 className={cx('heading')}>CÁC TUYẾN ĐƯỜNG PHỔ BIẾN</h2>
      </div>
    </div>
  )
}

export default Home
