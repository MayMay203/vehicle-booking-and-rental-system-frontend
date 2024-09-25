import styles from './Form.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function FormInput({ id, title, error, show = false, className, ...props }) {
  return (
    <div className={cx('form-group', { [className]: className })}>
      <label className={cx('form-label')} htmlFor={id}>
        {title}
      </label>
      <input
        id={id}
        className={cx('form-input')}
        {...props}
        required
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.type !== 'submit') {
            e.preventDefault()
          }
        }}
      ></input>
      <p
        className={cx('form-error', {
          show,
        })}
      >
        {error}
      </p>
    </div>
  )
}

export default FormInput
