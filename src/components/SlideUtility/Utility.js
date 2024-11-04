import classNames from "classnames/bind"
import styles from './SlideUtility.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Col } from "react-bootstrap"
const cx = classNames.bind(styles)
function Utility({icon, name, description}){
    return (
      <Col className={cx('wrap-utility')}>
        <div className={cx('icon-utility')}>
          <FontAwesomeIcon icon={icon} className={cx('icon')}></FontAwesomeIcon>
        </div>
        <span className={cx('name')}>{name}</span>
      </Col>
    )
}
export default Utility