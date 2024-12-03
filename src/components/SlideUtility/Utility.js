import classNames from "classnames/bind"
import styles from './SlideUtility.module.scss'
// import iconURL from '../../assets/images/couch-solid.svg'
import { Col, Image } from "react-bootstrap"
const cx = classNames.bind(styles)
function Utility({ image, name, description, active, handleChooseUtility }) {
  return (
    <Col className={cx('wrap-utility', { active })} onClick={handleChooseUtility}>
      {/* <div className={cx('icon-utility', { active })}> */}
      {/* <FontAwesomeIcon icon={icon} className={cx('icon', { active })}></FontAwesomeIcon> */}
      {/* <img src={image} alt="icon" className={cx('icon', { active })} /> */}
      <Image src={image} roundedCircle alt="image-utility" className={cx('icon', { active })} />
      {/* </div> */}
      <span className={cx('name', { active })}>{name}</span>
    </Col>
  )
}
export default Utility