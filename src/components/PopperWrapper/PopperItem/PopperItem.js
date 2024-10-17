import styles from './PopperItem.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function PopperItem({ id, title }) {
  return (
    <label htmlFor={id} className={cx('wrapper')}>
      <input id={id} type="radio" name="item" />
      {title}
    </label>
  )
}

export default PopperItem
