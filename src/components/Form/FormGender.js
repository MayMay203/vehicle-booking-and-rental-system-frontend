import styles from './Form.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function FormGender({ id, title, show = false, className, ...props }) {
  return (
    <div className={cx('form-group', { [className]: className })}>
      <label className={cx('form-label')} htmlFor={id}>
        {title}
      </label>
      <div className={cx('block-gender')}>
        <label className={cx('form-label')}>Giới tính</label>
        <div className={cx('gender')}>
          <div className={cx('form-gender')}>
            <label htmlFor="male">Nam</label>
            <input id="male" name="gender" value="male" type="radio" />
          </div>
          <div className={cx('form-gender')}>
            <label htmlFor="female">Nữ</label>
            <input id="female" name="gender" value='female' type="radio" />
          </div>
          <div className={cx('form-gender')}>
            <label htmlFor="other">Khác</label>
            <input id='other' name="gender" type="radio" value='gender' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormGender
