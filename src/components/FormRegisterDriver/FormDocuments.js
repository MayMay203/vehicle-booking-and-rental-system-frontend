import classNames from 'classnames/bind'
import styles from './FormRegisterDriver.module.scss'
import { Accordion, Collapse } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import GuideTakePhoto from '../GuideTakePhoto'
import TakePhotoRegister from '../TakePhotoRegister'
import FormBank from '../FormBank'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import FormEmergencyContact from '../FormEmergencyContact/FormEmergencyContact'
import FormInforID from '../FormInforID'
import FormDriverLicense from '../FormDriverLicense'
const cx = classNames.bind(styles)
function RequiredFieldIndicator({ isActive }) {
  return (
    <>
      {isActive ? (
        <div className={cx('txt-right', 'd-flex', 'justify-content-end')}>
          <span className={cx('txt-small', 'txt-green', 'd-none', 'd-sm-block')}>Hoàn tất</span>
          <FontAwesomeIcon
            icon={faCheck}
            className={cx('txt-small', 'txt-green', 'd-block', 'd-sm-none')}
          ></FontAwesomeIcon>
        </div>
      ) : (
        <div className={cx('txt-right', 'd-flex', 'justify-content-end')}>
          <span className={cx('txt-small', 'txt-red', 'd-none', 'd-sm-block')}>Bắt buộc*</span>
          <span className={cx('txt-small', 'txt-red', 'd-block', 'd-sm-none')}>*</span>
        </div>
      )}
    </>
  )
}
function FormDocuments({ setActiveNextFormDocs, formDocs, handleChangeFormDocs }) {
  const [openGuideAvatar, setOpenGuideAvatar] = useState(false)
  const guidesAvatar = [
    {
      id: 1,
      content: 'Yêu cầu',
      sub_contents: [
        { id: 1, value: 'Chụp ảnh trên nền trơn.' },
        { id: 2, value: 'Chụp ảnh rõ nét không loé sáng.' },
        { id: 3, value: 'Chụp ảnh chính diện, nhìn thẳng, không nhắm mắt.' },
      ],
      icon: 'faCircleCheck',
    },
    {
      id: 2,
      content: 'Không được:',
      sub_contents: [
        {
          id: 1,
          value: 'Còn hạn ít nhất 1 tháng.',
        },
        { id: 2, value: 'Công dân Việt Nam (từ 18-60 tuổi)' },
      ],
      icon: 'faCircleXmark',
    },
  ]
  const photosAvatar = ['guide_avatar_1', 'guide_avatar_2']

  const [openGuideID, setOpenGuideID] = useState(false)
  const guidesID = [
    {
      id: 1,
      content: 'Yêu cầu:',
      sub_contents: [
        { id: 1, value: 'Chụp ảnh trên nền trơn.' },
        { id: 2, value: 'Chụp ảnh rõ nét không loé sáng.' },
        { id: 3, value: 'Chụp ảnh chính diện, nhìn thẳng, không nhắm mắt.' },
      ],
      icon: 'faCircleCheck',
    },
    {
      id: 2,
      content: 'Không được:',
      sub_contents: [
        {
          id: 1,
          value: 'Chụp mờ, chụp không đủ thông tin.',
        },
        { id: 2, value: 'Can thiệp chỉnh sửa.' },
      ],
      icon: 'faCircleXmark',
    },
  ]
  const photosID = ['guide_ID_1', 'guide_ID_2']

  const [openGuideVehicle, setOpenGuideVehicle] = useState(false)
  const guidesVehicle = [
    {
      id: 1,
      content: 'Yêu cầu:',
      sub_contents: [
        { id: 1, value: 'Hình mặt trước đầu xe, thấy rõ đèn, gương, biển số xe (nếu có).' },
        { id: 2, value: 'Mặt sau chụp hình thấy rõ đèn, biển số xe.' },
        { id: 3, value: 'Xe đủ gương chiếu hậu.' },
        { id: 4, value: 'Biển số xe trùng khớp với thông tin đăng ký.' },
      ],
      icon: 'faCircleCheck',
    },
    {
      id: 2,
      content: 'Không được:',
      sub_contents: [
        {
          id: 1,
          value: 'Chụp mờ, can thiệp chỉnh sửa.',
        },
      ],
      icon: 'faCircleXmark',
    },
  ]
  const photosVehicle = ['vehicle', 'guide_vehicle_1', 'guide_vehicle_2', 'guide_vehicle_1']

  const [openGuideDriverLicense, setOpenGuideDriverLicense] = useState(false)
  const guidesDriverLicense = [
    {
      id: 1,
      content: 'Yêu cầu:',
      sub_contents: [
        { id: 1, value: 'Giấy phép bằng lái còn hạn.' },
        { id: 2, value: 'Bằng tương thích với loại xe đăng ký.' },
        { id: 3, value: 'Ảnh chụp bản gốc.' },
        { id: 4, value: 'Bằng trùng với thông tin đăng ký và CCCD/CMND/Hộ chiếu.' },
      ],
      icon: 'faCircleCheck',
    },
    {
      id: 2,
      content: 'Không được:',
      sub_contents: [
        {
          id: 1,
          value: 'Chụp mờ, can thiệp chỉnh sửa.',
        },
        {
          id: 2,
          value: 'Chụp mất góc, không đầy đủ thông tin.',
        },
      ],
      icon: 'faCircleXmark',
    },
  ]
  const photosDriverLicense = ['guide_driver_license_1', 'guide_driver_license_2']

  const [openGuideVehicleInsurance, setOpenGuideVehicleInsurance] = useState(false)
  const guidesVehicleInsurance = [
    {
      id: 1,
      content: 'Yêu cầu:',
      sub_contents: [
        { id: 1, value: 'Bảo hiểm còn hạn ít nhất 1 tháng.' },
        { id: 2, value: 'Thông tin trùng khớp với thông tin đã đăng ký.' },
        { id: 3, value: 'Chấp nhận bảo hiểm điện tử.' },
      ],
      icon: 'faCircleCheck',
    },
    {
      id: 2,
      content: 'Không được:',
      sub_contents: [
        {
          id: 1,
          value: 'Chụp mờ, can thiệp chỉnh sửa.',
        },
        {
          id: 2,
          value: 'Chụp mất góc, không đầy đủ thông tin.',
        },
      ],
      icon: 'faCircleXmark',
    },
  ]
  const photosVehicleInsurance = ['guide_vehicle_insurance_1', 'guide_vehicle_insurance_2']

  const [openGuideRegistrationCertificate, setOpenGuideRegistrationCertificate] = useState(false)
  const guidesRegistrationCertificate = [
    {
      id: 1,
      content: 'Yêu cầu:',
      sub_contents: [
        { id: 1, value: 'Đúng thông tin như đã đăng ký.' },
        { id: 2, value: 'Ảnh chụp bản gốc.' },
      ],
      icon: 'faCircleCheck',
    },
    {
      id: 2,
      content: 'Không được:',
      sub_contents: [
        {
          id: 1,
          value: 'Chụp mờ, can thiệp chỉnh sửa.',
        },
        {
          id: 2,
          value: 'Chụp mất góc, không đầy đủ thông tin.',
        },
      ],
      icon: 'faCircleXmark',
    },
  ]
  const photosRegistrationCertificate = ['guide_registration_certificate_1', 'guide_registration_certificate_2']

  const [active, setActive] = useState(formDocs.activeData)

  const [formData, setFormData] = useState(formDocs)
  const [formEmergencyContact, setFormEmergencyContact] = useState({
    nameRepre: formData.nameRepre,
    relation: formData.relation,
    phoneRepre: formData.phoneRepre,
    temporaryAddress: formData.temporaryAddress,
  })
  const [formInforID, setFormInforID] = useState({
    number: formData.number,
    dateOfIssue: formData.dateOfIssue,
    place: formData.place,
    expiryDate: formData.expiryDate,
    citizenImages: formData.citizenImages,
  })
  const [formBank, setFormBank] = useState({
    name: formData.name,
    numberBank: formData.numberBank,
    nameBank: formData.nameBank,
    commit: formData.commit,
  })
  const [formDriverLicense, setFormDriverLicense] = useState({
    driverLicenseImages: formData.driverLicenseImages,
    driverLicenseNumber: formData.driverLicenseNumber,
    issueDateLicense: formData.issueDateLicense,
    licenseClass: formData.licenseClass,
  })
  const handleSave = (id, images) => {
    console.log('id', id)
    console.log('images:', images)
    if(images.every((image) => image !== 
  '')){
      console.log('vào vòng if, images:', images)
      const updateActive = [...active]
      updateActive[id] = true
      setActive(updateActive)

      if (id === 0) {
        setFormData((formDataPrev) => ({
          ...formDataPrev,
          activeData: updateActive,
          avatarOfDriver: images,
        }))
      } else if (id === 4) {
        setFormData((formDataPrev) => ({
          ...formDataPrev,
          activeData: updateActive,
          vehicleImages: images,
        }))
      } else if (id === 6) {
        setFormData((formDataPrev) => ({
          ...formDataPrev,
          activeData: updateActive,
          vehicleRegistration: images,
        }))
      } else if (id === 7) {
        setFormData((formDataPrev) => ({
          ...formDataPrev,
          activeData: updateActive,
          vehicleInsurance: images,
        }))
      }
      handleChangeFormDocs(formData)
    }
    
  }
  const handleSaveFormEmergencyContact = (data) => {
    const updateActive = [...active]
    updateActive[1] = true
    setActive(updateActive)
    setFormEmergencyContact(data)
    setFormData((formDataPrev) => ({
      ...formDataPrev,
      nameRepre: data.nameRepre,
      relation: data.relation,
      phoneRepre: data.phoneRepre,
      temporaryAddress: data.temporaryAddress,
    }))
    handleChangeFormDocs((formDataPrev) => ({
      ...formDataPrev,
      activeData: updateActive,
      nameRepre: data.nameRepre,
      relation: data.relation,
      phoneRepre: data.phoneRepre,
      temporaryAddress: data.temporaryAddress,
    }))
  }
  console.log('formEmergencyContact', formEmergencyContact)
  const handleSaveFormInforID = (data) => {
    const updateActive = [...active]
    updateActive[2] = true
    setActive(updateActive)
    setFormInforID(data)
    setFormData((formDataPrev) => ({
      ...formDataPrev,
      number: data.number,
      dateOfIssue: data.dateOfIssue,
      place: data.place,
      expiryDate: data.expiryDate,
      citizenImages: data.citizenImages,
    }))
    handleChangeFormDocs((formDataPrev) => ({
      ...formDataPrev,
      activeData: updateActive,
      number: data.number,
      dateOfIssue: data.dateOfIssue,
      place: data.place,
      expiryDate: data.expiryDate,
      citizenImages: data.citizenImages,
    }))
  }
  const handleSaveFormBank = (data) => {
    const updateActive = [...active]
    updateActive[3] = true
    setActive(updateActive)
    setFormBank(data)
    setFormData((formDataPrev) => ({
      ...formDataPrev,
      name: data.name,
      numberBank: data.numberBank,
      nameBank: data.nameBank,
      commit: data.commit,
    }))
    handleChangeFormDocs((formDataPrev) => ({
      ...formDataPrev,
      activeData: updateActive,
      name: data.name,
      numberBank: data.numberBank,
      nameBank: data.nameBank,
      commit: data.commit,
    }))
    console.log('Ben trong - active3', active[3])
    console.log('Ben trong - active', active)
  }
  console.log('formDOCs', formData)
  console.log('active', active)
  console.log('active5', active[5])
  const handleSaveFormDriverLicense = (data) => {
    const updateActive = [...active]
    updateActive[5] = true
    setActive(updateActive)
    setFormDriverLicense(data)
    setFormData((formDataPrev) => ({
      ...formDataPrev,
      driverLicenseImages: data.driverLicenseImages,
      driverLicenseNumber: data.driverLicenseNumber,
      issueDateLicense: data.issueDateLicense,
      licenseClass: data.licenseClass,
    }))
    handleChangeFormDocs((formDataPrev) => ({
      ...formDataPrev,
      activeData: updateActive,
      driverLicenseImages: data.driverLicenseImages,
      driverLicenseNumber: data.driverLicenseNumber,
      issueDateLicense: data.issueDateLicense,
      licenseClass: data.licenseClass,
    }))
  }

  useEffect(() => {
    const allActive = active.every((item) => item === true)
    if (allActive) {
      setActiveNextFormDocs(true)
    }
  }, [active, setActiveNextFormDocs])

  return (
    <div>
      <p className={cx('txt-large')}>Gửi tài liệu</p>
      <p className={cx('txt-small')}>Hãy đảm bảo rằng tất cả dữ liệu của bạn đều được cập nhập </p>
      <div className={cx('form-doc')}>
        <p className={cx('txt-medium')}>Thông tin cá nhân</p>
        <div className={cx('margin-bottom')}>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span className={cx('txt-small')}>Ảnh chân dung</span>
                <RequiredFieldIndicator isActive={active[0]}></RequiredFieldIndicator>
              </Accordion.Header>
              <Accordion.Body>
                <p
                  onClick={() => setOpenGuideAvatar(!openGuideAvatar)}
                  aria-controls="collapse-guide-avartar"
                  aria-expanded={openGuideAvatar}
                  className={cx('txt-small', 'btn-collapse')}
                >
                  Hướng dẫn chụp
                </p>
                <Collapse in={openGuideAvatar}>
                  <div id="collapse-guide-avatar" className={cx('row')}>
                    <GuideTakePhoto type_photo={'avatar'} photos={photosAvatar} notes={guidesAvatar}></GuideTakePhoto>
                  </div>
                </Collapse>
                <TakePhotoRegister
                  initialNumberPhoto={1}
                  id={0}
                  name_photos={['Ảnh chân dung']}
                  handleSave={handleSave}
                  obligatory={true}
                  urlImages={formData.avatarOfDriver}
                ></TakePhotoRegister>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <span className={cx('txt-small')}>Thông tin liên hệ khẩn cấp, địa chỉ tạm trú</span>
                <RequiredFieldIndicator isActive={active[1]}></RequiredFieldIndicator>
              </Accordion.Header>
              <Accordion.Body>
                <FormEmergencyContact
                  updateActive={active[1]}
                  formEmergencyContact={formEmergencyContact}
                  handleSaveFormEmergencyContact={handleSaveFormEmergencyContact}
                ></FormEmergencyContact>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <span className={cx('txt-small')}>CMND/CCCD/Hộ chiếu</span>
                <RequiredFieldIndicator isActive={active[2]}></RequiredFieldIndicator>
              </Accordion.Header>
              <Accordion.Body>
                <p
                  onClick={() => setOpenGuideID(!openGuideID)}
                  aria-controls="collapse-guide-ID"
                  aria-expanded={openGuideID}
                  className={cx('txt-small', 'btn-collapse')}
                >
                  Hướng dẫn chụp
                </p>
                <Collapse in={openGuideID}>
                  <div id="collapse-guide-ID" className={cx('row')}>
                    <GuideTakePhoto type_photo={'ID'} notes={guidesID} photos={photosID}></GuideTakePhoto>
                  </div>
                </Collapse>
                <FormInforID
                  updateActive={active[2]}
                  formInforID={formInforID}
                  handleSaveFormInforID={handleSaveFormInforID}
                ></FormInforID>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <span className={cx('txt-small')}>Tài khoản ngân hàng</span>
                <RequiredFieldIndicator isActive={active[3]}></RequiredFieldIndicator>
              </Accordion.Header>
              <Accordion.Body>
                <FormBank
                  updateActive={active[3]}
                  noButton={false}
                  formBank={formBank}
                  handleSaveFormBank={handleSaveFormBank}
                ></FormBank>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <p className={cx('txt-medium')}>Thông tin phương tiện di chuyển </p>
        <div className={cx('margin-bottom')}>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span className={cx('txt-small')}>Hình xe</span>
                <RequiredFieldIndicator isActive={active[4]}></RequiredFieldIndicator>
              </Accordion.Header>
              <Accordion.Body>
                <p
                  onClick={() => setOpenGuideVehicle(!openGuideVehicle)}
                  aria-controls="collapse-guide-Vehicle"
                  aria-expanded={openGuideVehicle}
                  className={cx('txt-small', 'btn-collapse')}
                >
                  Hướng dẫn chụp
                </p>
                <Collapse in={openGuideVehicle}>
                  <div id="collapse-guide-Vehicle" className={cx('row')}>
                    <GuideTakePhoto
                      type_photo={'Vehicle'}
                      notes={guidesVehicle}
                      photos={photosVehicle}
                    ></GuideTakePhoto>
                  </div>
                </Collapse>
                <TakePhotoRegister
                  id={4}
                  initialNumberPhoto={4}
                  name_photos={['Mặt trước', 'Mặt sau', 'Mặt bên phải', 'Mặt bên trái']}
                  handleSave={handleSave}
                  obligatory={true}
                  urlImages={[
                    formData.vehicleImages[0],
                    formData.vehicleImages[1],
                    formData.vehicleImages[2],
                    formData.vehicleImages[3],
                  ]}
                ></TakePhotoRegister>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <span className={cx('txt-small')}>Bằng lái xe</span>
                <RequiredFieldIndicator isActive={active[5]}></RequiredFieldIndicator>
              </Accordion.Header>
              <Accordion.Body>
                <p
                  onClick={() => setOpenGuideDriverLicense(!openGuideDriverLicense)}
                  aria-controls="collapse-guide-driver-license"
                  aria-expanded={openGuideDriverLicense}
                  className={cx('txt-small', 'btn-collapse')}
                >
                  Hướng dẫn chụp
                </p>
                <Collapse in={openGuideDriverLicense}>
                  <div id="collapse-guide-driver-license" className={cx('row')}>
                    <GuideTakePhoto
                      type_photo={'DriverLicense'}
                      notes={guidesDriverLicense}
                      photos={photosDriverLicense}
                    ></GuideTakePhoto>
                  </div>
                </Collapse>
                <FormDriverLicense
                  updateActive={active[5]}
                  formDriverLicense={formDriverLicense}
                  handleSaveFormDriverLicense={handleSaveFormDriverLicense}
                ></FormDriverLicense>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <span className={cx('txt-small')}>Giấy đăng ký xe</span>
                <RequiredFieldIndicator isActive={active[6]}></RequiredFieldIndicator>
              </Accordion.Header>
              <Accordion.Body>
                <p
                  onClick={() => setOpenGuideRegistrationCertificate(!openGuideRegistrationCertificate)}
                  aria-controls="collapse-guide-registration-certificate"
                  aria-expanded={openGuideRegistrationCertificate}
                  className={cx('txt-small', 'btn-collapse')}
                >
                  Hướng dẫn chụp
                </p>
                <Collapse in={openGuideRegistrationCertificate}>
                  <div id="collapse-guide-registration-certificate" className={cx('row')}>
                    <GuideTakePhoto
                      type_photo={'RegistrationCertificate'}
                      notes={guidesRegistrationCertificate}
                      photos={photosRegistrationCertificate}
                    ></GuideTakePhoto>
                  </div>
                </Collapse>
                <TakePhotoRegister
                  id={6}
                  initialNumberPhoto={2}
                  name_photos={['Mặt trước', 'Mặt sau']}
                  handleSave={handleSave}
                  obligatory={true}
                  urlImages={[formData.vehicleRegistration[0], formData.vehicleRegistration[1]]}
                ></TakePhotoRegister>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <span className={cx('txt-small')}>Bảo hiểm xe</span>
                <RequiredFieldIndicator isActive={active[7]}></RequiredFieldIndicator>
              </Accordion.Header>
              <Accordion.Body>
                <p
                  onClick={() => setOpenGuideVehicleInsurance(!openGuideVehicleInsurance)}
                  aria-controls="collapse-guide-vehicle-insurance"
                  aria-expanded={openGuideVehicleInsurance}
                  className={cx('txt-small', 'btn-collapse')}
                >
                  Hướng dẫn chụp
                </p>
                <Collapse in={openGuideVehicleInsurance}>
                  <div id="collapse-guide-vehicle-insurance" className={cx('row')}>
                    <GuideTakePhoto
                      type_photo={'VehicleInsurance'}
                      notes={guidesVehicleInsurance}
                      photos={photosVehicleInsurance}
                    ></GuideTakePhoto>
                  </div>
                </Collapse>
                <TakePhotoRegister
                  id={7}
                  initialNumberPhoto={2}
                  name_photos={['Mặt trước', 'Mặt sau']}
                  handleSave={handleSave}
                  obligatory={true}
                  urlImages={[formData.vehicleInsurance[0], formData.vehicleInsurance[1]]}
                ></TakePhotoRegister>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
export default FormDocuments
