import { Col, Row } from 'react-bootstrap'
import styles from './CardMessage.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { config } from '~/config'
import Image from '../Image'
const cx = classNames.bind(styles)
function CardMessage({ data }) {
  const navigate = useNavigate()
  return (
    <div
      className={cx('wrap-message', 'row', { 'no-seen': !data.seen, seen: data.seen })}
      onClick={() => navigate(config.routes.message, { state: { idConversation: data.conversationId } })}
    >
      <Col xs="2">
        <Image src={data.avatarUrl} className={cx('avatar')} alt="avatar" />
      </Col>
      <Col xs="10" className={cx('')}>
        <Row className={cx('d-flex')}>
          <Col xs="10" className={cx('name')}>
            {data.nameRepresentation}
          </Col>
          <Col xs="2" className={cx('text-end')}>
            {!data.seen && <FontAwesomeIcon icon={faCircle} className={cx('icon-no-seen')} />}
          </Col>
        </Row>
        <Row className={cx('d-flex')}>
          <Col xs="7" className={cx('message')}>
            {data.lastMessage}
          </Col>
          <Col xs="5" className={cx('time')}>
            {data.sendAt}
          </Col>
        </Row>
      </Col>
    </div>
  )
}
export default CardMessage