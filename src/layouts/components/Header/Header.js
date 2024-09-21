import styles from './Header.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function Header() {
    return <div className={cx('wrapper')}>
        Header
    </div>
}

export default Header
