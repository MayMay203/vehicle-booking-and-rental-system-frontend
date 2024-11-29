import styles from './Message.module.scss'
import classNames from 'classnames/bind'
import { useLocation } from 'react-router-dom'
import TxtSearch from '~/components/TxtSearch'
import { Row, Col } from 'react-bootstrap'
import { useState} from 'react'
import Button from '~/components/Button'
import CardMessageRight from '~/components/CardMessageRight'
import { images } from '~/assets/images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import DetailMessage from '~/components/DetailMessage'
import { over } from 'stompjs'
import SockJS from 'sockjs-client'
import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

const cx = classNames.bind(styles)
function Message() {
  //example data
  let conversation_id = 11
  let ownerId = null
  let ownerType = null
  // let selectedUser = null
  let stompClient = null
  let access_token = getAccessToken()

  //Socket Client
  //
  function connect(event) {
    event.preventDefault()
    ownerId = document.querySelector('#username-input').value.trim()
    ownerType = document.querySelector('#userType-input').value.trim()

    if (ownerId && ownerType) {
      console.log(access_token)
      const socket = new SockJS(`http://localhost:8080/ws`)
      stompClient = over(socket)

      const headers = {
        Authorization: 'Bearer ' + access_token, // Include Bearer token for authentication
      }

      // Kết nối STOMP với headers chứa token
      stompClient.connect(
        headers,
        (frame) => {
          console.log('Connected:', frame)
          onConnected() // Gọi hàm này khi kết nối thành công

          // Tạo đối tượng MessageDTO để gửi tin nhắn
          const messageDTO = {
            recipient_type: 'CAR_RENTAL_PARTNER', // Loại người nhận, ví dụ
            recipientId: 1, // ID của người nhận
            senderId: 1, // ID của người gửi
            sender_type: 'USER', // Loại người gửi
            seen_at: null, // Có thể để null nếu chưa xem
            sendAt: new Date().toISOString(), // Thời gian gửi
            content: 'Hello! This is a test message.', // Nội dung tin nhắn
            conversation_id: 1, // ID của cuộc trò chuyện
            seen: false, // Tin nhắn chưa được xem
          }

          // Gửi tin nhắn đến server thông qua STOMP client
          stompClient.send('/app/chat/send-message', {}, JSON.stringify(messageDTO))
        },
        (error) => {
          console.error('Connection error:', error)
        },
      )
    }
  }

  function onConnected() {
    stompClient.subscribe(`/user/${ownerId}/${ownerType}/queue/messages`, onNotificationRecieved)
    stompClient.subscribe(`/user/${ownerId}/${ownerType}/notification`, (message) => {
      console.log('Notification: ', message)
    })
    findAndDisplayConnectedUser()
  }
  function onNotificationRecieved(payload) {
    const notification = JSON.parse(payload.body)
    console.log(notification)
  }
  async function findAndDisplayConnectedUser() {
    let response = null
    try {
      response = await httpRequest.get(
        `http://localhost:8080/api/v1/chat/get-connected-account?conversation_id=${conversation_id}&account_id=${ownerId}&role_account=${ownerType}`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      )
    } catch (error) {
      console.error('Failed to update account: ', error)
    }

    if (response) {
      let connectedUser = response.data
      console.log(connectedUser)
    } else {
      console.log('No response received.')
    }
  }

  // function onError() {}
  //
  const [buttonSelect, setButtonSelect] = useState('All')
  const handleClickButton = (name) => {
    setButtonSelect(name)
  }
  const location = useLocation()
  const id = location.state?.id
  const [name, setName] = useState(location.state?.name)
  const [messages, setMessages] = useState([
    { id: 1, name: 'Bùi Thiên Bảo', message: 'Chào bạn....', time: '12h00, 23/08/2024', isSeen: false },
    { id: 2, name: 'Nguyễn Văn A', message: 'Xin chào!', time: '12h01, 23/08/2024', isSeen: false },
    { id: 3, name: 'Trần Thị B', message: 'Bạn khỏe không?', time: '12h02, 23/08/2024', isSeen: true },
    { id: 4, name: 'Lê Văn C', message: 'Tạm biệt!', time: '12h03, 23/08/2024', isSeen: false },
    { id: 5, name: 'Trần Thị B', message: 'Bạn khỏe không?', time: '12h02, 23/08/2024', isSeen: false },
    { id: 6, name: 'Lê Văn C', message: 'Tạm biệt!', time: '12h03, 23/08/2024', isSeen: false },
  ])
  const [idClicked, setIdClicked] = useState(id)
  const handleShowMessage = (id, name) => {
    setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === id ? { ...msg, isSeen: true } : msg)))
    setName(name)
    setIdClicked(id)
  }
  const filteredMessages = buttonSelect === 'Unread' ? messages.filter((msg) => !msg.isSeen) : messages

  const detailMessages = [
    { id: 1, message: 'Chào bạn....', time: '12h00, 23/08/2024', idSender: 2 },
    { id: 2, message: 'Xin chào!', time: '12h01, 23/08/2024', idSender: 3 },
    { id: 3, message: 'Bạn khỏe không?', time: '12h02, 23/08/2024', idSender: 2 },
    { id: 4, message: 'Tôi khỏe! Bạn dạo này thế nào?', time: '12h03, 23/08/2024', idSender: 3 },
    { id: 5, message: 'Chúc bạn sức khỏe', time: '12h02, 23/08/2024', idSender: 3 },
    { id: 6, message: 'Tạm biệt!', time: '12h03, 23/08/2024', idSender: 4 },
  ]
  return (
    <div className={cx('container', 'wrap-container')}>
      <div className={cx('d-flex', 'wrap-title-search')}>
        <span className={cx('title')}>Tin nhắn</span>
        <TxtSearch className={cx('search')}></TxtSearch>
        <span className={cx('title')}>Account</span>
        <textarea id="username-input" className={cx('search')}></textarea>
        <textarea id="userType-input" className={cx('search')}></textarea>
        <Button id="class-name" rounded className={cx('btn', { active: buttonSelect === 'All  ' })} onClick={connect}>
          Save
        </Button>
      </div>
      <Row className={cx('wrap-messages-details', 'm-0 p-0')}>
        <Col lg="4" md="5" className={cx('wrap-list-messages', 'd-none', 'd-md-block')}>
          <div className={cx('d-flex', 'wrap-btn')}>
            <Button
              rounded
              className={cx('btn', { active: buttonSelect === 'All' })}
              onClick={() => handleClickButton('All')}
            >
              Tất cả
            </Button>
            <Button
              rounded
              className={cx('btn', { active: buttonSelect === 'Unread' })}
              onClick={() => handleClickButton('Unread')}
            >
              Chưa đọc
            </Button>
          </div>
          <div className={cx('list-message')}>
            {filteredMessages.map((msg) => (
              <CardMessageRight
                key={msg.id}
                id={msg.id}
                isSeen={msg.isSeen}
                idClicked={idClicked}
                handleShowMessage={() => handleShowMessage(msg.id, msg.name)}
                name={msg.name}
                message={msg.message}
                time={msg.time}
              />
            ))}
          </div>
        </Col>
        <Col lg="8" md="7">
          <div className={cx('d-flex', 'wrap-recipient')}>
            <img src={images.avatar} className={cx('avatar')} alt="avatar" />
            <span className={cx('name', 'p-0')}>{name}</span>
          </div>
          <div className={cx('wrap-detail-message')}>
            {detailMessages.map((detailmsg) => (
              // sau thay 1 = id của người đnag đăng nhập
              <div className={cx({ 'message-sender': detailmsg.idSender === 3 })}>
                <DetailMessage
                  key={detailmsg.id}
                  isSender={detailmsg.idSender === 3}
                  message={detailmsg.message}
                  time={detailmsg.time}
                ></DetailMessage>
              </div>
            ))}
          </div>
          <div className={cx('d-flex', 'wrap-sent')}>
            <div className={cx('input-content-sent')}>
              <input className={cx('')} type="text" placeholder="Viết tin nhắn" />
            </div>
            <FontAwesomeIcon icon={faPaperPlane} className={cx('icon-sent')}></FontAwesomeIcon>
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default Message
