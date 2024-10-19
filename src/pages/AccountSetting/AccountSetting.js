import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap'
import { config } from '~/config'
import classNames from 'classnames/bind'
import styles from './AccountSetting.module.scss'
import { images } from '~/assets/images'
import Button from '~/components/Button'
import FormInput from '~/components/Form/FormInput'
import DatePicker from 'react-datepicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FormGender from '~/components/Form/FormGender'
import { faCalendar, faCancel, faClose, faSave, faUpload, faUserLock } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useUserContext } from '~/Context/UserProvider'
import { toast } from 'react-toastify'
import { useGlobalModal } from '~/Context/GlobalModalProvider'
import { forgetPassword } from '~/apiServices/forgetPassword'
import { updateAccount } from '~/apiServices/updateAccount'
import Spinner from '~/components/Spinner'

const cx = classNames.bind(styles)
function AccountSetting() {
  const formRef = useRef(null)
  const inputFile = useRef(null)
  const { currentUser, setCurrentUser, checkLoginSession } = useUserContext()
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [birthday, setBirthday] = useState('')
  const [gender, setGender] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [isModified, setIsModified] = useState(false)
  const { openGlobalModal, closeGlobalModal } = useGlobalModal()

  useEffect(() => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity())
    }
  }, [fullName, birthday, phoneNumber])

  useEffect(() => {
    async function getInfo() {
      if ((await checkLoginSession()) && currentUser) {
        setFullName(currentUser.name)
        if (currentUser.birthDay) {
          const [day, month, year] = currentUser.birthDay.split('-')
          setBirthday(new Date(`${year}-${month}-${day}`))
        }
        setGender(currentUser.gender)
        setPhoneNumber(currentUser.phoneNumber)
        setSelectedImage(currentUser.avatar)
      }
    }
    getInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  const handleGender = (gender) => {
    setGender(gender)
    setIsModified(true)
  }

  const handleChange = useCallback((value, functionChange) => {
    functionChange(value)
    setIsModified(true)
  }, [])

  const handleCancel = (e) => {
    e.preventDefault()
    setFullName(currentUser.name)
    const [day, month, year] = currentUser.birthDay.split('-')
    setBirthday(new Date(`${year}-${month}-${day}`))
    setPhoneNumber(currentUser.phoneNumber)
    setGender(currentUser.gender)
    setIsModified(false)
    setSelectedImage(currentUser.avatar)
    setIsValid(true)
  }

  const handleChooseImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
      }
      setIsModified(true)
    }
  }

  const handleCancelImage = async (e) => {
    e.preventDefault()
    setSelectedImage(currentUser.avatar)
    setIsModified(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      if (selectedImage !== currentUser.avatar) {
        openGlobalModal('loading')
      }
      const accountInfo = {
        id: currentUser.id,
        name: fullName,
        gender,
        birthDay: birthday.toLocaleDateString('en-GB').replace(/\//g, '-'),
        phoneNumber,
      }
      const formData = new FormData()
      formData.append('account_info', new Blob([JSON.stringify(accountInfo)], { type: 'application/json' }))
      if (selectedImage !== currentUser.avatar) {
        const base64Data = selectedImage.split(',')[1]
        const byteCharacters = atob(base64Data)
        const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i))
        const byteArray = new Uint8Array(byteNumbers)
        const imageBlob = new Blob([byteArray], { type: 'image/png' })
        formData.append('fileAvatar', imageBlob, 'avatar.png')
      }
      const userData = await updateAccount(formData)
      toast.success('Cập nhật thông tin thành công!', { autoClose: 1000, position: 'top-center' })
      setIsModified(false)
      setCurrentUser(userData.accountInfo)
      if (selectedImage !== currentUser.avatar) {
        closeGlobalModal('loading')
     }
    } catch (error) {
      closeGlobalModal('loading')
      console.log(error)
      toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 1000, position: 'top-center' })
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    try {
      openGlobalModal('loading')
      const data = await forgetPassword(currentUser.email)
      closeGlobalModal('loading')
      toast.success(data.info, { autoClose: 1500, position: 'top-center' })
    } catch (message) {
      closeGlobalModal('loading')
      toast.error(message, { autoClose: 1500, position: 'top-center' })
    }
  }

  return (
    <div className="container">
      <Breadcrumb>
        <BreadcrumbItem href={config.routes.home}>Trang chủ</BreadcrumbItem>
        <BreadcrumbItem href={config.routes.accountSetting} active>
          Thông tin tài khoản
        </BreadcrumbItem>
      </Breadcrumb>

      <div className={cx('wrapper')}>
        <div className="row row-gap-5">
          <div className="col-12 col-lg-5">
            <div className="d-flex flex-column row-gap-5 align-items-center">
              <div className={cx('avatar-wrapper')}>
                <input type="file" className={cx('input-file')} onChange={handleChooseImage} ref={inputFile} />
                <img src={selectedImage ? selectedImage : images.addAvatar} alt="avatar" className={cx('avatar')}></img>
              </div>
              <div className="d-flex column-gap-3 mt-3">
                <Button
                  outline
                  className={cx('btn-cancel')}
                  onClick={handleCancelImage}
                  disabled={selectedImage === currentUser?.avatar}
                  leftIcon={<FontAwesomeIcon icon={faClose} />}
                >
                  Xoá
                </Button>
                <Button
                  primary
                  className={cx('btn-submit')}
                  onClick={() => inputFile.current.click()}
                  leftIcon={<FontAwesomeIcon icon={faUpload} />}
                >
                  Tải lên
                </Button>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-7">
            <div className={cx('item')}>
              <form ref={formRef}>
                <FormInput
                  title="Email"
                  id="email"
                  type="email"
                  value={currentUser ? currentUser.email : ''}
                  disabled
                ></FormInput>
                <FormInput
                  id="fullname"
                  value={fullName ? fullName : ''}
                  type="fullname"
                  title="Họ và tên"
                  error="Vui lòng nhập họ và tên"
                  required
                  isValid={isValid}
                  onChange={(e) => handleChange(e.target.value, setFullName)}
                  star
                />
                <FormInput
                  id="phone"
                  value={phoneNumber ? phoneNumber : ''}
                  type="phone"
                  title="Số điện thoại"
                  error={phoneNumber ? 'Số điện thoại không đúng định dạng' : 'Vui lòng nhập số điện thoại'}
                  required
                  pattern="[0-9]{10}"
                  isValid={isValid}
                  onChange={(e) => handleChange(e.target.value, setPhoneNumber)}
                  star
                />
                <div className="mb-3">
                    <label className="mb-4">Ngày sinh</label>
                    <span className={cx('star')}>*</span>
                  <div className={cx('date-wrapper', 'd-flex', 'align-items-center')}>
                    <DatePicker
                      className={cx('date-input')} // Sử dụng class để áp dụng style cho input
                      selected={birthday}
                      onChange={(date) => handleChange(date, setBirthday)}
                      dateFormat="dd-MM-yyyy"
                      maxDate={new Date()}
                      placeholderText="Chọn ngày sinh"
                      required
                    />
                    <FontAwesomeIcon icon={faCalendar} className={cx('calendar-icon')} />
                  </div>
                </div>
                <FormGender handleGender={handleGender} gender={gender} star/>
                <div className="d-flex column-gap-5 justify-content-center mt-5">
                  <Button
                    className={cx('btn-cancel')}
                    outline
                    onClick={handleCancel}
                    type="button"
                    disabled={!isModified}
                    leftIcon={<FontAwesomeIcon icon={faCancel} />}
                  >
                    Huỷ
                  </Button>
                  <Button
                    className={cx('btn-submit')}
                    onClick={handleSave}
                    disabled={!isValid || !isModified}
                    type="submit"
                    primary
                    leftIcon={<FontAwesomeIcon icon={faSave} />}
                  >
                    Lưu thông tin
                  </Button>
                </div>
                <Button
                  leftIcon={<FontAwesomeIcon icon={faUserLock} />}
                  className={cx('btn-change')}
                  onClick={handleChangePassword}
                >
                  Đổi mật khẩu
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Spinner />
    </div>
  )
}

export default AccountSetting
