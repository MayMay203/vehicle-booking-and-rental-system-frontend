import { images } from '~/assets/images'
import styles from './Home.module.scss'
import classNames from 'classnames/bind'
import Search from '~/components/Search'
import { config } from '~/config'
import { BookingIcon, BusIcon, RentingIcon } from '~/components/Icon'
import OfferList from '~/components/Offer/OfferList'
import ContentItem from '../../components/ContentItem'
import NumberList from '~/components/NumberList'
import LinkItem from '~/components/LinkItem'
import RentingOffer from '~/components/RentingOffer'
// import FeedbackList from '~/components/FeedbackList'
import FeatureList from '~/components/FeatureList'

const cx = classNames.bind(styles)
function Home() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('banner')}>
        <img src={images.banner} alt="banner" className={cx('banner-image', 'd-none', 'd-md-block')}></img>
        <div className={cx('search-wrapper')}>
          <div className={cx('type')}>
            <LinkItem title="Mua vé" to={config.routes.ticket} Icon={<BusIcon />} />
            <LinkItem title="Đặt xe" to={config.routes.booking} Icon={<BookingIcon />} />
            <LinkItem title="Thuê xe" to={config.routes.renting} Icon={<RentingIcon/>} />
          </div>
          <div className={cx('search-block')}>
            <Search type={'user'}/>
          </div>
        </div>
      </div>
      <div className={cx('container', 'content')}>
        <ContentItem title="CON SỐ NỔI BẬT" Component={<NumberList />} />
        <ContentItem
          title="CÁC TUYẾN ĐƯỜNG PHỔ BIẾN"
          Component={<OfferList title={'Sài Gòn - Nha Trang'} price={'200.000d'} amount={5} src={images.trip} />}
        />
        <ContentItem
          title="CÁC ƯU ĐÃI NỔI BẬT"
          Component={
            <OfferList
              title={'Giảm 50k cho chuyến đi đầu tiên'}
              src={images.voucher_img}
              amount={5}
              voucher={'Lấy mã ngay'}
            />
          }
        />
        <ContentItem
          title="ĐẶT XE"
          Component={<OfferList title="Đặt xe tại Đà Nẵng" price={'50.000d'} amount={5} src={images.booking} />}
        />
        <ContentItem title="THUÊ XE" Component={<RentingOffer />} />
        <ContentItem
          title="DÀNH CHO ĐỐI TÁC"
          Component={<OfferList title="Đăng ký làm đối tác nhà xe" amount={3} src={images.partner} />}
        />
        {/* <ContentItem title="PHẢN HỒI CỦA KHÁCH HÀNG" Component={<FeedbackList />} /> */}
        <ContentItem title="TẠI SAO NÊN LỰA CHỌN CHÚNG TÔI" Component={<FeatureList />} />
      </div>
    </div>
  )
}

export default Home
