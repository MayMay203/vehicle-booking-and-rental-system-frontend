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
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import { fetchAllVouchersForUser, fetchAllVouchersInSystem } from '~/redux/slices/voucherSlice'
import { getPopularRoutes } from '~/apiServices/homepage/getPopularRoutes'
import { getHighlightNumbers } from '~/apiServices/homepage/getHighlightNumbers'
import { getStatusRegisterPartner } from '~/apiServices/user/getStatusRegisterPartner'

const cx = classNames.bind(styles)
function Home() {
  const { voucherUser } = useSelector((state) => state.voucher)
  const { isLogin } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [popularRoutes, setPopularRoutes] = useState([])
  const [hightlightNumbers, setHightlightNumbers] = useState([])
  const [statusPartner, setStatusPartner] = useState([])

  useEffect(() => {
    if (isLogin) {
      dispatch(fetchAllVouchersForUser())
    } else {
      dispatch(fetchAllVouchersInSystem())
    }
  }, [isLogin, dispatch])

  useEffect(() => {
    async function fetchData() {
      const routes = await getPopularRoutes()
      const highlightNumbers = await getHighlightNumbers()
      if (routes)
        setPopularRoutes(
          routes.map((item) => ({
            title: item.route,
            price: item.infoPrice,
            src: item.imageUrl,
            link: config.routes.ticket,
          })),
        )
      if (highlightNumbers) setHightlightNumbers(Object.values(highlightNumbers))
      const getStatusParter = async (type) => {
        try {
          const response = await getStatusRegisterPartner(type)
          console.log(response)
          let statusValue = ''
          if (response.info === 'PENDING_APPROVAL') {
            statusValue = 'pending_approval'
          } else if (response.info === 'APPROVED') {
            statusValue = 'approved'
          } else if (response.info === 'Not registered yet') {
            statusValue = 'Not_registered_yet'
          }
          return statusValue
        } catch (error) {
          console.error('Failed to get status partner', error)
        }
      }
      setStatusPartner([
        await getStatusParter('BUS_PARTNER'),
        await getStatusParter('CAR_RENTAL_PARTNER'),
        await getStatusParter('DRIVER'),
      ])
    }
    fetchData()
  }, [])

  const partnerList = useMemo(
    () => [
      {
        title: 'Đăng ký làm đối tác nhà xe',
        src: images.busPartner,
        link: config.routes.partner + `?type=BUS_PARTNER&status=${statusPartner[0]}`,
      },
      {
        title: 'Đăng ký làm đối tác cho thuê xe',
        src: images.rentalPartner,
        link: config.routes.partner + `?type=CAR_RENTAL_PARTNER&status=${statusPartner[1]}`,
      },
      {
        title: 'Đăng ký làm đối tác tài xế',
        src: images.driverPartner,
        link: config.routes.partner + `?type=DRIVER_PARTNER&status=${statusPartner[2]}`,
      },
    ],
    [statusPartner],
  )

  return (
    <div className={cx('wrapper')}>
      <div className={cx('banner')}>
        <img src={images.banner} alt="banner" className={cx('banner-image', 'd-none', 'd-md-block')}></img>
        <div className={cx('search-wrapper')}>
          <div className={cx('type')}>
            <LinkItem title="Mua vé" to={config.routes.ticket} Icon={<BusIcon />} />
            <LinkItem title="Đặt xe" to={config.routes.booking} Icon={<BookingIcon />} />
            <LinkItem title="Thuê xe" to={config.routes.renting} Icon={<RentingIcon />} />
          </div>
          <div className={cx('search-block')}>
            <Search type={'user'} />
          </div>
        </div>
      </div>
      <div className={cx('container', 'content')}>
        <ContentItem title="CON SỐ NỔI BẬT" Component={<NumberList numberList={hightlightNumbers} />} />
        <ContentItem title="CÁC TUYẾN ĐƯỜNG PHỔ BIẾN" Component={<OfferList dataList={popularRoutes} />} />
        {voucherUser.length > 0 && (
          <ContentItem title="CÁC ƯU ĐÃI NỔI BẬT" Component={<OfferList dataList={voucherUser} voucher />} />
        )}
        {/* <ContentItem
          title="ĐẶT XE"
          Component={
            <OfferList dataList={bookingList} />
            // <OfferList title="Đặt xe tại Đà Nẵng" price={'50.000d'} amount={5} src={images.booking} />
          }
        /> */}
        <ContentItem title="THUÊ XE" Component={<RentingOffer />} />
        <ContentItem title="DÀNH CHO ĐỐI TÁC" Component={<OfferList dataList={partnerList} />} />
        {/* <ContentItem title="PHẢN HỒI CỦA KHÁCH HÀNG" Component={<FeedbackList />} /> */}
        <ContentItem title="TẠI SAO NÊN LỰA CHỌN CHÚNG TÔI" Component={<FeatureList />} />
      </div>
    </div>
  )
}

export default Home
