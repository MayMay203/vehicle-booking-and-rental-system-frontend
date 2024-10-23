import React, { useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './TakePhotoRegister.module.scss'
import { Image } from 'react-bootstrap'
import { images } from '~/assets/images'
import Button from '../Button'
const cx = classNames.bind(styles)
function TakePhotoRegister({ number_photo, name_photos, handleSave }) {
  const fileInputRefs = useRef(Array(number_photo).fill(null))
  const [selectedFiles, setSelectedFiles] = useState(Array(number_photo).fill(null))
  const handleImageClick = (index) => {
    fileInputRefs.current[index].click()
  }

  const handleFileChange = (index, event) => {
    const file = event.target.files[0]
    if (file) {
      const newFiles = [...selectedFiles]
      newFiles[index] = URL.createObjectURL(file)
      setSelectedFiles(newFiles)
    }
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
            <p className="fs-5">{name}</p>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <Button outline className={cx('btn', 'btn-cancel')}>
          Hủy
        </Button>
        <Button primary className={cx('btn', 'btn-save')} disabled={!allImagesSelected} onClick={(event) => {
          event.preventDefault()
          handleSave()}}>
          Lưu
        </Button>
      </div>
    </div>
  )
}
export default TakePhotoRegister
