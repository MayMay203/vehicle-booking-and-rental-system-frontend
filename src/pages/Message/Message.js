import styles from './Message.module.scss'
import classNames from 'classnames/bind'
// import { useLocation } from 'react-router-dom'
import TxtSearch from '~/components/TxtSearch'
import { Row, Col, Modal } from 'react-bootstrap'
import { useCallback, useEffect, useRef, useState } from 'react'
import Button from '~/components/Button'
import CardMessageRight from '~/components/CardMessageRight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import DetailMessage from '~/components/DetailMessage'
import { over } from 'stompjs'
import SockJS from 'sockjs-client'
import { useDispatch, useSelector } from 'react-redux'
import { Empty } from 'antd'
import { getAllMessagesInConversation } from '~/apiServices/messageService/getAllMessagesInConversation'
import Image from '~/components/Image'
import { getAccessToken } from '~/utils/cookieUtils'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { setMessageModalVisible } from '~/redux/slices/generalModalSlice'
import { updateUnseenMessages } from '~/apiServices/messageService/updateUnseenMessages'
import { fetchAllConversationsByAcc } from '~/redux/slices/conversationSlice'

const cx = classNames.bind(styles)
function Message() {
  const { conversationId, isOpen } = useSelector((state) => state.generalModal.messageModal)
  const [partnerConvers, setPartnerConvers] = useState({ name: '', avatar: '', role: '', accountId: '' })
  const [selectedConvers, setSelectedConvers] = useState(conversationId)
  const [buttonSelect, setButtonSelect] = useState('All')
  const [messages, setMessages] = useState([])
  const { currentUser } = useSelector((state) => state.user)
  const { currentRole } = useSelector((state) => state.menu)
  const [filterList, setFilterList] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [messageText, setMessageText] = useState('')
  const stompClientRef = useRef(null)
  const detailMessRef = useRef(null)
  const dispatch = useDispatch()
  const { conversationList } = useSelector((state) => state.conversation)

  useEffect(() => {
    setSelectedConvers(conversationId)
  }, [conversationId])

  const onNotificationRecieved = useCallback((payload) => {
    const newMessage = JSON.parse(payload.body)
    console.log('Received message:', newMessage)
    if (newMessage.conversation_id === selectedConvers) setMessages((prev) => [...prev, newMessage])
    setMessages((prev) => [...prev])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //connect websocket
  useEffect(() => {
    function connect() {
      if (!stompClientRef.current && currentUser.id) {
        // Kiểm tra nếu chưa có kết nối WebSocket
        const socket = new SockJS(`http://localhost:8080/ws`)
        stompClientRef.current = over(socket)

        const headers = {
          Authorization: 'Bearer ' + getAccessToken(),
        }

        // Kết nối STOMP với headers chứa token
        stompClientRef.current.connect(
          headers,
          (frame) => {
            console.log('Connected:', frame)

            // Đăng ký nhận tin nhắn
            stompClientRef.current.subscribe(
              `/user/${currentUser.id}/${currentRole}/queue/messages`,
              onNotificationRecieved,
            )
          },
          (error) => {
            console.error('Connection error:', error)
          },
        )
      }
    }

    if (dispatch(checkLoginSession())) {
      connect()
    }

    return () => {
      // Đảm bảo ngắt kết nối khi component bị unmount
      if (stompClientRef.current) {
        stompClientRef.current.disconnect(() => {
          console.log('WebSocket disconnected')
        })
        stompClientRef.current = null
      }
    }
  }, [currentUser.id, currentRole, onNotificationRecieved, dispatch])

  const handleReceiveSearch = useCallback((value) => {
    setSearchValue(value)
  }, [])

  useEffect(() => {
    if (detailMessRef.current) {
      detailMessRef.current.scrollTo({
        top: detailMessRef.current.scrollHeight, // Cuộn tới cuối phần tử
        behavior: 'smooth', // Cuộn mượt
      })
    }
  }, [messages])

  useEffect(() => {
    async function fetchAllMessages() {
      if (dispatch(checkLoginSession())) {
        const dataMsg = await getAllMessagesInConversation(selectedConvers)
        if (dataMsg) {
          setMessages(dataMsg)
        }
        const partnerConvers = conversationList.find((conversation) => conversation.conversationId === selectedConvers)
        if (partnerConvers) {
          setPartnerConvers({
            name: partnerConvers?.nameRepresentation,
            avatar: partnerConvers?.avatarUrl,
            role: partnerConvers?.roleAccount,
            accountId: partnerConvers?.accountId,
          })
          await updateUnseenMessages(selectedConvers, partnerConvers.accountId, partnerConvers.roleAccount)
        }
      }
    }
    if (selectedConvers) fetchAllMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConvers])

  useEffect(() => {
    async function fetchAllConversation() {
      if (dispatch(checkLoginSession())) {
        if (partnerConvers.accountId && partnerConvers.role) {
          await updateUnseenMessages(selectedConvers, partnerConvers.accountId, partnerConvers.role)
        }
        dispatch(fetchAllConversationsByAcc({ accountId: currentUser.id, roleAccount: currentRole }))
        if (conversationList.length > 0) {
          // if (!idConversation) setSelectedConvers(conversations?.[0].idConversation)
          const partnerConvers = conversationList.find(
            (conversation) => String(conversation.conversationId) === String(selectedConvers),
          )
          // setConversationList(conversationList.filter((conversation) => !conversation.lastMessage.includes('null')))
          setPartnerConvers({
            name: partnerConvers?.nameRepresentation,
            avatar: partnerConvers?.avatarUrl,
            role: partnerConvers?.roleAccount,
            accountId: partnerConvers?.accountId,
          })
        }
      }
    }
    if (currentUser.id) {
      fetchAllConversation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.id, currentRole, messages])

  useEffect(() => {
    setFilterList(
      conversationList.filter((conversation) => {
        const matchesSearch = conversation.nameRepresentation?.toLowerCase().includes(searchValue.toLowerCase())
        const matchesType =
          buttonSelect === 'All' ||
          (buttonSelect === 'Unread' && conversation.seen === false && !conversation.lastMessage.includes('Bạn'))
        return matchesSearch && matchesType
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, conversationList, buttonSelect])

  const handleChooseConvers = (id) => {
    setSelectedConvers(id)
  }
  //  console.log("onHde", ...props)
  const handleSendMessage = () => {
    // Tạo đối tượng MessageDTO để gửi tin nhắn
    const messageDTO = {
      recipient_type: partnerConvers.role, // Loại người nhận, ví dụ
      recipientId: partnerConvers.accountId, // ID của người nhận
      senderId: currentUser.id, // ID của người gửi
      sender_type: currentRole, // Loại người gửi
      seen_at: null, // Có thể để null nếu chưa xem
      sendAt: new Date().toISOString(), // Thời gian gửi
      content: messageText, // Nội dung tin nhắn
      conversation_id: selectedConvers, // ID của cuộc trò chuyện
      seen: false, // Tin nhắn chưa được xem
    }
    // // Gửi tin nhắn đến server thông qua STOMP client
    stompClientRef.current.send('/app/chat/send-message', {}, JSON.stringify(messageDTO))
    setMessages((prev) => [...prev, messageDTO])
    setMessageText('')
  }

  const handleChangeType = (value) => {
    setButtonSelect(value)
  }

  return (
    <Modal
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={isOpen}
      onHide={() => dispatch(setMessageModalVisible({ isOpen: false }))}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className={cx('container', 'wrap-container', 'p-0')}>
          <div className={cx('d-flex', 'wrap-title-search')}>
            <span className={cx('title')}>Tin nhắn</span>
            <TxtSearch
              className={cx('search')}
              content="Tìm kiếm"
              handleReceiveSearch={handleReceiveSearch}
            ></TxtSearch>
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
              {filterList.length > 0 ? (
                <div className={cx('list-message')}>
                  {filterList.map((convers) => (
                    <CardMessageRight
                      key={convers.conversationId}
                      data={convers}
                      handleChooseConvers={handleChooseConvers}
                      isClicked={selectedConvers === convers.conversationId}
                      type={buttonSelect}
                      handleChangeType={handleChangeType}
                    />
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
              <div className={cx('wrap-detail-message')} ref={detailMessRef}>
                {messages.map((message, index) => (
                  <div key={index} className={cx({ 'message-sender': message.senderId === currentUser.id })}>
                    <DetailMessage data={message} image={partnerConvers.avatar}></DetailMessage>
                  </div>
                ))}
              </div>
              <div className={cx('d-flex', 'wrap-sent')}>
                <div className={cx('input-content-sent')}>
                  <input
                    value={messageText}
                    onChange={(e) => {
                      e.target.value = e.target.value.trimStart()
                      setMessageText(e.target.value)
                    }}
                    type="text"
                    placeholder="Viết tin nhắn"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage()
                      }
                    }}
                  />
                </div>
                <button
                  style={{ padding: '6px', marginLeft: '6px' }}
                  onClick={handleSendMessage}
                  disabled={messageText === ''}
                >
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className={cx('icon-sent')}
                    style={{ color: messageText === '' ? '#ccc' : '#FF7F50' }}
                  ></FontAwesomeIcon>
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  )
}
export default Message
