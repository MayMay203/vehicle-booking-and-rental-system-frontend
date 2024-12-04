import classNames from 'classnames/bind'
import styles from './UpdateBus.module.scss'
import { Col, InputGroup, Row, Form, Image, Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCouch, faTicket } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import SlideUtility from '~/components/SlideUtility'
import { images } from '~/assets/images'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { fetchAllBusTypes, fetchAllUtilities } from '~/redux/slices/busPartnerSlice'
import { useLocation } from 'react-router-dom'
import Button from '~/components/Button'
import { detailBusByID } from '~/apiServices/busPartner/detailBusByID'
import { toast } from 'react-toastify'
import { updateBus } from '~/apiServices/busPartner/updateBus'
const cx = classNames.bind(styles)
function UpdateBus() {
  const location = useLocation()
  const { enableEdit, selectedIDBus } = location.state || {}
  const dispatch = useDispatch()
  const listUtilities = useSelector((state) => state.busPartner.utilityList)
  const allBusTypes = useSelector((state) => state.busPartner.busTypeList)
  const [selectedBus, setSelectedBus] = useState({})
  const [updateUtilitiesOfBus, setUpdateUtilitiesOfBus] = useState([])
  const maxSizeImage = 3 * 1024 * 1024
  const [formData, setFormData] = useState({
    licensePlateNumber: selectedBus.licensePlate,
    idBusType: selectedBus?.busType?.id,
    typeSeat: selectedBus.busType?.chairType,
    numberSeat: selectedBus.busType?.numberOfSeat,
    utilities: selectedBus?.utilities?.map((utility) => utility.id) || [],
    busImages: selectedBus?.imagesBus,
  })
  const fileInputRefs = useRef(Array(6).fill(null))
  const [selectedFiles, setSelectedFiles] = useState(selectedBus?.imagesBus || [])
  const [warningMessage, setWarningMessage] = useState('')
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      dispatch(fetchAllUtilities())
      dispatch(fetchAllBusTypes())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      getInforBusByID()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIDBus])
  useEffect(() => {
    setFormData({
      ...formData,
      utilities: updateUtilitiesOfBus,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateUtilitiesOfBus])
  useEffect(() => {
    setFormData({
      licensePlateNumber: selectedBus.licensePlate,
      idBusType: selectedBus?.busType?.id,
      // typeVehicle: '',
      typeSeat: selectedBus.busType?.chairType,
      numberSeat: selectedBus.busType?.numberOfSeat,
      utilities: selectedBus?.utilities?.map((utility) => utility.id) || [],
      busImages: selectedBus?.imagesBus,
    })
    setSelectedFiles(selectedBus?.imagesBus || [])
    
  }, [selectedBus])
  const getInforBusByID = async () => {
    const response = await detailBusByID(selectedIDBus)
    setSelectedBus(response)
  }
  console.log('imagesBus---:', formData?.busImages)
  const [activeAdd, setActiveAdd] = useState(false)
  useEffect(() => {
    const { busImages = [], utilities = [], ...restOfFormData } = formData
    const allFieldsFilled =
      Object.values(restOfFormData).every((value) => value?.toString()?.trim() !== '') &&
      busImages.some((img) => img.trim() !== '') &&
      utilities.length > 0
    setActiveAdd(allFieldsFilled)
    // console.log('Có vô update', formData)
    console.log(allFieldsFilled)
  }, [formData])
  const handleCancel = () => {
    setFormData({
      licensePlateNumber: '50H-26374',
      typeVehicle: 'Limousine34GheNgoi',
      typeSeat: 'Ghế ngồi',
      numberSeat: '34',
    })
  }
  // useEffect(() => {
  //   async function getMovie() {
  //     // setIsLoading(true);
  //     const movieData = await getDetailFilm(id)
  //     const imagePaths = movieData.imagePaths || []
  //     const initialImages = await Promise.all(
  //       imagePaths.slice(1, 7).map(async (path) => {
  //         const response = await fetch(path)
  //         const blob = await response.blob()
  //         return { file: new File([blob], image.jpg, { type: 'image/jpeg' }), imagePreview: path }
  //       }),
  //     )

  //     if (initialImages.length < 6) {
  //       initialImages.push({ imagePreview: NoImage })
  //     }
  //     if (movieData) {
  //       let posterFile = null
  //       if (imagePaths && imagePaths.length > 1) {
  //         const response = await fetch(imagePaths?.[0], { mode: 'cors' })
  //         const blob = await response.blob()
  //         posterFile = new File([blob], 'poster.jpg', { type: 'image/jpeg' })
  //       }

  //       setMovie((prevMovie) => ({
  //         ...prevMovie,
  //         ...movieData,
  //         duration: convertDurationToMinutes(movieData.duration),
  //         genre: movieData.movieGenres[0].id + 1,
  //         posterPreview: imagePaths && imagePaths.length > 1 ? imagePaths?.[0] : null,
  //         poster: posterFile,
  //         images: initialImages,
  //       }))
  //     }
  //   }
  //   getMovie()
  //   console.log('Initial movie1: ', movie)
  // }, [id])

  // Hàm chuyển Base64 sang Blob
  // const base64ToBlob = (base64, mimeType) => {
  //   const byteCharacters = atob(base64.split(',')[1])
  //   const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i))
  //   return new Blob([new Uint8Array(byteNumbers)], { type: mimeType })
  // }

  const handleImageClick = (index) => {
    fileInputRefs.current[index].click()
  }
  const handleFileChange = (index, event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/') && file.size <= maxSizeImage) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        const newFiles = [...selectedFiles]
        newFiles[index] = e.target.result // Lấy Data URL của ảnh
        setSelectedFiles(newFiles)
        setWarningMessage('')

        setFormData((prevState) => ({
          ...prevState,
          busImages: newFiles,
        }))
        // const newBlobs = [...formData.busImages]
        // newBlobs[index] = file // Gắn File trực tiếp
        // setFormData((prevState) => ({
        //   ...prevState,
        //   busImages: newBlobs,
        // }))
      }
    } else if (file && !file.type.startsWith('image/')) {
      setWarningMessage('Vui lòng chọn file ảnh!')
    } else if (file && file.type.startsWith('image/') && file.size > maxSizeImage) {
      setWarningMessage('Vui lòng chọn file có kích thước <= 3MB !')
    }
  }
  
  // useEffect(() => {
  //   if (formData?.busImages) {
  //     // Kiểm tra nếu busImages tồn tại và hợp lệ
  //     const blobs = formData.busImages.map((imageBase64) => {
  //       try {
  //         if (imageBase64 && imageBase64.includes(',')) {
  //           const base64Data = imageBase64.split(',')[1] // Lấy phần dữ liệu Base64
  //           return base64ToBlob(base64Data, 'image/png') // Chuyển đổi thành Blob
  //         }
  //       } catch (error) {
  //         console.error('Lỗi khi xử lý Base64:', error, imageBase64)
  //         return null
  //       }
  //       return null
  //     })

  //     setSelectedFiles(formData.busImages) // Gắn vào UI
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       busImages: blobs,
  //     }))
  //     console.log('==========Có vô nè')
  //   }
  // }, [formData?.busImages])

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (dispatch(checkLoginSession())) {
      try {
        const busInfor = {
          id: selectedIDBus,
          licensePlate: formData.licensePlateNumber,
          utilities: formData.utilities.map((utilityId) => ({ id: utilityId })),
          busType: { id: formData.idBusType },
        }
        const formDataUpdateBus = new FormData()
        formDataUpdateBus.append('busInfo', new Blob([JSON.stringify(busInfor)], { type: 'application/json' }))

        for (let index = 0; index < formData.busImages.length; index++) {
          const imageBase64 = formData.busImages[index]
          if (imageBase64) {
            console.log(`Image ${index}:`, imageBase64)

            if (imageBase64.includes('http')) {
              const response = await fetch(imageBase64)
              const imageBlobBus = await response.blob()
              formDataUpdateBus.append('busImages', imageBlobBus, `busImages${index + 1}.png`)
            } else {
              const base64DataBus = imageBase64.split(',')[1]
              const byteCharactersBus = atob(base64DataBus)
              const byteNumbersBus = new Array(byteCharactersBus.length)
                .fill(0)
                .map((_, i) => byteCharactersBus.charCodeAt(i))
              const byteArrayBus = new Uint8Array(byteNumbersBus)
              const imageBlobBus = new Blob([byteArrayBus], { type: 'image/png' })
              formDataUpdateBus.append('busImages', imageBlobBus, `busImages${index + 1}.png`)
            }
          } else {
            console.warn(`Image ${index} is null or undefined`)
          }
        }
  // console.log(`Image ---:`, formData.busImage)
        const response = await updateBus(formDataUpdateBus)
        if (response) {
          toast.success('Cập nhật xe thành công!', { autoClose: 2000 })
          console.log('Cập nhật xe thành công!', response)
        }
      } catch (error) {
        console.log('Cập nhật thất bại:')
        console.log(error)
        toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 2000, position: 'top-center' })
      }
    }
  }

  return (
    <div className={cx('container mt-5 mb-5', 'wrap-container')}>
      <Row className={cx('form-add-bus-trip', 'justify-content-center')}>
        {enableEdit ? (
          <p className={cx('title-form')}>Chỉnh sửa thông tin xe khách</p>
        ) : (
          <p className={cx('title-form')}>Thông tin xe khách</p>
        )}
        <Col className={cx('col-sm-12 col-md-6', 'col-form')}>
          <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput4">
            <Form.Label className="mb-3">
              Loại phương tiện<span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              aria-label="idBusType"
              name="idBusType"
              className={cx('txt', 'selectbox', 'infor-item')}
              value={formData.idBusType}
              readOnly
            >
              <option value="">Chọn loại xe</option>
              {allBusTypes &&
                allBusTypes.map((typeVehicle, index) => (
                  <option key={index} value={typeVehicle.id}>
                    {typeVehicle.name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput5">
            <Form.Label className="mb-3">
              Số ghế <span className="text-danger">*</span>
            </Form.Label>
            <InputGroup className={cx('txt', 'infor-item')}>
              <Form.Control
                type="text"
                name="numberSeat"
                value={formData.numberSeat}
                aria-label="numberSeat"
                className={cx('txt')}
                readOnly
              />
              <InputGroup.Text className={cx('txt')}>
                <FontAwesomeIcon icon={faTicket} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col className={cx('col-sm-12 col-md-6', 'col-form')}>
          <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput5">
            <Form.Label className="mb-3">
              Biển số xe <span className="text-danger">*</span>
            </Form.Label>
            <InputGroup className={cx('txt', 'infor-item')}>
              <Form.Control
                type="text"
                name="licensePlateNumber"
                value={formData.licensePlateNumber}
                aria-label="licensePlateNumber"
                className={cx('txt')}
                readOnly
              />
              <InputGroup.Text className={cx('txt')}>
                <FontAwesomeIcon icon={faTicket} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput4">
            <Form.Label className="mb-3">
              Loại ghế<span className="text-danger">*</span>
            </Form.Label>
            <InputGroup className={cx('txt', 'infor-item')}>
              <Form.Control
                type="text"
                aria-label="typeSeat"
                name="typeSeat"
                className={cx('txt', 'selectbox', 'infor-item')}
                value={formData.typeSeat}
                readOnly
              ></Form.Control>
              <InputGroup.Text className={cx('txt')}>
                <FontAwesomeIcon icon={faCouch} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-4">
        <div className={cx('txt', 'padding-5')}>
          Tiện ích<span className="text-danger">*</span>
        </div>
        <SlideUtility
          enableEdit={true}
          setUpdateUtilitiesOfBus={setUpdateUtilitiesOfBus}
          utilitiesOfBus={formData.utilities}
          listUtilities={listUtilities}
        ></SlideUtility>
      </Row>
      <Row className={cx('infor-img', 'mt-5')}>
        <div className={cx('txt', 'padding-5')}>
          Hình ảnh<span className="text-danger">*</span>
        </div>
      </Row>
      <Row className={cx('infor-img', 'mt-3 ms-5 me-5', 'justify-content-center')}>
        <Row className={cx('list-img')}>
          {[...Array(6)].map((_, index) => (
            <Col xs={12} sm={6} md={4} key={index} className="d-flex justify-content-center">
              <div onClick={() => handleImageClick(index)}>
                <Image src={selectedFiles[index] || images.no_picture} thumbnail className={cx('img-vehicle')} />
                <input
                  type="file"
                  ref={(el) => (fileInputRefs.current[index] = el)}
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={(event) => handleFileChange(index, event)}
                />
              </div>
            </Col>
          ))}

          {warningMessage && (
            <Alert variant="danger" className={cx('warn', 'text-center')}>
              {warningMessage}
            </Alert>
          )}
        </Row>
      </Row>
      {enableEdit && (
        <Row className="justify-content-center mt-4">
          <Col></Col>
          <Col className="d-flex justify-content-center">
            <Button outline className={cx('ms-5 me-5', 'btn')} onClick={handleCancel}>
              Hủy
            </Button>
            <Button primary className={cx('ms-5 me-5', 'btn')} disabled={!activeAdd} onClick={handleUpdate}>
              Cập nhật
            </Button>
          </Col>
          <Col></Col>
        </Row>
      )}
    </div>
  )
}
export default UpdateBus
