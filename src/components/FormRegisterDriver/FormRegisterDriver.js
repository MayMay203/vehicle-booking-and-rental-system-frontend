import classNames from 'classnames/bind'
import styles from './FormRegisterDriver.module.scss'
import { Col, ProgressBar, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import FormInformation from './FormInformation'
import FormDocuments from './FormDocuments'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import FormConfirmRegister from './FormConfirmRegister'
import { toast } from 'react-toastify'
import { registerDriverPartner } from '~/apiServices/user/registerDriverPartner'
const cx = classNames.bind(styles)
function appendImageToFormData(base64Image, fieldName, formData, filename) {
  // Kiểm tra nếu base64Image là một mảng, lấy phần tử đầu tiên nếu đúng
  if (Array.isArray(base64Image)) {
    base64Image = base64Image[0] // Lấy phần tử đầu tiên của mảng
  }

  // Kiểm tra nếu base64Image là một chuỗi
  if (typeof base64Image !== 'string') {
    console.error(`Dự kiến là chuỗi base64, nhưng nhận được ${typeof base64Image}:`, base64Image)
    return // Bỏ qua việc xử lý nếu không phải chuỗi
  }

  const base64Data = base64Image.split(',')[1] // Lấy phần chuỗi base64
  const byteCharacters = atob(base64Data) // Giải mã base64 thành chuỗi
  const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i))
  const byteArray = new Uint8Array(byteNumbers) // Tạo mảng byte từ các ký tự
  const imageBlob = new Blob([byteArray], { type: 'image/png' }) // Tạo Blob từ mảng byte

  formData.append(fieldName, imageBlob, filename) // Thêm hình ảnh vào formData
}

