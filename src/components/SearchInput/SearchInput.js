import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './SearchInput.module.scss'
import classNames from 'classnames/bind'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const cx = classNames.bind(styles)
function SearchInput({ className, handleChange, isLoading }) {
  console.log('re-render search input')
  console.log(isLoading)
  const [searchValue, setSearchValue] = useState('')
  
  return (
    <div className={cx('wrapper', [className])}>
      <button className={cx('btn-search', { disabled: searchValue === '' })}>
        <FontAwesomeIcon icon={faSearch} className={cx('icon')} />
      </button>
      <input
        spellCheck={false}
        value={searchValue}
        type="text"
        className={cx('input')}
        placeholder="Nhập email hoặc số điện thoại"
        onChange={(e) => {
          e.target.value = e.target.value.trimStart()
          setSearchValue(e.target.value)
          handleChange(e.target.value)
        }}
      ></input>
      {isLoading && <span className={cx('spinner-border', 'custom-spinner')}></span>}
    </div>
  )
}

export default SearchInput
