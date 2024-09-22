import classNames from "classnames/bind";
import styles from './BuyTicket.module.scss'


const cx = classNames.bind(styles)
function BuyTicket() {
    return (<div className={cx('wrapper')}>
        BuyTicket page
    </div>);
}

export default BuyTicket;