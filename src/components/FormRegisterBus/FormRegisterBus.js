import classNames from 'classnames/bind'
import styles from './FormRegisterBus.module.scss'
import { Col, ProgressBar, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import FormInformation from './FormInformation'
import FormDocuments from './FormDocuments'
import FormConfirmRegister from './FormConfirmRegister'
import { useDispatch } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import FormBank from '../FormBank'
import { registerBusPartner } from '~/apiServices/user/registerBusPartner'
import { toast } from 'react-toastify'
const cx = classNames.bind(styles)
function FormRegisterBus() {
  const dispatch = useDispatch()
  const [now, setNow] = useState(0)
  const [showForm, setShowForm] = useState(0)
  const [activeNext, setActiveNext] = useState(false)
  const [activeNextFormInfor, setActiveNextFormInfor] = useState(false)
  const [activeNextFormDocs, setActiveNextFormDocs] = useState(false)
  const [activeNextFormBank, setActiveNextFormBank] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleShowPreviousForm = () => {
    setShowForm(showForm - 1)
    setNow(now - 100 / 3)
  }
  const handleShowNextForm = () => {
    setShowForm(showForm + 1)
    setNow(now + 100 / 3)
  }
  const [isRegister, setIsRegister] = useState(false)
  
  const handleRegister = async (e) => {
    e.preventDefault()
    if (dispatch(checkLoginSession())) {
      setLoading(true)
      try {
        const businessPartnerInfo = {
          businessName: formInfor.nameBusiness,
          emailOfRepresentative: formInfor.gmail,
          nameOfRepresentative: formInfor.name,
          phoneOfRepresentative: formInfor.phonenumber,
          address: formInfor.location,
          partnerType: 'BUS_PARTNER',
          description: formDocs.description,
          urlFanpage: formInfor.urlFanpage,
          policies: formDocs.policy,
          bankAccount: {
            accountNumber: formBank.numberBank,
            accountHolderName: formBank.name,
            bankName: formBank.nameBank,
            partnerType: 'BUS_PARTNER',
          },
        }
        console.log('bus partner', businessPartnerInfo)
        const formDataRegisterBus = new FormData()
        formDataRegisterBus.append(
          'businessPartnerInfo',
          new Blob([JSON.stringify(businessPartnerInfo)], { type: 'application/json' }),
        )
        for (let [key, value] of formDataRegisterBus.entries()) {
          console.log(`${key}:`, value)
        }
        formDocs.businessImages.forEach((imageBase64, index) => {
          if(imageBase64 !== null){
            const base64DataBusiness = imageBase64.split(',')[1] // Lấy phần base64 từ chuỗi (loại bỏ phần data:image/png;base64,...)
            const byteCharactersBusiness = atob(base64DataBusiness) // Giải mã base64 thành chuỗi ký tự
            const byteNumbersBusiness = new Array(byteCharactersBusiness.length)
              .fill(0)
              .map((_, i) => byteCharactersBusiness.charCodeAt(i)) // Chuyển mỗi ký tự thành mã số byte
            const byteArrayBusiness = new Uint8Array(byteNumbersBusiness) // Tạo mảng Uint8Array từ mã byte
            const imageBlobBusiness = new Blob([byteArrayBusiness], { type: 'image/png' }) // Tạo Blob từ mảng byte

            formDataRegisterBus.append('businessImages', imageBlobBusiness, `businessImages${index + 1}.png`)
          }
        })

        const base64DataAvatar = formDocs.imgAvatar.split(',')[1]
        const byteCharactersAvatar = atob(base64DataAvatar)
        const byteNumbersAvatar = new Array(byteCharactersAvatar.length)
          .fill(0)
          .map((_, i) => byteCharactersAvatar.charCodeAt(i))
        const byteArrayAvatar = new Uint8Array(byteNumbersAvatar)
        const imageBlobAvatar = new Blob([byteArrayAvatar], { type: 'image/png' })
        formDataRegisterBus.append('avatar', imageBlobAvatar, 'avatarBusPartner.png')

        const base64DataLicense = formDocs.imgLicense.split(',')[1]
        const byteCharactersLicense = atob(base64DataLicense)
        const byteNumbersLicense = new Array(byteCharactersLicense.length)
          .fill(0)
          .map((_, i) => byteCharactersLicense.charCodeAt(i))
        const byteArrayLicense = new Uint8Array(byteNumbersLicense)
        const imageBlobLicense = new Blob([byteArrayLicense], { type: 'image/png' })
        formDataRegisterBus.append('businessLicense', imageBlobLicense, 'businessLicense.png')

        for (let [key, value] of formDataRegisterBus.entries()) {
          console.log(`${key}:`, value)
        }
        const response = await registerBusPartner(formDataRegisterBus)
        if (response) {
          setIsRegister(true)
          console.log('Đăng ký đối tác thành công!', response)
        }
      } catch (error) {
        console.log('Đăng ký thất bại:')
        console.log(error)
        // if (message === 'You have already registered this business partner') {
        toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 1000, position: 'top-center' })
        // }
      } finally {
        setLoading(false) // Ẩn Spinner sau khi xử lý xong
      }
    }
  }
  useEffect(() => {
    if (showForm === 0) {
      setActiveNext(activeNextFormInfor)
    } else if (showForm === 1) {
      setActiveNext(activeNextFormDocs)
    } else if (showForm === 2) {
      setActiveNext(activeNextFormBank)
    }
  }, [showForm, activeNextFormInfor, activeNextFormDocs, activeNextFormBank])
  const [formInfor, setFormInfor] = useState({
    nameBusiness: '',
    name: '',
    phonenumber: '',
    gmail: '',
    location: '',
    urlFanpage: '',
  })
  const [formDocs, setFormDocs] = useState({
    description: '',
    imgAvatar: '',
    imgLicense: '',
    businessImages: [''],
    policy: [''],
  })
  const [formConfirm, setFormConfirm] = useState({
    regulation: false,
    security: false,
    term: false,
    punishment: false,
  })
  const [formBank, setFormBank] = useState({
    name: '',
    numberBank: '',
    nameBank: '',
    commit: false,
  })
  const handleFormInforChange = (updatedDataInfor) => {
    setFormInfor(updatedDataInfor)
    console.log('formInfor:', formInfor)
  }
  const handleFormDocsChange = (updatedDataDocs) => {
    setFormDocs(updatedDataDocs)
    console.log('formDocs:', formDocs)
  }
  const handleFormBankChange = (updatedDataBank) => {
    setFormBank(updatedDataBank)
    console.log('formBank:', formBank)
  }
  const handleFormConfirmChange = (updatedDataConfirm) => {
    setFormConfirm(updatedDataConfirm)
    console.log('formConfirm:', formConfirm)
  }
  return (
    <div className={cx('wrap-form')}>
      <span className={cx('title-form')}>Đăng ký làm đối tác nhà xe</span>
      <ProgressBar now={now} label={`${now}%`} visuallyHidden className={cx('progress')} />
      {loading && <Spinner animation="border" variant="primary" />}
      {showForm === 0 && (
        <FormInformation
          setActiveNextFormInfor={setActiveNextFormInfor}
          formInfor={formInfor}
          handleFormInforChange={handleFormInforChange}
        ></FormInformation>
      )}
      {showForm === 1 && (
        <FormDocuments
          setActiveNextFormDocs={setActiveNextFormDocs}
          formDocs={formDocs}
          handleFormDocsChange={handleFormDocsChange}
        ></FormDocuments>
      )}
      {showForm === 2 && (
        <div className={cx('margin-top')}>
          <span className={cx('txt-large', 'margin-top', 'margin-bottom')}>Tài khoản ngân hàng</span>
          <FormBank
            noButton={true}
            setActiveNextFormBank={setActiveNextFormBank}
            formBank={formBank}
            handleFormBankChange={handleFormBankChange}
          ></FormBank>
        </div>
      )}
      {showForm === 3 && (
        <FormConfirmRegister
          isRegister={isRegister}
          formData={formConfirm}
          handleFormConfirmChange={handleFormConfirmChange}
          handleRegister={handleRegister}
        ></FormConfirmRegister>
      )}
      <div className="row">
        {showForm !== 0 && !isRegister && (
          <Col className="d-flex justify-content-start" onClick={() => handleShowPreviousForm()}>
            <FontAwesomeIcon icon={faAnglesLeft} className={cx('icon-previous')}></FontAwesomeIcon>
            <p className={cx('txt-previous')}>Quay lại</p>
          </Col>
        )}
        {showForm < 3 && (
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
