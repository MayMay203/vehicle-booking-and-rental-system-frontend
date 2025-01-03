import styles from './PopperItem.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function PopperItem({ id, title, onClick, checked}) {
  return (
    <button className={cx('wrapper')} onClick={onClick}>
      <input
        id={id}
        type="radio"
        name="item"
        className={cx('radio-button')}
        hidden
        defaultChecked={checked}
      />
      <label htmlFor={id} className={cx('label')}>
        {title}
      </label>
    </button>
  )
}

export default PopperItem
