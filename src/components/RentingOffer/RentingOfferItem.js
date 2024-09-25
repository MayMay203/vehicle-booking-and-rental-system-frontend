import { Link } from 'react-router-dom';
import styles from './RentingOffer.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)
function RentingOfferItem({title, src}) {
    return (
      <Link className={cx('col-12','col-md-9','col-lg-4','item')}>
          <img className={cx('item-img')} alt="vehicle" src={src}></img>
        <div className={cx('title')}>{title}</div>
      </Link>
    )
}

export default RentingOfferItem;