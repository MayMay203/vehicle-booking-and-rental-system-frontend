import classNames from 'classnames/bind'
import styles from './FormRegisterDriver.module.scss'
import { Col, ProgressBar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import FormInformation from './FormInformation'
import FormDocuments from './FormDocuments'
import FormConfirmRegister from './FormConfirmRegister'
import { toast } from 'react-toastify'
const cx = classNames.bind(styles)
function FormRegisterDriver() {
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
  const [formDataInfor, setFormDataInfor] = useState({})

  const updateFormDataInfor = (data) => {
    setFormDataInfor(data)
  }
  const handleRegister = async (e) => {
    try {
      const driverInfo = {
        citizen: {
          citizenId: '0456789011',
          dateOfIssue: '01-04-2020',
          placeOfIssue: 'Đà Nẵng',
          expiryDate: '10-10-2028',
          permanentAddress: '13 Trưng Nữ Vương, Hải Châu, Đà Nẵng',
          location: formDataInfor.location,
        },
        driverLicense: {
          driverLicenseNumber: '48123019281',
          licenseType: 'A1',
          issueDateLicense: '10-08-2022',
        },
        vehicle: {
          licensePlateNumber: '43F-96999',
          vehicleType: 'Xe máy',
        },
        relative: {
          nameOfRelative: 'Nguyễn Hữu Khang',
          phoneOfRelative: '0906172811',
          relationship: 'Cha con',
        },
        bankAccount: {
          accountNumber: '123456789',
          accountHolderName: 'Nguyễn Hữu Thọ',
          bankName: 'Ngân hàng ABC',
        },
      }
      // const formData = new FormData()
      // formData.append('driverInfo', new Blob([JSON.stringify(accountInfo)], { type: 'application/json' }))
      console.log(driverInfo)
      // await registerInfo(formData)

      // toast.success('Đăng ký thông tin thành công', { autoClose: 1500 })
      // dispatch(setAuthModalVisible({ modalName: modalNames.INFO, isVisible: false }))
      // reset()
      // dispatch(setAuthModalVisible({ modalName: modalNames.LOGIN, isVisible: true }))
    } catch (message) {
      toast.error('Đã có lỗi xảy ra. Vui lòng thử lại hoặc bỏ qua bước này', { autoClose: 2000 })
    }

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
      <span className={cx('title-form')}>Đăng ký làm đối tác tài xế</span>
      <ProgressBar now={now} label={`${now}%`} visuallyHidden className={cx('progress')} />
      {showForm === 0 && (
        <FormInformation
          setActiveNextFormInfor={setActiveNextFormInfor}
          updateFormDataInfor={updateFormDataInfor}
        ></FormInformation>
      )}
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
export default FormRegisterDriver
