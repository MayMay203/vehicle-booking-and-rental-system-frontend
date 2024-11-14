import classNames from 'classnames/bind'
import styles from './FormRegisterCarRental.module.scss'
import { useEffect, useState } from 'react'
import TakePhotoRegister from '../TakePhotoRegister'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form } from 'react-bootstrap'
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
const cx = classNames.bind(styles)
function FormDocuments({ setActiveNextFormDocs, formDocs, handleFormDocsChange }) {
  const [formData, setFormData] = useState(formDocs)
  const [policies, setPolicies] = useState(formDocs.policy.map((value, index) => ({ value, id: index })))
  const [policyCounter, setPolicyCounter] = useState(0)

  useEffect(() => {
    const allFieldsFilled =
      policies.every((policy) => typeof policy.value === 'string' && policy.value.trim() !== '') &&
      formData.description !== '' &&
      formData.imgAvatar !== '' &&
      formData.imgLicense !== '' &&
      formData.businessImages.filter((imgBusiness) => imgBusiness !== null).length >= 2

    console.log('allFieldsFilled..', allFieldsFilled)
    setActiveNextFormDocs(allFieldsFilled)
    handleFormDocsChange(formData)
  }, [formData, policies, setActiveNextFormDocs, handleFormDocsChange])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSavePhoto = (id, selectedFiles) => {
    // setSavePhoto(true)
    setFormData((prevState) => ({
      ...prevState,
      imgAvatar: selectedFiles[0],
      imgLicense: selectedFiles[1],
    }))
  }
  const handleSaveBusinessImages = (id, selectedFiles) => {
    // setSavePhoto(true)
    setFormData((prevState) => ({
      ...prevState,
      businessImages: selectedFiles,
    }))
  }

  const handleAddPolicy = () => {
    setPolicies((prevState) => {
      const updatedPolicies = [...prevState, { value: '', id: policyCounter + 1 }]
      setPolicyCounter(policyCounter + 1)
      setFormData((formDataPrev) => ({
        ...formDataPrev,
        policy: updatedPolicies.map((policy) => policy.value),
      }))
      return updatedPolicies
    })
  }
  const handleRemovePolicy = (id) => {
    setPolicies((prevState) => {
      const updatedPolicies = prevState.filter((policy) => policy.id !== id)
      setFormData((formDataPrev) => ({
        ...formDataPrev,
        policy: updatedPolicies.map((policy) => policy.value),
      }))

      // Trả về updatedPolicies để cập nhật lại policies state
      return updatedPolicies
    })
  }
  const handlePolicyChange = (e, id) => {
    const { value } = e.target
    setPolicies((prevState) => {
      const updatedPolicies = prevState.map((policy) => (policy.id === id ? { ...policy, value } : policy))
      setFormData((formDataPrev) => ({
        ...formDataPrev,
        policy: updatedPolicies.map((policy) => policy.value),
      }))

      return updatedPolicies
    })
  }

  return (
    <Form className={cx('form-more-infor')}>
      <Form.Group className={cx('txt', 'mb-3', 'pt-2')} controlId="formMoreInfor.ControlInput0">
        <TakePhotoRegister
          id={0}
          initialNumberPhoto={2}
          name_photos={['Ảnh đại diện đại lý', 'Ảnh giấy phép kinh doanh']}
          obligatory={true}
          handleSave={handleSavePhoto}
          urlImages={[formData.imgAvatar, formData.imgLicense]}
        />
        <TakePhotoRegister
          id={1}
          initialNumberPhoto={2}
          name_photos={['Ảnh đại lý', 'Ảnh đại lý']}
          obligatory={true}
          handleSave={handleSaveBusinessImages}
          urlImages={[formData.businessImages[0], formData.businessImages[1]]}
          enableAddImage={true}
        />
      </Form.Group>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formMoreInfor.ControlInput2">
        <Form.Label>
          Chính sách <span className="text-danger">*</span>
        </Form.Label>
        {policies.map((policy, index) => (
          <div className={cx('d-flex')} key={policy.id}>
            <Form.Control
              type="text"
              placeholder={`Nhập chính sách ${index + 1} `}
              value={policy.value}
              onChange={(e) => handlePolicyChange(e, policy.id)}
              className={cx('txt')}
            />
            <FontAwesomeIcon
              icon={faSquareMinus}
              className={cx('add-policy', 'ms-2')}
              onClick={() => handleRemovePolicy(policy.id)}
            />
          </div>
        ))}
        <FontAwesomeIcon icon={faSquarePlus} className={cx('add-policy')} onClick={handleAddPolicy} />
      </Form.Group>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formMoreInfor.ControlTextarea1">
        <Form.Label>
          Mô tả<span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          name="description"
          as="textarea"
          rows={3}
          className={cx('txt')}
          onChange={handleInputChange}
          value={formData.description}
        />
      </Form.Group>
    </Form>
  )
}
export default FormDocuments
