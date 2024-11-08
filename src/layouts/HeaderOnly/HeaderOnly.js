import classNames from 'classnames/bind'
import styles from './HeaderOnly.module.scss'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setMenu } from '~/redux/slices/menuSlice'

const cx = classNames.bind(styles)
function HeaderOnly({ children }) {
  const currentUser = useSelector((state) => state.user.currentUser)
  const menu = useSelector((state) => state.menu.currentMenu)
  const dispatch = useDispatch()

  useEffect(() => {
    if (currentUser.roles?.includes('ADMIN')) {
      dispatch(setMenu('adminMenu'))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={cx('wrapper')}>
      <Header menus={menu} />
      <div className={cx('container')}>{children}</div>
    </div>
  )
}

export default HeaderOnly
