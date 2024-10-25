import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './TakePhotoRegister.module.scss'
import { Image } from 'react-bootstrap'
import { images } from '~/assets/images'
import Button from '../Button'
const cx = classNames.bind(styles)
function TakePhotoRegister({ number_photo, name_photos, handleSave, obligatory, noButton }) {
  const fileInputRefs = useRef(Array(number_photo).fill(null))
  const [selectedFiles, setSelectedFiles] = useState(Array(number_photo).fill(null))
  const handleImageClick = (index) => {
    fileInputRefs.current[index].click()
  }
  const [isSaved, setIsSaved] = useState(false)

  const handleFileChange = (index, event) => {
    const file = event.target.files[0]
    if (file) {
      const newFiles = [...selectedFiles]
      newFiles[index] = URL.createObjectURL(file)
      setSelectedFiles(newFiles)
    }
    setIsSaved(false)
  }
  const allImagesSelected = selectedFiles.every((file) => file !== null)  
  useEffect(() => {
    if (allImagesSelected) {
      handleSave()
    }
  }, [allImagesSelected, handleSave])
  return (
    <div>
      <div className="mt-3 mb-2 d-flex">
        <p className="fs-4">Tải ảnh lên</p>
        {obligatory && <span className="text-danger">*</span>}
      </div>
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
            <p className="fs-5">{name}</p>
          </div>
        ))}
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
