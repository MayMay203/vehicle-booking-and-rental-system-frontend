import { Col, Row } from 'react-bootstrap'
import styles from './CardMessage.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import Image from '../Image'
import { useDispatch } from 'react-redux'
import { setMessageModalVisible } from '~/redux/slices/generalModalSlice'
const cx = classNames.bind(styles)
function CardMessage({ data, type, handleChangeType }) {
  const dispatch = useDispatch()
  return (
    <div
      className={cx('wrap-message', 'row', {
        'no-seen': !data.seen && !data.lastMessage.includes('Bạn'),
        seen: data.seen && !data.seen && !data.lastMessage.includes('Bạn'),
      })}
      onClick={() => {
        dispatch(setMessageModalVisible({ isOpen: true, conversationId: data.conversationId }))
        if (type === 'Unread') {
          handleChangeType('All')
        }
      }}
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
            {!data.seen && !data.lastMessage.includes('Bạn') && (
              <FontAwesomeIcon icon={faCircle} className={cx('icon-no-seen')} />
            )}
          </Col>
        </Row>
        <Row className={cx('d-flex')}>
          <Col
            xs="7"
            className={cx('message', { 'received-no-seen': !data.seen && !data.lastMessage.includes('Bạn') })}
          >
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