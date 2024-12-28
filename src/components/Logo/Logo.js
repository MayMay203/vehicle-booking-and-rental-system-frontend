import { images } from '~/assets/images';
import styles from './Logo.module.scss'
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)
function Logo({className}) {
    return (
      <div className={cx('wrapper',[className])}>
        <Link to="/"><img className={cx('logo-img')} alt="logo" src={images.logo}></img></Link>
        <p className={cx('logo-text')}>Mỗi chuyến đi, một trải nghiệm</p>
      </div>
    )
}

export default Logo;