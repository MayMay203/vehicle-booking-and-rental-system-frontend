import styles from './Modal.module.scss'
import classNames from 'classnames/bind'
import { Modal } from 'react-bootstrap'
import Button from '~/components/Button'
import Form from '~/components/Form'
import FormGender from '~/components/Form/FormGender'
import FormInput from '~/components/Form/FormInput'
import { useModal } from '~/Context/AuthModalProvider'

const cx = classNames.bind(styles)
function PersonalModal() {
  const { isOpenModal, openModal, closeModal } = useModal()
  const handleSignUp = () => {
    closeModal('info')
    openModal('login')
  }
  return (
    <Modal show={isOpenModal.info} onHide={() => closeModal('info')} centered>
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title')}>Thông tin cá nhân</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormInput id="phone" type="phone" title="Họ và tên" error="Trường này là bắt buộc" />
          <FormInput id="phone" type="date" title="Ngày sinh" error="Trường này là bắt buộc"/>
            <FormGender/>
          <Button className={cx('btn-submit')} onClick={handleSignUp}>
            Đăng ký
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default PersonalModal
