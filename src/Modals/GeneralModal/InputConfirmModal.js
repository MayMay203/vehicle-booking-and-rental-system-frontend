import { Modal } from 'react-bootstrap'
import styles from './GeneralModal.module.scss'
import classNames from 'classnames/bind'
import Button from '~/components/Button'
import FormTextArea from '~/components/Form/FormTextArea'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { generalModalNames, setConfirmModalVisible, setLoadingModalVisible } from '~/redux/slices/generalModalSlice'
import { lockAccount } from '~/apiServices/lockAccount'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { fetchAllAccounts } from '~/redux/slices/accountSlice'

const cx = classNames.bind(styles)
function InputConfirmModal() {
  console.log('re-render input - confirm modal')
  const showInputConfirm = useSelector((state) => state.generalModal.inputConfirm)
  const dispatch = useDispatch()

  const [reason, setReason] = useState('')

  const handleConfirm = async (e) => {
    e.preventDefault()
    dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: true }))
    if (showInputConfirm.name === generalModalNames.CANCEL_TICKET) {
      toast.success('Huỷ vé xe thành công.', { autoClose: 1200, position: 'top-center' })
    } else if (showInputConfirm.name === generalModalNames.LOCK_ACCOUNT) {
      const accountId = showInputConfirm.id
      try {
        if (dispatch(checkLoginSession())) {
          await lockAccount(accountId, reason)
          dispatch(setConfirmModalVisible({ modalType: 'confirm', isOpen: false }))
          dispatch(fetchAllAccounts({ active: true }))
          toast.success('Khoá tài khoản thành công. Đã gửi email thông báo tới tài khoản này.', { autoClose: 800, position: 'top-center' })
        }
      } catch (message) {
        toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 1200, position: 'top-center' })
      }
    } else if (showInputConfirm.name === generalModalNames.CANCEL_PARTNER) {
      // handle logic
    }
    dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: false}))
    handleClose()
  }

  const handleClose = () => {
    setReason('')
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
