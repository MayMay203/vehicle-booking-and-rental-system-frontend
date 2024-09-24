import styles from './Offer.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import Button from '../Button'

const cx = classNames.bind(styles)
function OfferItem({ price, src, title, link, style, voucher, className }) {
  return (
    <article style={style} className={cx('inner', [className])}>
      <Link to={link}>
        <img src={src} alt="trip" className={cx('offer-img')}></img>
      </Link>
      <div className={cx('content')}>
        <Link to={link}>
          {' '}
          <h3 className={cx('title')}>{title}</h3>
        </Link>
        {price && <span className={cx('price')}>Từ {price}</span>}
        {voucher && <Button className={cx('btn-voucher')} rounded>{voucher}</Button> }
      </div>
    </article>
  )
}

export default OfferItem
