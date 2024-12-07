import {useSelector } from 'react-redux'
import Button from '../Button'
import ListCardMessage from '../CardMessage'
import TxtSearch from '../TxtSearch'
import styles from './ModalChat.module.scss'
import classNames from 'classnames/bind'
import { memo, useCallback, useEffect, useState } from 'react'
const cx = classNames.bind(styles)
function ModalChat({ handleClose }) {
  const [buttonSelect, setButtonSelect] = useState('All')
  const [filterList, setFilterList] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const { conversationList } = useSelector((state) => state.conversation)

  useEffect(() => {
    setFilterList(
      conversationList.filter(convers => !convers.lastMessage.includes('null')).filter((conversation) => {
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
  }, [])

  const handleChangeType = (value) => {
    setButtonSelect(value)
  }

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
          handleChangeType={handleChangeType}
          type={buttonSelect}
        ></ListCardMessage>
      </div>
    </div>
  )
}
export default memo(ModalChat)
