import styles from './Form.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function FormGender({ id, title, show = false, gender, handleGender, className, ...props }) {
  return (
    <div className={cx('form-group', { [className]: className })}>
      <label className={cx('form-label')} htmlFor={id}>
        {title}
      </label>
      <div className={cx('block-gender')}>
        <label className={cx('form-label')}>Giới tính</label>
        <div className={cx('gender')}>
          <div className={cx('form-gender')}>
            <input
              id="male"
              name="gender"
              value="MALE"
              type="radio"
              checked={gender === 'MALE'}
              onChange={(e) => handleGender(e.target.value)}
              hidden
              className={cx('radio-button')}
            />
            <label htmlFor="male" className={cx('label')}>
              Nam
            </label>
          </div>
          <div className={cx('form-gender')}>
            <input
              id="female"
              name="gender"
              value="FEMALE"
              type="radio"
              checked={gender === 'FEMALE'}
              onChange={(e) => handleGender(e.target.value)}
              hidden
              className={cx('radio-button')}
            />
            <label htmlFor="female" className={cx('label')}>
              Nữ
            </label>
          </div>
          <div className={cx('form-gender')}>
            <input
              id="other"
              name="gender"
              type="radio"
              value="ORTHER"
              checked={gender === 'ORTHER'}
              onChange={(e) => handleGender(e.target.value)}
              hidden
              className={cx('radio-button')}
            />
            <label htmlFor="other" className={cx('label')}>
              Khác
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormGender
