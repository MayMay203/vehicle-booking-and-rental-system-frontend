import {memo, useRef, useState } from 'react'
import styles from './Form.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'

const cx = classNames.bind(styles)

function FormInput({ id, type, title, error, isValid, value, autoComplete, className, password, ...props }) {
  const [showError, setShowError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef(null)

  const handleCheckValidity = () => {
    if (inputRef.current) {
      setShowError(!inputRef.current.checkValidity())
    }
    if (password) {
      setShowError(password !== value);
    }
  }

  const handleTogglePass = () => {
     setShowPassword(prev => !prev)
  }

  return (
    <div className={cx('form-group', { [className]: className })}>
      <label className={cx('form-label')} htmlFor={id}>
        {title}
      </label>
      <div className="position-relative">
        <input
          id={id}
          value={value}
          type={ type === 'password' && showPassword? 'text':type}
          ref={inputRef}
          className={cx('form-input')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isValid) {
              handleCheckValidity()
              e.preventDefault()
            }
          }}
          onBlur={handleCheckValidity}
          autoComplete={autoComplete?autoComplete:'true'}
          {...props}
        />
        {type === 'password' && (
          <button type="button" className={cx('btn-eye')} onClick={handleTogglePass}>
            {showPassword ?  <FontAwesomeIcon icon={faEyeSlash}/> : <FontAwesomeIcon icon={faEye}/>}
          </button>
        )}
      </div>
      {showError && <p className={cx('form-error')}>{error}</p>}
    </div>
  )
}

export default memo(FormInput)
