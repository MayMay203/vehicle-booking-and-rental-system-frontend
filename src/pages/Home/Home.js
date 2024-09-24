import { images } from '~/assets/images'
import styles from './Home.module.scss'
import classNames from 'classnames/bind'
import Search from '~/components/Search'
import { Link } from 'react-router-dom'
import { config } from '~/config'
import { BookingIcon, BusIcon, RentingIcon } from '~/components/Icon'
import OfferList from '~/components/Offer/OfferList'

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
        <OfferList title={'Sài Gòn - Nha Trang'} price={'200.000d'} amount={5} src={images.trip} />
        <h2 className={cx('heading')}>CÁC ƯU ĐÃI NỔI BẬT</h2>
        <OfferList title={'Giảm 50k cho chuyến đi đầu tiên'} src={images.voucher} amount={5} voucher={'Lấy mã ngay'} />
        <h2 className={cx('heading')}>ĐẶT XE</h2>
        <OfferList title={'Đặt xe tại Đà Nẵng'} price={'50.000d'} amount={5} src={images.booking} />
        <h2 className={cx('heading')}>THUÊ XE</h2>
        <OfferList title={'Thuê xe máy tự lái'} price={'200.000d'} amount={3} src={images.renting} />
        <h2 className={cx('heading')}>DÀNH CHO ĐỐI TÁC</h2>
        <OfferList title={'Đăng ký làm đối tác nhà xe'} amount={3} src={images.partner} />
      </div>
    </div>
  )
}

export default Home
