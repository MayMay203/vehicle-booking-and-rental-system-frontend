import classNames from 'classnames/bind'
import styles from './HeaderOnly.module.scss'
import Header from '../components/Header'
import { config } from '~/config'
import { useSelector } from 'react-redux'

const cx = classNames.bind(styles)
function HeaderOnly({ children }) {
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
    { content: 'Đối tác', to: config.routes.managePartners },
    { content: 'Tài khoản', to: config.routes.manageAccounts},
    { content: 'Khuyến mãi', to: config.routes.vouchers },
    { content: 'Thống kê', to: config.routes.statistics },
  ]
  const busPartnerMenu = [
    { content: 'Chuyến xe', to: config.routes.busTrip },
    { content: 'ĐƠn đặt', to: config.routes.accounts },
    { content: 'Loại xe', to: config.routes.statistics },
    { content: 'Thống kê', to: config.routes.vouchers },
  ]
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
      <div className={cx('container')}>{children}</div>
    </div>
  )
}

export default HeaderOnly
