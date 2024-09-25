import styles from './Feature.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function FeatureItem({ title, Icon }) {
  return (
    <div className={cx('item')}>
      <div className={cx('circle')}>
        <Icon />
      </div>
          <span className={cx('title')}>{title}</span>
    </div>
  )
}

export default FeatureItem
