import styles from './Offer.module.scss'
import classNames from 'classnames/bind'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { modalNames, setAuthModalVisible } from '~/redux/slices/authModalSlice'

const cx = classNames.bind(styles)

function OfferItem({ price, src, title, link, style, className }) {
  const { isLogin } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLinkClick = (e) => {
    if (link.includes('register-partner') && !isLogin) {
      e.preventDefault()
      dispatch(setAuthModalVisible({ modalName: modalNames.LOGIN, isVisible: true }))
    }
  }

  return (
    <article style={style} className={cx('inner', [className])}>
      <Link to={link} onClick={handleLinkClick}>
        <img src={src} alt="trip" className={cx('offer-img')}></img>
      </Link>
      <div className={cx('content')}>
        <Link to={link} onClick={handleLinkClick}>
          <h3 className={cx('title')}>{title}</h3>
        </Link>
        {price && <span className={cx('price')}>Từ {price}</span>}
      </div>
    </article>
  )
}

export default OfferItem
