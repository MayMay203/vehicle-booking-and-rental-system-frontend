import classNames from 'classnames/bind'
import styles from './HeaderOnly.module.scss'
import Header from '../components/Header'
import { config } from '~/config'

const cx = classNames.bind(styles)
function HeaderOnly({ children }) {
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
  return (
    <div className={cx('wrapper')}>
      <Header menus={userMenu} />
      <div className={cx('container')}>{children}</div>
    </div>
  )
}

export default HeaderOnly
