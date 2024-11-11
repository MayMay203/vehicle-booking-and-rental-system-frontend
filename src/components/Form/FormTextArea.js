import { useRef, useState } from 'react'
import styles from './Form.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function FormTextArea({
  id,
  title,
  rows = 3,
  show = false,
  className,
  customWidth = false,
  star = false,
  error,
  value,
  ...props
}) {
  const [showError, setShowError] = useState(false)
  const areaRef = useRef(null)

  const handleCheckValidity = () => {
    if (areaRef.current) {
      const isValid = areaRef.current.value.trim() !== ''
      setShowError(!isValid)
    }
  }

  return (
    <div className={cx('form-group', { [className]: className })}>
      <label className={cx('form-label')} htmlFor={id}>
        {title}
        {star && <span className={cx('star')}>*</span>}
      </label>
      <textarea
        value={value}
        id={id}
        rows={rows}
        className={cx('form-textarea', { customWidth })}
        {...props}
        required
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.type !== 'submit') {
            handleCheckValidity()
            e.preventDefault()
          }
        }}
        onBlur={handleCheckValidity}
        ref={areaRef}
        spellCheck={false}
      ></textarea>
      {showError && <p className={cx('form-error')}>{error}</p>}
    </div>
  )
}

export default FormTextArea
