import classNames from 'classnames/bind'
import styles from './FormRegisterBus.module.scss'
import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import TakePhotoRegister from '../TakePhotoRegister'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

function FormDocuments({ setActiveNextFormDocs }) {
  const [formData, setFormData] = useState({
    description: '',
  })
  const [policies, setPolicies] = useState([{ value: '', id: 0 }])
  const [savePhoto, setSavePhoto] = useState(false)
  const [policyCounter, setPolicyCounter] = useState(0)

  useEffect(() => {
    const allFieldsFilled =
      Object.values(formData).every((value) => value.trim() !== '') &&
      policies.every((policy) => policy.value.trim() !== '')
    setActiveNextFormDocs(allFieldsFilled && savePhoto)
  }, [formData, savePhoto, policies, setActiveNextFormDocs])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSavePhoto = () => {
    setSavePhoto(true)
  }

  const handleAddPolicy = () => {
    setPolicies((prevState) => [...prevState, { value: '', id: policyCounter + 1 }])
    setPolicyCounter(policyCounter + 1)
  }

  const handleRemovePolicy = (id) => {
    setPolicies((prevState) => prevState.filter((policy) => policy.id !== id))
  }

  const handlePolicyChange = (e, id) => {
    const { value } = e.target
    setPolicies((prevState) => prevState.map((policy) => (policy.id === id ? { ...policy, value } : policy)))
  }

  return (
    <Form className={cx('form-more-infor')}>
      <Form.Group className={cx('txt', 'mb-3', 'pt-2')} controlId="formMoreInfor.ControlInput0">
        <Form.Label>
          Ảnh giấy phép kinh doanh<span className="text-danger">*</span>
        </Form.Label>
        <TakePhotoRegister number_photo={1} name_photos={['Ảnh giấy phép kinh doanh']} handleSave={handleSavePhoto} />
      </Form.Group>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formMoreInfor.ControlInput1">
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
            {index === policies.length -1 ? (
              <FontAwesomeIcon icon={faSquarePlus} className={cx('add-policy')} onClick={handleAddPolicy} />
            ) : (
              <FontAwesomeIcon
                icon={faSquareMinus}
                className={cx('add-policy', 'ms-2')}
                onClick={() => handleRemovePolicy(policy.id)}
              />
            )}
          </div>
        ))}
      </Form.Group>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formMoreInfor.ControlTextarea1">
        <Form.Label>
          Mô tả<span className="text-danger">*</span>
        </Form.Label>
        <Form.Control name="description" as="textarea" rows={3} className={cx('txt')} onChange={handleInputChange} />
      </Form.Group>
    </Form>
  )
}

export default FormDocuments
