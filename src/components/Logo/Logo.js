import { images } from '~/assets/images';
import styles from './Logo.module.scss'
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)
function Logo() {
    return (
      <div className={cx('wrapper')}>
        <Link><img className={cx('logo-img')} alt="logo" src={images.logo}></img></Link>
        <p className={cx('logo-text')}>Mỗi chuyến đi là mỗi ...</p>
      </div>
    )
}

export default Logo;