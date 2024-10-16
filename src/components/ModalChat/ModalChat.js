import Button from '../Button'
import ListCardMessage from '../CardMessage'
import TxtSearch from '../TxtSearch'
import styles from './ModalChat.module.scss'
import classNames from 'classnames/bind'
import { Modal } from 'react-bootstrap'
import { useState } from 'react'
const cx = classNames.bind(styles)
function ModalChat({ style, handleClose }) {
  const [buttonSelect, setButtonSelect] = useState('All');
  const handleClickButton = (name) =>{
    setButtonSelect(name);
  }
  return (
    <div className={cx('modal-chat', 'modal show')} style={{ display: 'block', ...style }}>
      <Modal.Dialog>
        <Modal.Header closeButton onClick={handleClose} className={cx('d-flex align-items-center')}>
          <Modal.Title className={cx('title')}>Tin nhắn</Modal.Title>
          <TxtSearch></TxtSearch>
        </Modal.Header>
        <Modal.Body>
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
          <div className={cx('body-message')}>
            <ListCardMessage buttonSelect={buttonSelect}></ListCardMessage>
          </div>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  )
}
export default ModalChat