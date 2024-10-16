import { Modal } from 'react-bootstrap'
import styles from './ServiceModal.module.scss'
import classNames from 'classnames/bind'
import { useServiceModal } from '~/Context/ServiceModalProvider'
import Button from '~/components/Button'
import FormTextArea from '~/components/Form/FormTextArea'
import { useState } from 'react'
import { toast } from 'react-toastify'

const cx = classNames.bind(styles)
function ReasonModal() {
  const { isOpenServiceModal, closeServiceModal } = useServiceModal()
  const [reason, setReason] = useState('')

  const handleCancel = (e) => {
    e.preventDefault();
    toast.success('Huỷ vé xe thành công.', { autoClose: 1500, position: 'top-center' })
    closeServiceModal('cancel')
  }
  return (
    <Modal show={isOpenServiceModal.cancel} onHide={() => closeServiceModal('cancel')} centered size="md">
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title-header')}>Xác nhận huỷ vé</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form>
          <FormTextArea value={reason} title={'Lý do huỷ'} id="reason" onChange={ (e)=>{setReason(e.target.value)}} />
          <div className="d-flex column-gap-3 justify-content-end mt-5">
            <Button text onClick={() => closeServiceModal('cancel')} className={cx("btn-cancel")} type='button'>Thoát</Button>
            <Button primary type='submit' disabled={!reason} onClick={handleCancel}>Xác nhận</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default ReasonModal
