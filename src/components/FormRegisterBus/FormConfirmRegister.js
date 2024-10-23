import { Form } from 'react-bootstrap'
import styles from './FormRegisterBus.module.scss'
import classNames from 'classnames/bind'
import Button from '../Button'
import Notice from '../Notice'
import { useEffect, useState } from 'react'
const cx = classNames.bind(styles)
function FormConfirmRegister({ isRegister, handleRegister }) {
  const [formConfirm, setFormConfirm] = useState({
    regulation: false,
    security: false,
    term: false,
    punishment: false,
  })
  useEffect(() => {
    const allSelected = Object.values(formConfirm).every((value) => value === true)
    setActiveConfirm(allSelected)
  }, [formConfirm])
  const [activeConfirm, setActiveConfirm] = useState (false)
  const handleChangeSelect = (e) =>{
    const {name, checked} = e.target
    setFormConfirm((prevState) => ({
      ...prevState,
      [name]: checked,
    }))
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
            />
          </Form.Group>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check
              name="security"
              type="checkbox"
              label="Chính sách Bảo mật."
              onChange={handleChangeSelect}
              className="lh-base fs-4"
            />
          </Form.Group>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              name="term"
              label="Điều Khoản Sử Dụng dành cho Vận tải, Giao nhận, Thương mại."
              onChange={handleChangeSelect}
              className="lh-base fs-4"
            />
          </Form.Group>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              name="punishment"
              label="Trường hợp vi phạm, tôi hiểu và đồng ý rằng Grab có quyền xử lý vi phạm của tôi theo các chế tài được quy định và công bố."
              onChange={handleChangeSelect}
              className="lh-base fs-4"
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button outline className={cx('btn', 'btn-cancel')}>
              Hủy
            </Button>
            <Button
              primary
              className={cx('btn', 'btn-save')}
              disabled={!activeConfirm}
              onClick={() => handleRegister()}
            >
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
            'Chúc mừng bạn đã trở thành đối tác nhà xe!\nCảm ơn vì đã tin tưởng và đồng hành cùng chúng tôi. Safety Travel chúc bạn sẽ có nhiều hành trình tuyệt vời và an toàn nhé!'
          }
        ></Notice>
      )}
    </>
  )
}
export default FormConfirmRegister