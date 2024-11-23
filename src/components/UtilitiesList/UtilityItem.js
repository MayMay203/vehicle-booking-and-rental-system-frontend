import styles from './Utility.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function UtilityItem({ data }) {
  return (
    <div className="col">
      <div className={cx('item')}>
        <div className="d-flex align-items-center gap-3">
          <img src={data.image} alt={data.name} className={cx('img')}></img>
          <p className={cx('title')}>{data.name}</p>
        </div>
        <p className={cx('desc')}>{data.description}</p>
      </div>
    </div>
  )
}

export default UtilityItem
