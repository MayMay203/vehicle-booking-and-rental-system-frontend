import styles from './Utility.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function UtilityItem({ src, alt, title, desc }) {
  return (
    <div className={cx('item')}>
      <div className='d-flex align-items-center gap-3'>
        <img src={src} alt={alt} className={cx('img')}></img>
        <p className={cx('title')}>{title}</p>
      </div>
      <p className={cx('desc')}>{desc}</p>
    </div>
  )
}

export default UtilityItem
