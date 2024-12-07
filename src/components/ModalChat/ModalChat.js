import { useSelector } from 'react-redux'
import Button from '../Button'
import ListCardMessage from '../CardMessage'
import TxtSearch from '../TxtSearch'
import styles from './ModalChat.module.scss'
import classNames from 'classnames/bind'
import { memo, useCallback, useEffect, useState } from 'react'
import { getAllConversation } from '~/apiServices/messageService/getAllConversation'
const cx = classNames.bind(styles)
function ModalChat({ handleClose }) {
  const [buttonSelect, setButtonSelect] = useState('All')
  const [conversationList, setConversationList] = useState([])
  const [filterList, setFilterList] = useState([])
  const { currentUser } = useSelector((state) => state.user)
  const { currentRole } = useSelector((state) => state.menu)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    async function fetchAllConversation() {
      const conversations = await getAllConversation(currentUser.id, currentRole)
      if (conversations) {
        setConversationList(conversations.filter((conversation) => !conversation.lastMessage.includes('null')))
      }
    }
    fetchAllConversation()
  }, [currentUser.id, currentRole])

 useEffect(() => {
   setFilterList(
     conversationList.filter((conversation) => {
       const matchesSearch = conversation.nameRepresentation.toLowerCase().includes(searchValue.toLowerCase())
       const matchesType =
         buttonSelect === 'All' ||
         (buttonSelect === 'Unread' && conversation.seen === false && !conversation.lastMessage.includes('Bạn'))
       return matchesSearch && matchesType
     }),
   )
   // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [searchValue, conversationList, buttonSelect])

  const handleClickButton = (name) => {
    setButtonSelect(name)
  }

  const handleReceiveSearch = useCallback((value) => {
    setSearchValue(value)
  },[])

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('heading', 'mb-4')}>Tin nhắn</h2>
      <TxtSearch content={'Tìm kiếm người nhắn'} handleReceiveSearch={handleReceiveSearch}></TxtSearch>
    <div className={cx('d-flex', 'wrap-btn', 'mt-4')}>
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
      <div className={cx('body-message')}>
        <ListCardMessage
          buttonSelect={buttonSelect}
          conversationList={filterList}
          handleClose={handleClose}
        ></ListCardMessage>
      </div>
    </div>
  )
}
export default memo(ModalChat)
