import styles from './NumberItem.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function NumberItem({ number, title }) {
  return (
    <div className={cx('number-item')}>
      <span className={cx('number')}>{number}</span>
      <span className={cx('number-title')}>{title}</span>
    </div>
  )
}

export default NumberItem
