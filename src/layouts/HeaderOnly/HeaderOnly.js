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
    { content: 'Đối tác', to: config.routes.partners },
    { content: 'Tài khoản', to: config.routes.accounts },
    { content: 'Khuyến mãi', to: config.routes.vouchers },
    { content: 'Thống kê', to: config.routes.statistics },
  ]
  return (
    <div className={cx('wrapper')}>
      <Header
        menus={currentUser.roles?.includes('ADMIN') ? adminMenu : userMenu}
        // menus={adminMenu}
      />
      <div className={cx('container')}>{children}</div>
    </div>
  )
}

export default HeaderOnly
