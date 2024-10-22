import classNames from 'classnames/bind'
import styles from './NoteBeforeRegister.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
const cx = classNames.bind(styles)
function NoteBeforeRegister({ content, sub_contents, icon, styletxt, style_margin }) {
  return (
    <div>
      <div className={cx('item', style_margin)}>
        <FontAwesomeIcon
          icon={icon === 'faCircleCheck' ? faCircleCheck : icon === 'faCircleXmark' ? faCircleXmark : faCircle}
          className={cx({ 'icon-check': icon === 'faCircleCheck' }, { 'icon-xmark': icon === 'faCircleXmark'}, styletxt)}
        ></FontAwesomeIcon>
        <p className={cx('content', styletxt)}>{content}</p>
      </div>
      {sub_contents.map((sub_content) => (
        <div key={sub_content.id} className={cx('item-sub', style_margin)}>
          <FontAwesomeIcon icon={faCircle} className={cx('icon-circle')}></FontAwesomeIcon>
          <p className={cx('sub-content', styletxt)}>{sub_content.value}</p>
        </div>
      ))}
    </div>
  )
}
export default NoteBeforeRegister