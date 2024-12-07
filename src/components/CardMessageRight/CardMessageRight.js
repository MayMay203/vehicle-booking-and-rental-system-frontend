import { Col, Row } from 'react-bootstrap'
import styles from './CardMessageRight.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import Image from '../Image'
import { fetchAllConversationsByAcc } from '~/redux/slices/conversationSlice'
import { useDispatch, useSelector } from 'react-redux'
const cx = classNames.bind(styles)
function CardMessageRight({ data, handleChooseConvers, isClicked, type, handleChangeType }) {
  const dispatch = useDispatch()
   const { currentUser } = useSelector((state) => state.user)
   const { currentRole } = useSelector((state) => state.menu)
  return (
    <div
      className={cx('wrap-message', 'row', {
        'no-seen': !data.seen && !data.lastMessage.includes('Bạn'),
        seen: data.seen,
        isClicked,
      })}
      onClick={() => {
        handleChooseConvers(data.conversationId)
        dispatch(fetchAllConversationsByAcc({ accountId: currentUser.id, roleAccount: currentRole }))
        if (type === 'Unread') {
          handleChangeType('All')
        }
      }}
    >
      <Col xs="3" className={cx('d-flex align-items-center')}>
        <Image src={data.avatarUrl} className={cx('avatar')} alt="avatar" />
      </Col>
      <Col xs="9" className={cx('')}>
        <Row className={cx('d-flex')}>
          <Col xs="10" className={cx('name', 'p-0', 'mb-2')}>
            {data.nameRepresentation}
          </Col>
          <Col xs="2" className={cx('text-end')}>
            {!data.seen && !data.lastMessage.includes('Bạn') && (
              <FontAwesomeIcon icon={faCircle} className={cx('icon-no-seen')} />
            )}
          </Col>
        </Row>
        <Row className={cx('message', { 'received-no-seen': !data.seen && !data.lastMessage.includes('Bạn') })}>
          {data.lastMessage}
        </Row>
        <Row className={cx('time')}>{data.sendAt}</Row>
      </Col>
    </div>
  )
}
export default CardMessageRight
