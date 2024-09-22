import styles from './BookVehicle.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)
function BookVehicle() {
    return (<div className={cx('wrapper')}>
        Book Vehicle page
    </div> );
}

export default BookVehicle;