import { images } from '~/assets/images'
import styles from './Offer.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)
function OfferItem({ price, title, link, style,className}) {
  return (
      <article
          style={style}
          className={cx('inner', [className])}>
          <Link to={link}><img src={images.trip} alt="trip" className={cx('offer-img')}></img></Link>
      <div className={cx('content')}>
       <Link to={link}> <h3 className={cx('title')}>{title}</h3></Link>
        {price && <span className={cx('price')}>Từ {price}đ</span>}
      </div>
    </article>
  )
}

export default OfferItem
