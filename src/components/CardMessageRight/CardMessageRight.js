import { Col, Row } from 'react-bootstrap'
import styles from './CardMessageRight.module.scss'
import classNames from 'classnames/bind'
import { images } from '~/assets/images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
const cx = classNames.bind(styles)
function CardMessageRight({ id, isSeen, handleShowMessage, idClicked, name, message, time }) {
  return (
    <div
      className={cx('wrap-message', 'row', { 'no-seen': !isSeen, seen: isSeen, isClicked: idClicked===id ? true : false })}
      onClick={handleShowMessage}
    >
      <Col xs="3" className={cx('d-flex align-items-center')}>
        <img src={images.avatar} className={cx('avatar')} alt="avatar" />
      </Col>
      <Col xs="9" className={cx('')}>
        <Row className={cx('d-flex')}>
          <Col xs="10" className={cx('name', 'p-0')}>
            {name}
          </Col>
          <Col xs="2" className={cx('text-end')}>
            {!isSeen && <FontAwesomeIcon icon={faCircle} className={cx('icon-no-seen')} />}
          </Col>
        </Row>
        <Row className={cx('message')}>{message}</Row>
        <Row className={cx('time')}>{time}</Row>
      </Col>
    </div>
  )
}
export default CardMessageRight
