import classNames from "classnames/bind"
import styles from './SlideUtility.module.scss'
// import iconURL from '../../assets/images/couch-solid.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Col } from "react-bootstrap"
const cx = classNames.bind(styles)
function Utility({ icon, name, description, active, handleChooseUtility }) {
  return (
    <Col className={cx('wrap-utility', { active })} onClick={handleChooseUtility}>
      <div className={cx('icon-utility', { active })}>
        <FontAwesomeIcon icon={icon} className={cx('icon', { active })}></FontAwesomeIcon>
        {/* <img src={iconURL} alt="icon" className={cx('icon', { active })} /> */}
      </div>
      <span className={cx('name', { active })}>{name}</span>
    </Col>
  )
}
export default Utility