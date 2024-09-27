import styles from './Form.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function FormTextArea({ id, title, show = false, className, customWidth = false, ...props }) {
  return (
    <div className={cx('form-group', { [className]: className })}>
      <label className={cx('form-label')} htmlFor={id}>
        {title}
      </label>
      <textarea
        maxLength={80}
        id={id}
        rows={3}
        className={cx('form-textarea', { customWidth })}
        {...props}
        required
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.type !== 'submit') {
            e.preventDefault()
          }
        }}
      ></textarea>
    </div>
  )
}

export default FormTextArea
