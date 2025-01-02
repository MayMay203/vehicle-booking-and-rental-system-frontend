import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './CRUDImage.module.scss'
import { Image, Alert } from 'react-bootstrap'
import { images } from '~/assets/images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faSquarePlus } from '@fortawesome/free-regular-svg-icons'
// import Button from '../Button'
const cx = classNames.bind(styles)
function CRUDImage({ initialNumberPhoto, imagePerRow, handleSave, obligatory, urlImages }) {
  console.log('initialNumberPhoto', initialNumberPhoto)
  const [numberPhoto, setNumberPhoto] = useState(initialNumberPhoto)
  console.log('numberPhoto', numberPhoto)
  const fileInputRefs = useRef(Array(numberPhoto).fill(null))
  console.log('urlImages', urlImages)
  const [selectedFiles, setSelectedFiles] = useState(urlImages)
  const [hasSaved, setHasSaved] = useState(false)
  const handleImageClick = (index) => {
    fileInputRefs.current[index].click()
  }
  const [warningMessage, setWarningMessage] = useState('')
  const maxSizeImage = 3 * 1024 * 1024
  const handleFileChange = (index, event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/') && file.size <= maxSizeImage) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        const newFiles = [...selectedFiles]
        newFiles[index] = e.target.result 
        setSelectedFiles(newFiles)
        setHasSaved(false)
        setWarningMessage('')

        if (handleSave) {
          handleSave(newFiles) 
        }
      }
    } else if (file && !file.type.startsWith('image/')) {
      setWarningMessage('Vui lòng chọn file ảnh!')
    } else if (file && file.type.startsWith('image/') && file.size > maxSizeImage) {
      setWarningMessage('Vui lòng chọn file có kích thước <= 3MB !')
    }
  }

  useEffect(() => {setSelectedFiles(urlImages)}, [urlImages])
  useEffect(() => {
    setNumberPhoto(initialNumberPhoto)
  }, [initialNumberPhoto])
  const handleAddImage = () => {
    setNumberPhoto((prevNumber) => prevNumber + 1)
    setSelectedFiles((prevFiles) => [...prevFiles, null]) 
    fileInputRefs.current = [...fileInputRefs.current, null]
    if (handleSave) {
      handleSave([...selectedFiles, null])
    }
  }

  const handleRemoveImage = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    setNumberPhoto((prevNumber) => prevNumber - 1)
    fileInputRefs.current = fileInputRefs.current.filter((_, i) => i !== index)
    if (handleSave) {
      handleSave(selectedFiles.filter((_, i) => i !== index))
    }
  }


  useEffect(() => {
    const allImagesSelected = selectedFiles.every((file) => file !== null)
    if (allImagesSelected && !hasSaved) {
      handleSave(selectedFiles)
      console.log('url ảnh:', selectedFiles)
      setHasSaved(true)
    } else if (!allImagesSelected && hasSaved) {
      setHasSaved(false) 
    }
  }, [selectedFiles, handleSave, hasSaved])

  return (
    <div>
      <div className={cx('justify-content-center overflow-none row-cols-5 flex-wrap d-flex')}>
        {Array.from({ length: numberPhoto }, (_, i) => (
          <div key={i} className={cx('text-center col mx-2')}>
            <input
              type="file"
              ref={(el) => (fileInputRefs.current[i] = el)}
              style={{ display: 'none' }}
              onChange={(event) => handleFileChange(i, event)}
              accept="image/*"
            />
            <Image
              src={selectedFiles[i] || images.no_picture}
              thumbnail
              className={cx('img')}
              onClick={() => handleImageClick(i)}
            />
            <FontAwesomeIcon
              icon={faCircleXmark}
              className={cx('icon-remove')}
              onClick={() => handleRemoveImage(i)}
            ></FontAwesomeIcon>
            {warningMessage && (
              <Alert variant="danger" className={cx('warn')}>
                {warningMessage}
              </Alert>
            )}
          </div>
        ))}

        {selectedFiles.length < 8 && (
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
export default CRUDImage
