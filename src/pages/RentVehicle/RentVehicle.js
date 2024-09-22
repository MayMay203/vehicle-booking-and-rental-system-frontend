import styles from './RentVehicle.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)
function RentVehicle() {
    return (<div className={cx('wrapper')}>
        RentVehicle page
    </div>);
}

export default RentVehicle;