function FormRegisterDriver() {
  const dispatch = useDispatch()
  const [now, setNow] = useState(0)
  const [showForm, setShowForm] = useState(0)
  const [activeNext, setActiveNext] = useState(false)
  const [activeNextFormInfor, setActiveNextFormInfor] = useState(false)
  const [activeNextFormDocs, setActiveNextFormDocs] = useState(false)
  const [loadingRegister, setLoadingRegister] = useState(false)
  const { currentUser } = useSelector((state) => state.user)
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
  const [formInfor, setFormInfor] = useState({
    name: currentUser.name || '',
    gender: currentUser.gender || '',
    birthday: currentUser.birthDay || '',
    phonenumber: currentUser.phoneNumber || '',
    gmail: currentUser.email || '',
    location: '',
    vehicleType: '',
    licensePlate: '',
  })
  console.log('currentUser ', currentUser)
  console.log('FORM INFOR ', formInfor)
  const [active, setActive] = useState(Array(8).fill(false))
  const [formDocs, setFormDocs] = useState({
    activeData: active,
    number: '',
    dateOfIssue: '',
    place: '',
    expiryDate: '',
    temporaryAddress: '',
    driverLicenseNumber: '',
    licenseClass: '',
    issueDateLicense: '',
    nameRepre: '',
    phoneRepre: '',
    relation: '',
    numberBank: '',
    name: '',
    nameBank: '',
    commit: false,
    avatarOfDriver: [''],
    citizenImages: ['', ''],
    driverLicenseImages: ['', ''],
    vehicleRegistration: ['', ''],
    vehicleImages: ['', '', '', ''],
    vehicleInsurance: ['', ''],
  })
  const [formConfirm, setFormConfirm] = useState({
    regulation: false,
    security: false,
    term: false,
    punishment: false,
  })
  const handleChangeFormInfor = (updateForm) => {
    setFormInfor(updateForm)
  }
  const handleChangeFormDocs = (updateForm) => {
    setFormDocs(updateForm)
    setActive(formDocs.activeData)
  }
  const handleFormConfirmChange = (updatedDataConfirm) => {
    setFormConfirm(updatedDataConfirm)
    console.log('formConfirm:', formConfirm)
  }
  console.log('formRegisterDocs: ', formDocs)
  console.log('active-registerform', active)
  const handleRegister = async (e) => {
    e.preventDefault()
    if (dispatch(checkLoginSession())) {
      setLoadingRegister(true)
      try {
        const driverInfo = {
          accountInfo: {
            username: formInfor.gmail,
            name: formInfor.name,
            phoneNumber: formInfor.phoneNumber,
            birthDay: formInfor.birthday,
            gender: formInfor.gender,
          },
          citizen: {
            citizenId: formDocs.number,
            dateOfIssue: formDocs.dateOfIssue,
            placeOfIssue: formDocs.placeOfIssue,
            expiryDate: formDocs.expiryDate,
            permanentAddress: formDocs.temporaryAddress,
            location: formInfor.location,
          },
          driverLicense: {
            driverLicenseNumber: formDocs.driverLicenseNumber,
            licenseType: formDocs.licenseClass,
            issueDateLicense: formDocs.issueDateLicense,
          },
          vehicle: {
            licensePlateNumber: formInfor.licensePlate,
            vehicleType: formInfor.vehicleType,
          },
          relative: {
            nameOfRelative: formDocs.nameRepre,
            phoneOfRelative: formDocs.phoneRepre,
            relationship: formDocs.relation,
          },
          bankAccount: {
            accountNumber: formDocs.numberBank,
            accountHolderName: formDocs.name,
            bankName: formDocs.bankName,
            partnerType: 'DRIVER',
          },
        }

        const formDataRegisterDriver = new FormData()
        formDataRegisterDriver.append(
          'driverInfo',
          new Blob([JSON.stringify(driverInfo)], { type: 'application/json' }),
        )
        for (let [key, value] of formDataRegisterDriver.entries()) {
          console.log(`${key}:`, value)
        }

        appendImageToFormData(formDocs.avatarOfDriver, 'avatarOfDriver', formDataRegisterDriver, 'avatarOfDriver.png')

        formDocs.citizenImages.forEach((imageBase64, index) => {
          appendImageToFormData(imageBase64, 'citizenImages', formDataRegisterDriver, `citizenImages${index + 1}.png`)
        })

        formDocs.driverLicenseImages.forEach((imageBase64, index) => {
          appendImageToFormData(
            imageBase64,
            'driverLicenseImages',
            formDataRegisterDriver,
            `driverLicenseImages${index + 1}.png`,
          )
        })

        formDocs.vehicleRegistration.forEach((imageBase64, index) => {
          appendImageToFormData(
            imageBase64,
            'vehicleRegistration',
            formDataRegisterDriver,
            `vehicleRegistration${index + 1}.png`,
          )
        })

        formDocs.vehicleImages.forEach((imageBase64, index) => {
          appendImageToFormData(imageBase64, 'vehicleImages', formDataRegisterDriver, `vehicleImages${index + 1}.png`)
        })

        formDocs.vehicleInsurance.forEach((imageBase64, index) => {
          appendImageToFormData(
            imageBase64,
            'vehicleInsurance',
            formDataRegisterDriver,
            `vehicleInsurance${index + 1}.png`,
          )
        })

        for (let [key, value] of formDataRegisterDriver.entries()) {
          console.log(`${key}:`, value)
        }
        console.log('FORM REGISTER:', formDataRegisterDriver)
        const response = await registerDriverPartner(formDataRegisterDriver)
        if (response) {
          setIsRegister(true)
          console.log('Đăng ký đối tác thành công!', response)
        }
      } catch (message) {
        console.log('Đăng ký thất bại:')
        // console.log(message)
        // if (message === 'You have already registered this business partner') {
        toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 1000, position: 'top-center' })
        // toast.error('Message:', message)
        // }
      } finally {
        setLoadingRegister(false)
      }
    }
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
      {loadingRegister && <Spinner animation="border" variant="primary" />}
      {showForm === 0 && (
        <FormInformation
          formInfor={formInfor}
          handleChangeFormInfor={handleChangeFormInfor}
          setActiveNextFormInfor={setActiveNextFormInfor}
        ></FormInformation>
      )}
      {showForm === 1 && (
        <FormDocuments
          formDocs={formDocs}
          setActiveNextFormDocs={setActiveNextFormDocs}
          handleChangeFormDocs={handleChangeFormDocs}
        ></FormDocuments>
      )}
      {showForm === 2 && (
        <FormConfirmRegister
          formData={formConfirm}
          isRegister={isRegister}
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
