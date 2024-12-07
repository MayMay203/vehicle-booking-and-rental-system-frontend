import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './TxtSearch.module.scss'
import classNames from 'classnames/bind'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import useDebounce from '~/hook'
const cx = classNames.bind(styles)
function TxtSearch({ content, handleReceiveSearch = () => {} }) {
  const [value, setValue] = useState('')
  const valueDebounce = useDebounce(value, 500)

  useEffect(() => {
    handleReceiveSearch(valueDebounce)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueDebounce])

  return (
    <div className={cx('search')}>
      <FontAwesomeIcon icon={faSearch} className={cx('icon-search')} />
      <input
        className={cx('input-search')}
        type="text"
        placeholder={content}
        value={value}
        onChange={(e) => {
          e.target.value = e.target.value.trimStart()
          setValue(e.target.value)
        }}
      />
    </div>
  )
}
export default TxtSearch
