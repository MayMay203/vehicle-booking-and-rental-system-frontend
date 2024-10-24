import { Modal } from 'react-bootstrap'
import styles from './GeneralModal.module.scss'
import classNames from 'classnames/bind'
import Button from '~/components/Button'
import FormTextArea from '~/components/Form/FormTextArea'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { generalModalNames, setConfirmModalVisible } from '~/redux/slices/generalModalSlice'
import { lockAccount } from '~/apiServices/lockAccount'
import { checkLoginSession } from '~/redux/slices/userSlice'

const cx = classNames.bind(styles)
function InputConfirmModal() {
  console.log('re-render input - confirm modal')
  const showInputConfirm = useSelector((state) => state.generalModal.inputConfirm)
  const dispatch = useDispatch()

  const [reason, setReason] = useState('')

  const handleConfirm = async (e) => {
    e.preventDefault()
    if (showInputConfirm.name === generalModalNames.CANCEL_TICKET) {
      toast.success('Huỷ vé xe thành công.', { autoClose: 1200, position: 'top-center' })
    } else if (showInputConfirm.name === generalModalNames.LOCK_ACCOUNT) {
      const accountId = showInputConfirm.id
      try {
        if (dispatch(checkLoginSession())) {
          await lockAccount(accountId)
          toast.success('Khoá tài khoản thành công', { autoClose: 800, position: 'top-center' })
        }
      } catch (message) {
        toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 800, position: 'top-center' })
      }
    }
    handleClose()
  }

  const handleClose = () => {
    dispatch(setConfirmModalVisible({ modalType: 'inputConfirm', isOpen: false }))
  }
  return (
    <Modal show={showInputConfirm.isOpen} onHide={handleClose} centered size="md">
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title-header')}>{showInputConfirm.title}</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form>
          <FormTextArea
            value={reason}
            title={showInputConfirm.description}
            id="reason"
            onChange={(e) => {
              setReason(e.target.value)
            }}
          />
          <div className="d-flex column-gap-5 justify-content-center mt-5">
            <Button outline onClick={handleClose} type="button">
              Thoát
            </Button>
            <Button primary type="submit" disabled={!reason} onClick={handleConfirm}>
              Xác nhận
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default InputConfirmModal
