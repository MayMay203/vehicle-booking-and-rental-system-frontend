import React, { useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './TakePhotoRegister.module.scss'
import { Image, Alert } from 'react-bootstrap'
import { images } from '~/assets/images'
import Button from '../Button'
const cx = classNames.bind(styles)
function TakePhotoRegister({ number_photo, name_photos, handleSave }) {
  const fileInputRefs = useRef(Array(number_photo).fill(null))
  const [selectedFiles, setSelectedFiles] = useState(Array(number_photo).fill(null))
  const handleImageClick = (index) => {
    fileInputRefs.current[index].click()
  }
  const [isSaved, setIsSaved] = useState(false)
  const [warningMessage, setWarningMessage] = useState('')
  const handleFileChange = (index, event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const newFiles = [...selectedFiles]
      newFiles[index] = URL.createObjectURL(file)
      setSelectedFiles(newFiles)
      setWarningMessage('')
    } else if (file && !file.type.startsWith('image/')) {
      setWarningMessage('Vui lòng chọn file ảnh!')
    }
    setIsSaved(false)
  }
  const allImagesSelected = selectedFiles.every((file) => file !== null)
  return (
    <div>
      <p className="mt-3 mb-2 fs-4">Tải ảnh lên</p>
      <div className="d-flex justify-content-center overflow-none flex-wrap">
        {name_photos.slice(0, number_photo).map((name, index) => (
          <div key={index} className="text-center mx-2">
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
            {warningMessage && <Alert variant="danger" className={cx('warn')}>{warningMessage}</Alert>}
            <p className="fs-5">{name}</p>
          </div>
        ))}
      </div>
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
    </div>
  )
}
export default TakePhotoRegister
