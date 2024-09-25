import styles from './ContentItem.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function ContentItem({ title, Component }) {
  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('heading')}>{title}</h2>
      {Component}
    </div>
  )
}

export default ContentItem
