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
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useUserContext } from '~/Context/UserProvider'
import { getMyAccount } from '~/apiServices/getMyAccount'
import { toast } from 'react-toastify'
import { registerInfo } from '~/apiServices/registerInfo'

const cx = classNames.bind(styles)
function AccountSetting() {
  const formRef = useRef(null)
  const inputFile = useRef(null)
  const { currentUser, setCurrentUser, checkLoginSession } = useUserContext()
  const [fullName, setFullName] = useState(currentUser.name)
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber)
  const [isValid, setIsValid] = useState(false)
  const [birthday, setBirthday] = useState(currentUser.birthDay)
  const [gender, setGender] = useState(currentUser.gender)
  const [selectedImage, setSelectedImage] = useState(images.addAvatar)

  useEffect(() => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity())
    }
  }, [fullName, birthday])

  useEffect(() => {
    async function getMyInfo() {
      if (await checkLoginSession()) {
        const user = await getMyAccount()
        if (user) {
          setCurrentUser(user)
        }
      }
    }
    getMyInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setFullName(currentUser.name)
    // setBirthday(new Date(currentUser.birthDay))
    setGender(currentUser.gender)
  }, [currentUser])

  const handleGender = (gender) => {
    setGender(gender)
  }

  const handleChange = useCallback((value, functionChange) => {
    functionChange(value)
  }, [])

  const handleCancel = (e) => {
    e.preventDefault()
    setFullName(currentUser.name)
    setBirthday(currentUser.birthday)
    setPhoneNumber(currentUser.phoneNumber)
    setGender(currentUser.gender)
  }

  const handleChooseImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
      }
    }
  }

  const handleCancelImage = async (e) => {
    e.preventDefault()
    setSelectedImage(currentUser.avatar)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const accountInfo = {
        username: currentUser.username,
        name: fullName,
        gender,
        birthDay: birthday.toLocaleDateString('en-GB').replace(/\//g, '-'),
        phoneNumber: phoneNumber,
      }
      const formData = new FormData()
      formData.append('account_info', new Blob([JSON.stringify(accountInfo)], { type: 'application/json' }))
      formData.append('fileAvatar', selectedImage)
      await registerInfo(formData)
      toast.success('Cập nhật thông tin thành công!', { autoClose: 1500, position: 'top-center' })
    } catch {
      toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 1500, position: 'top-center' })
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
        <div className="row">
          <div className="col-12 col-lg-5">
            <div className="d-flex flex-column row-gap-5 align-items-center">
              <div className={cx('avatar-wrapper')}>
                <input type="file" className={cx('input-file')} onChange={handleChooseImage} ref={inputFile} />
                <img src={selectedImage ? selectedImage : images.addAvatar} alt="avatar" className={cx('avatar')}></img>
              </div>
              <div className="d-flex column-gap-3 mt-3">
                <Button outline className={cx('btn-cancel')} onClick={handleCancelImage}>
                  Xoá
                </Button>
                <Button primary className={cx('btn-submit')} onClick={() => inputFile.current.click()}>
                  Tải lên
                </Button>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-7">
            <div className={cx('item')}>
              <form ref={formRef}>
                <FormInput title="Email" id="email" type="email" value={currentUser.username} disabled></FormInput>
                <FormInput
                  id="fullname"
                  value={fullName}
                  type="fullname"
                  title="Họ và tên"
                  error="Vui lòng nhập họ và tên"
                  required
                  isValid={isValid}
                  onChange={(e) => handleChange(e.target.value, setFullName)}
                />
                <FormInput
                  id="phone"
                  value={phoneNumber}
                  type="phone"
                  title="Số điện thoại"
                  error={phoneNumber ? 'Số điện thoại không đúng định dạng' : 'Vui lòng nhập số điện thoại'}
                  required
                  pattern="[0-9]{10}"
                  isValid={isValid}
                  onChange={(e) => handleChange(e.target.value, setPhoneNumber)}
                />
                <div className="mb-3">
                  <label className="mb-4">Ngày sinh</label>
                  <div className={cx('date-wrapper', 'd-flex', 'align-items-center')}>
                    <DatePicker
                      className={cx('date-input')} // Sử dụng class để áp dụng style cho input
                      selected={birthday}
                      onChange={(date) => setBirthday(date)}
                      dateFormat="dd-MM-yyyy"
                      maxDate={new Date()}
                      placeholderText="Chọn ngày sinh"
                    />
                    <FontAwesomeIcon icon={faCalendar} className={cx('calendar-icon')} />
                  </div>
                </div>
                <FormGender handleGender={handleGender} gender={gender} />
                <div className="d-flex column-gap-5 justify-content-center mt-5">
                  <Button className={cx('btn-cancel')} outline onClick={handleCancel} type="button">
                    Huỷ
                  </Button>
                  <Button className={cx('btn-submit')} onClick={handleSave} disabled={!isValid} type="submit" primary>
                    Lưu thông tin
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountSetting
