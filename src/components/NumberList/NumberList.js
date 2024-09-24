import NumberItem from './NumberItem';
import styles from './NumberItem.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)
function NumberList() {
    return (
      <div className={cx('number-list')}>
        <NumberItem title={'Nhà xe chất lượng cao'} number={'100+'} />
        <NumberItem title={'Tuyến đường'} number={'100+'} />
        <NumberItem title={'Hợp tác cùng phát triển'} number={'500+'} />
        <NumberItem title={'Giao dịch thanh toán thành công'} number={'100+'} />
      </div>
    )
}

export default NumberList;