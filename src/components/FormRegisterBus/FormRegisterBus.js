import classNames from 'classnames/bind'
import styles from './FormRegisterBus.module.scss'
import { Col, ProgressBar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import FormInformation from './FormInformation'
import FormDocuments from './FormDocuments'
import FormConfirmRegister from './FormConfirmRegister'
const cx = classNames.bind(styles)
function FormRegisterBus() {
  const [now, setNow] = useState(0)
  const [showForm, setShowForm] = useState(0)
  const [activeNext, setActiveNext] = useState(false)
  const [activeNextFormInfor, setActiveNextFormInfor] = useState(false)
  const [activeNextFormDocs, setActiveNextFormDocs] = useState(false)
  const handleShowPreviousForm = () => {
    setShowForm(showForm - 1)
    setNow(now - 50)
  }
  const handleShowNextForm = () => {
    if (showForm === 0) {
      console.log('Lưu form infor')
    }
    setShowForm(showForm + 1)
    setNow(now + 50)
  }
  const [isRegister, setIsRegister] = useState(false)
  const handleRegister = () => {
    setIsRegister(true)
  }
  useEffect(() => {
    if (showForm === 0) {
      setActiveNext(activeNextFormInfor)
    } else if (showForm === 1) {
      setActiveNext(activeNextFormDocs)
    }
  }, [showForm, activeNextFormInfor, activeNextFormDocs])
  return (
    <div className={cx('wrap-form')}>
      <span className={cx('title-form')}>Đăng ký làm đối tác nhà xe</span>
      <ProgressBar now={now} label={`${now}%`} visuallyHidden className={cx('progress')} />
      {showForm === 0 && <FormInformation setActiveNextFormInfor={setActiveNextFormInfor}></FormInformation>}
      {showForm === 1 && <FormDocuments setActiveNextFormDocs={setActiveNextFormDocs}></FormDocuments>}
      {showForm === 2 && (
        <FormConfirmRegister isRegister={isRegister} handleRegister={handleRegister}></FormConfirmRegister>
      )}
      <div className="row">
        {showForm !== 0 && !isRegister && (
          <Col className="d-flex justify-content-start" onClick={() => handleShowPreviousForm()}>
            <FontAwesomeIcon icon={faAnglesLeft} className={cx('icon-previous')}></FontAwesomeIcon>
            <p className={cx('txt-previous')}>Quay lại</p>
          </Col>
        )}
        {showForm < 2 && (
          <Col
            className="d-flex justify-content-end"
            onClick={activeNext ? () => handleShowNextForm() : (e) => e.stopPropagation()}
          >
            <p className={cx('txt-next', { active: activeNext })}>Tiếp theo</p>
            <FontAwesomeIcon icon={faAnglesRight} className={cx('icon-next', { active: activeNext })}></FontAwesomeIcon>
          </Col>
        )}
      </div>
    </div>
  )
}
export default FormRegisterBus
