import { Col, Row } from 'react-bootstrap'
import styles from './CardMessage.module.scss'
import classNames from 'classnames/bind'
import { images } from '~/assets/images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
const cx = classNames.bind(styles)
function CardMessage({ isSeen, handleShowMessage, name, message, time }) {
  return (
    <div className={cx('wrap-message', 'row', { 'no-seen': !isSeen, seen: isSeen })} onClick={handleShowMessage}>
      <Col xs="2" className={cx('d-flex align-items-center')}>
        <img src={images.avatar} className={cx('avatar')} alt="avatar" />
      </Col>
      <Col xs="10" className={cx('')}>
        <Row className={cx('d-flex')}>
          <Col xs="10" className={cx('name')}>
            {name}
          </Col>
          <Col xs="2" className={cx('text-end')}>
            {!isSeen && <FontAwesomeIcon icon={faCircle} className={cx('icon-no-seen')} />}
          </Col>
        </Row>
        <Row className={cx('d-flex')}>
          <Col xs="7" className={cx('message')}>
            {message}
          </Col>
          <Col xs="5" className={cx('time')}>
            {time}
          </Col>
        </Row>
      </Col>
    </div>
  )
}
export default CardMessage