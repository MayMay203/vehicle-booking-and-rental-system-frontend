import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './TakePhotoRegister.module.scss'
import { Image, Alert } from 'react-bootstrap'
import { images } from '~/assets/images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'
// import Button from '../Button'
const cx = classNames.bind(styles)
function TakePhotoRegister({ initialNumberPhoto, name_photos, handleSave, obligatory, urlImages, enableAddImage }) {
  const [numberPhoto, setNumberPhoto] = useState(initialNumberPhoto)
  const [namePhotos, setNamePhotos] = useState(name_photos)
  const fileInputRefs = useRef(Array(numberPhoto).fill(null))
  console.log('urlImages', urlImages)
  // const [selectedFiles, setSelectedFiles] = useState(Array(numberPhoto).fill(null))
  const [selectedFiles, setSelectedFiles] = useState(urlImages)
  const [hasSaved, setHasSaved] = useState(false)
  const handleImageClick = (index) => {
    fileInputRefs.current[index].click()
  }
  //   const [isSaved, setIsSaved] = useState(false)
  const [warningMessage, setWarningMessage] = useState('')
  const handleFileChange = (index, event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        const newFiles = [...selectedFiles]
        newFiles[index] = e.target.result // Lấy Data URL của ảnh
        setSelectedFiles(newFiles)
        setHasSaved(false)
        setWarningMessage('')

        // Cập nhật lại urlImages nếu cần thiết
        if (handleSave) {
          handleSave(newFiles) // Cập nhật lại urlImages trong component cha
        }
      }
    } else if (file && !file.type.startsWith('image/')) {
      setWarningMessage('Vui lòng chọn file ảnh!')
    }
  }

  const handleAddImage = () => {
    setNumberPhoto((prevNumber) => prevNumber + 1)
    setSelectedFiles((prevFiles) => [...prevFiles, null]) // Thêm một ô mới cho ảnh chưa chọn
    fileInputRefs.current = [...fileInputRefs.current, null]
    setNamePhotos((prevNamePhotos) => [...prevNamePhotos, name_photos[0]])

    // Cập nhật lại urlImages nếu cần thiết
    if (handleSave) {
      handleSave([...selectedFiles, null]) // Cập nhật lại urlImages trong component cha
    }
  }

  useEffect(() => {
    const allImagesSelected = selectedFiles.every((file) => file !== null)
    // Chỉ gọi handleSave khi tất cả ảnh đã chọn và handleSave chưa được gọi
    if (allImagesSelected && !hasSaved) {
      handleSave(selectedFiles)
      console.log('url ảnh:', selectedFiles)
      setHasSaved(true) // Đánh dấu là đã gọi handleSave
    } else if (!allImagesSelected && hasSaved) {
      setHasSaved(false) // Đặt lại cờ khi có thay đổi và chưa đủ ảnh được chọn
    }
  }, [selectedFiles, handleSave, hasSaved])

  return (
    <div>
      <div className="mt-3 mb-2 d-flex">
        <p className="fs-4">Tải ảnh lên</p>
        {obligatory && <span className="text-danger">*</span>}
      </div>
      <div className={cx('justify-content-center overflow-none row-cols-3 flex-wrap d-flex')}>
        {namePhotos.slice(0, numberPhoto).map((name, index) => (
          <div key={index} className={cx('text-center col mx-2')}>
            <input
              type="file"
              ref={(el) => (fileInputRefs.current[index] = el)}
              style={{ display: 'none' }}
              onChange={(event) => handleFileChange(index, event)}
              accept="image/*"
            />
            <Image
              src={selectedFiles[index] || images.no_picture}
              thumbnail
              className={cx('img')}
              onClick={() => handleImageClick(index)}
            />
            {warningMessage && (
              <Alert variant="danger" className={cx('warn')}>
                {warningMessage}
              </Alert>
            )}
            <p className="fs-5">{name}</p>
          </div>
        ))}

        {enableAddImage && selectedFiles.length <4 && (
              <div className="d-flex mx-2 justify-content-center align-items-center col">
                <FontAwesomeIcon
                  icon={faSquarePlus}
                  className={cx('icon-add-img')}
                  onClick={handleAddImage}
                ></FontAwesomeIcon>
              </div>
            )}
      </div>
      {/* {!noButton && (
        <div className="d-flex justify-content-center">
          <Button outline className={cx('btn', 'btn-cancel')}>
            Hủy
          </Button>
          <Button
            primary
            className={cx('btn', 'btn-save')}
            disabled={!allImagesSelected || isSaved}
            onClick={(event) => {
              event.preventDefault()
              setIsSaved(true)
              handleSave()
            }}
          >
            {!isSaved ? 'Lưu' : 'Đã lưu'}
          </Button>
        </div>
      )} */}
    </div>
  )
}
export default TakePhotoRegister
