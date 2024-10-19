import Button from '../Button'
import ListCardMessage from '../CardMessage'
import TxtSearch from '../TxtSearch'
import styles from './ModalChat.module.scss'
import classNames from 'classnames/bind'
import { memo, useState } from 'react'
const cx = classNames.bind(styles)
function ModalChat({ handleClose }) {
  const [buttonSelect, setButtonSelect] = useState('All')
  const handleClickButton = (name) => {
    setButtonSelect(name)
  }
  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('heading','mb-4')}>Tin nhắn</h2>
      <TxtSearch></TxtSearch>
      <div className={cx('d-flex', 'wrap-btn','mt-4')}>
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
        <ListCardMessage buttonSelect={buttonSelect} handleClose={handleClose}></ListCardMessage>
      </div>
    </div>
  )
}
export default memo(ModalChat)