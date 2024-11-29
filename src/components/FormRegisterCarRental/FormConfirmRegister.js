import { Form } from 'react-bootstrap'
import styles from './FormRegisterCarRental.module.scss'
import classNames from 'classnames/bind'
import Button from '../Button'
import Notice from '../Notice'
import { useState, useEffect } from 'react'
const cx = classNames.bind(styles)
function FormConfirmRegister({ isRegister, formData, handleFormConfirmChange, handleRegister }) {
  const [formConfirm, setFormConfirm] = useState(formData)
   useEffect(() => {
     const allSelected = Object.values(formConfirm).every((value) => value === true)
     setActiveConfirm(allSelected)
     handleFormConfirmChange(formConfirm)
   }, [formConfirm, handleFormConfirmChange])
   const [activeConfirm, setActiveConfirm] = useState(false)
   const handleChangeSelect = (e) => {
     const { name, checked } = e.target
     setFormConfirm((prevState) => ({
       ...prevState,
       [name]: checked,
     }))
   }
   const handleCancel = (e) => {
     e.preventDefault()
     setFormConfirm({
       regulation: false,
       security: false,
       term: false,
       punishment: false,
     })
   }
  return (
    <>
      {!isRegister && (
        <Form>
          <p className={cx('txt-large')}>Xác nhận đăng ký</p>
          <p className={cx('fs-4', 'mb-3', 'txt-confirm')}>
            Tôi đồng ý và hiểu rằng rằng dữ liệu cá nhân của tôi sẽ được xử lý cho các mục đích mà tôi đăng ký. Tôi cũng
            đồng thời xác nhận thêm rằng bằng cách gửi đơn đăng ký của mình, tôi đã đọc, hiểu và đồng ý với Safety
            Travel trên các nội dung sau:
          </p>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check
              name="regulation"
              type="checkbox"
              label="Quy định làm đối tác."
              onChange={handleChangeSelect}
              className="lh-base fs-4"
              checked={formConfirm.regulation}
            />
          </Form.Group>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check
              name="security"
              type="checkbox"
              label="Chính sách Bảo mật."
              onChange={handleChangeSelect}
              className="lh-base fs-4"
              checked={formConfirm.security}
            />
          </Form.Group>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              name="term"
              label="Điều Khoản Sử Dụng dành cho Vận tải, Giao nhận, Thương mại."
              onChange={handleChangeSelect}
              className="lh-base fs-4"
              checked={formConfirm.term}
            />
          </Form.Group>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              name="punishment"
              label="Trường hợp vi phạm, tôi hiểu và đồng ý rằng Grab có quyền xử lý vi phạm của tôi theo các chế tài được quy định và công bố."
              onChange={handleChangeSelect}
              className="lh-base fs-4"
              checked={formConfirm.punishment}
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button outline className={cx('btn', 'btn-cancel')} onClick={handleCancel}>
              Hủy
            </Button>
            <Button primary className={cx('btn', 'btn-save')} disabled={!activeConfirm} onClick={handleRegister}>
              Xác nhận
            </Button>
          </div>
        </Form>
      )}
      {isRegister && (
        <Notice
          type={'success'}
          subtitle={'Đăng ký thành công!'}
          content={
            // 'Chúc mừng bạn đã trở thành đối tác cho thuê xe!\nCảm ơn vì đã tin tưởng và đồng hành cùng chúng tôi. Safety Travel chúc bạn sẽ có nhiều đơn đặt thuê xe nhé!'
            'Chúc mừng bạn đã đăng ký trở thành đối tác cho thuê xe của Safety Travel!\nCảm ơn vì đã tin tưởng đồng hành cùng chúng tôi.\nQuá trình xét duyệt sẽ mất một ít thời gian, nếu gặp vấn đề hay thắc mắc gì xin hãy liên hệ với chúng tôi qua số điện thoại: 0842059000.\n Safety Travel mong đợi hợp tác cùng bạn.'
          }
        ></Notice>
      )}
    </>
  )
}
export default FormConfirmRegister