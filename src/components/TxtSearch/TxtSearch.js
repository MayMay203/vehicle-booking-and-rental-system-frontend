import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './TxtSearch.module.scss'
import classNames from 'classnames/bind'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
const cx = classNames.bind(styles)
function TxtSearch({ content }) {
  return (
    <div className={cx('search')}>
      <FontAwesomeIcon icon={faSearch} className={cx('icon-search')} />
      <input className={cx('input-search')} type="text" placeholder={content} />
    </div>
  )
}
export default TxtSearch