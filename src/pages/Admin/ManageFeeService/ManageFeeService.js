import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { generalModalNames, setConfirmModalVisible, setFeeServiceModal } from '~/redux/slices/generalModalSlice'
import classNames from 'classnames/bind'
import styles from './ManageFeeService.module.scss'
import SearchInput from '~/components/SearchInput'
import { Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import Button from '~/components/Button'
import { fetchAllFeeServices } from '~/redux/slices/generalAdminSlice'

const cx = classNames.bind(styles)
function ManageFeeService() {
  const dispatch = useDispatch()
  const [searchDebounce, setSearchDebounce] = useState('')
  const feeServices = useSelector((state) => state.generalAdmin.feeServices)

  useEffect(() => {
      dispatch(fetchAllFeeServices())
  }, [dispatch])

  useEffect(() => {
    console.log(searchDebounce)
      dispatch(fetchAllFeeServices({ name: searchDebounce }))
  }, [searchDebounce, dispatch])

  const handleChange = (value) => {
    setSearchDebounce(value)
  }

  const handleUpdate = (e) => {
    const id = e.currentTarget.dataset.id
      dispatch(setFeeServiceModal({ isOpen: true, id: id }))
  }

  const handleDelete = (e) => {
    const id = e.currentTarget.dataset.id
    dispatch(
      setConfirmModalVisible({
        name: generalModalNames.FEE_SERVICE_MODAL,
        title: 'Xác nhận xoá dịch vụ',
        description: 'Bạn có chắc chắn xoá dịch vụ này?',
        isOpen: true,
        modalType: 'confirm',
        id,
      }),
    )
  }

  return (
    <div className="container pb-5">
      <div className={cx('header')}>
        <p>Danh sách phí dịch vụ</p>
      </div>
      <div className={cx('d-flex', 'mb-4', 'flex-column', 'flex-md-row', 'justify-content-md-between')}>
        <SearchInput handleChange={handleChange} className={cx('custom-search')} placeholder="Tìm kiếm tên dịch vụ" />
        <Button
          primary
          className={cx('btn-add', 'ms-auto')}
          onClick={() => dispatch(setFeeServiceModal({ name: generalModalNames.FEE_SERVICE_MODAL, isOpen: true }))}
        >
          Thêm dịch vụ
        </Button>
      </div>
      <div className="table-container" style={{ overflowX: 'auto' }}>
        <Table striped bordered hover className="table-container">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên dịch vụ</th>
              <th>Mô tả</th>
              <th>Phí dịch vụ</th>
              <th>Sửa</th>
              <th>Xoá</th>
            </tr>
          </thead>
          <tbody className={cx('body-table')}>
            {feeServices?.map((service, index) => (
              <tr key={service.id}>
                <td className="align-middle text-center">
                  <span className={cx('txt', 'text-center')}>{index + 1}</span>
                </td>
                <td className="align-middle">
                  <div className="p-2">
                    <span className={cx('txt')}>{service.name}</span>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="p-2">
                    <span className={cx('txt')}>{service.description}</span>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="p-2 d-flex justify-content-center">
                    <span className={cx('txt')}>{service.price}</span>
                  </div>
                </td>
                <td className="align-middle text-center">
                  <button data-id={service.id} onClick={handleUpdate} className="p-5">
                    <FontAwesomeIcon icon={faEdit} className={cx('icon-edit')}></FontAwesomeIcon>
                  </button>
                </td>
                <td className="align-middle text-center">
                  <button data-id={service.id} onClick={handleDelete} className="p-5">
                    <FontAwesomeIcon icon={faTrash} className={cx('icon-delete')}></FontAwesomeIcon>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default ManageFeeService
