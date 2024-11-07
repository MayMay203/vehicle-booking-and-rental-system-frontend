import { useSelector } from 'react-redux'
import Footer from '../components/Footer'
import Header from '../components/Header'
import styles from './DefaultLayout.module.scss'
import classNames from 'classnames/bind'
import { config } from '~/config'

const cx = classNames.bind(styles)
function DefaultLayout({ children }) {
  const currentUser = useSelector((state) => state.user.currentUser)

  const userMenu = [
    {
      content: 'Trang chủ',
      to: config.routes.home,
    },
    {
      content: 'Mua vé',
      to: config.routes.ticket,
    },
    {
      content: 'Thuê xe',
      to: config.routes.renting,
    },
    {
      content: 'Đặt xe',
      to: config.routes.booking,
    },
    {
      content: 'Trở thành đối tác',
      to: config.routes.partner,
    },
    {
      content: 'Hỏi đáp',
      to: config.routes.answer,
    },
    {
      content: 'Về chúng tôi',
      to: config.routes.about,
    },
  ]
  const adminMenu = [
    { content: 'Dịch vụ', to: config.routes.services },
    { content: 'Tài khoản', to: config.routes.manageAccounts },
    { content: 'Đối tác', to: config.routes.managePartners },
    { content: 'Thống kê', to: config.routes.statistics },
    { content: 'Khuyến mãi', to: config.routes.vouchers },
  ]
  const busPartnerMenu = [
    { content: 'Chuyến xe', to: config.routes.busTrip },
    { content: 'ĐƠn đặt', to: config.routes.accounts },
    { content: 'Loại xe', to: config.routes.statistics },
    { content: 'Thống kê', to: config.routes.vouchers },
  ]
  // const partnerMenu = useMemo(() => ['Trang chủ', 'Dịch vụ', 'Đơn đặt', 'Thống kê', 'Thanh toán'], [])
  return (
    <div className={cx('wrapper')}>
      <Header
        menus={
          currentUser.roles?.includes('ADMIN')
            ? adminMenu
            : currentUser.roles?.includes('BUS_PARTNER')
            ? busPartnerMenu
            : userMenu
        }
      />
      <div className={cx('content')}>{children}</div>
      <Footer />
    </div>
  )
}

export default DefaultLayout
