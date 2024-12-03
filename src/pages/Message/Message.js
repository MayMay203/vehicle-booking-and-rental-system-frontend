import styles from './Message.module.scss'
import classNames from 'classnames/bind'
import { useLocation } from 'react-router-dom'
import TxtSearch from '~/components/TxtSearch'
import { Row, Col } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import Button from '~/components/Button'
import CardMessageRight from '~/components/CardMessageRight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import DetailMessage from '~/components/DetailMessage'
// import { over } from 'stompjs'
// import SockJS from 'sockjs-client'
import { useSelector } from 'react-redux'
import { getAllConversation } from '~/apiServices/messageService/getAllConversation'
import { Empty } from 'antd'
import { getAllMessagesInConversation } from '~/apiServices/messageService/getAllMessagesInConversation'
import Image from '~/components/Image'

const cx = classNames.bind(styles)
function Message() {
  const location = useLocation()
  const idConversation = location.state?.idConversation
  const [conversationList, setConversationList] = useState([])
  const [partnerConvers, setPartnerConvers] = useState({ name: '', avatar: '' })
  const [selectedConvers, setSelectedConvers] = useState(idConversation)
  const [buttonSelect, setButtonSelect] = useState('All')
  const [messages, setMessages] = useState([])
  const { currentUser } = useSelector((state) => state.user)
  const { currentRole } = useSelector((state) => state.menu)
  // let stompClient = null

  //connect websocket
  // useEffect(() => {
  //   function connect() {
  //     // ownerId = document.querySelector('#username-input').value.trim()
  //     // ownerType = document.querySelector('#userType-input').value.trim()

  //     // if (ownerId && ownerType) {/
  //       // console.log(access_token)
  //       const socket = new SockJS(`http://localhost:8080/ws`)
  //       stompClient = over(socket)

  //       const headers = {
  //         Authorization: 'Bearer ' + getAccessToken(), // Include Bearer token for authentication
  //       }

  //       // Kết nối STOMP với headers chứa token
  //       stompClient.connect(
  //         headers,
  //         (frame) => {
  //           console.log('Connected:', frame)
  //           // onConnected() // Gọi hàm này khi kết nối thành công
  //           stompClient.subscribe(`/user/${currentUser.id}/${currentRole}/queue/messages`, onNotificationRecieved)

  //           // Tạo đối tượng MessageDTO để gửi tin nhắn
  //           // const messageDTO = {
  //           //   recipient_type: 'CAR_RENTAL_PARTNER', // Loại người nhận, ví dụ
  //           //   recipientId: 1, // ID của người nhận
  //           //   senderId: 1, // ID của người gửi
  //           //   sender_type: 'USER', // Loại người gửi
  //           //   seen_at: null, // Có thể để null nếu chưa xem
  //           //   sendAt: new Date().toISOString(), // Thời gian gửi
  //           //   content: 'Hello! This is a test message.', // Nội dung tin nhắn
  //           //   conversation_id: 1, // ID của cuộc trò chuyện
  //           //   seen: false, // Tin nhắn chưa được xem
  //           // }

  //           // // Gửi tin nhắn đến server thông qua STOMP client
  //           // stompClient.send('/app/chat/send-message', {}, JSON.stringify(messageDTO))
  //         },
  //         (error) => {
  //           console.error('Connection error:', error)
  //         },
  //       )
  //   }
  //   connect()
  // }, [])

  useEffect(() => {
    async function fetchAllMessages() {
      const dataMsg = await getAllMessagesInConversation(selectedConvers)
      if (dataMsg) {
        setMessages(dataMsg)
      }
      const partnerConvers = conversationList.find((conversation) => conversation.conversationId === selectedConvers)
      if (partnerConvers) {
        setPartnerConvers({ name: partnerConvers.nameRepresentation, avatar: partnerConvers.avatarUrl })
      }
    }
    if (selectedConvers) fetchAllMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConvers])

  useEffect(() => {
    async function fetchAllConversation() {
      const conversations = await getAllConversation(currentUser.id, currentRole)
      if (conversations) {
        setConversationList(conversations.filter((conversation) => conversation.lastMessage !== null))
        const partnerConvers = conversations.find((conversation) => conversation.conversationId === selectedConvers)
        setPartnerConvers({ name: partnerConvers.nameRepresentation, avatar: partnerConvers.avatarUrl })
      }
    }
    if (currentUser.id) {
      fetchAllConversation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.id, currentRole])

  //Socket Client
  //

  // function onConnected() {
  //   stompClient.subscribe(`/user/${currentUser.id}/${currentRole}/queue/messages`, onNotificationRecieved)
  //   // stompClient.subscribe(`/user/${currentUser.id}/${currentRole}/notification`, (message) => {
  //   //   console.log('Notification: ', message)
  //   // })
  //   // findAndDisplayConnectedUser()
  // }

  // function onNotificationRecieved(payload) {
  //   const notification = JSON.parse(payload.body)
  //   console.log(notification)
  // }

  // async function findAndDisplayConnectedUser() {
  //   let response = null
  //   try {
  //     response = await httpRequest.get(
  //       `http://localhost:8080/api/v1/chat/get-connected-account?conversation_id=${conversation_id}&account_id=${ownerId}&role_account=${ownerType}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${getAccessToken()}`,
  //         },
  //       },
  //     )
  //   } catch (error) {
  //     console.error('Failed to update account: ', error)
  //   }

  //   if (response) {
  //     let connectedUser = response.data
  //     console.log(connectedUser)
  //   } else {
  //     console.log('No response received.')
  //   }
  // }

  // function onError() {}
  //

  const handleChooseConvers = (id) => {
    console.log(id)
    setSelectedConvers(id)
  }

  const handleSendMessage = () => {
    
  }

  return (
    <div className={cx('container', 'wrap-container')}>
      <div className={cx('d-flex', 'wrap-title-search')}>
        <span className={cx('title')}>Tin nhắn</span>
        <TxtSearch className={cx('search')} content='Tìm kiếm'></TxtSearch>
        {/* <span className={cx('title')}>Account</span> */}
        {/* <textarea id="username-input" className={cx('search')}></textarea>
        <textarea id="userType-input" className={cx('search')}></textarea>
        <Button id="class-name" rounded className={cx('btn', { active: buttonSelect === 'All  ' })} onClick={connect}>
          Save
        </Button> */}
      </div>
      <Row className={cx('wrap-messages-details', 'm-0 p-0')}>
        <Col lg="4" md="5" className={cx('wrap-list-messages', 'd-none', 'd-md-block')}>
          <div className={cx('d-flex', 'wrap-btn')}>
            <Button
              rounded
              className={cx('btn', { active: buttonSelect === 'All' })}
              onClick={() => setButtonSelect('All')}
            >
              Tất cả
            </Button>
            <Button
              rounded
              className={cx('btn', { active: buttonSelect === 'Unread' })}
              onClick={() => setButtonSelect('Unread')}
            >
              Chưa đọc
            </Button>
          </div>
          {conversationList.length > 0 ? (
            <div className={cx('list-message')}>
              {conversationList.map((convers) => (
                <CardMessageRight key={convers.conversationId} data={convers} handleChooseConvers={handleChooseConvers} isClicked={selectedConvers === convers.conversationId}/>
              ))}
            </div>
          ) : (
            <Empty style={{ marginTop: '70px' }} description="Không có tin nhắn nào gần đây" />
          )}
        </Col>
        <Col lg="8" md="7">
          <div className={cx('d-flex', 'wrap-recipient')}>
            <Image src={partnerConvers.avatar} className={cx('avatar')} alt="avatar" />
            <span className={cx('name', 'p-0')}>{partnerConvers.name}</span>
          </div>
          <div className={cx('wrap-detail-message')}>
            {messages.map((message) => (
              // sau thay 1 = id của người đnag đăng nhập
              <div key={message.id} className={cx({ 'message-sender': message.senderId === currentUser.id })}>
                <DetailMessage key={message.id} data={message} image={ partnerConvers.avatar}></DetailMessage>
              </div>
            ))}
          </div>
          <div className={cx('d-flex', 'wrap-sent')}>
            <div className={cx('input-content-sent')}>
              <input className={cx('')} type="text" placeholder="Viết tin nhắn" />
            </div>
            <button style={{padding: '6px', marginLeft: '6px'}} onClick={handleSendMessage}><FontAwesomeIcon icon={faPaperPlane} className={cx('icon-sent')}></FontAwesomeIcon></button>
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default Message
