import classNames from 'classnames/bind'
import styles from './ManageUtilities.module.scss'
import Button from '~/components/Button'
import { Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { generalModalNames, setConfirmModalVisible, setUtilityModal } from '~/redux/slices/generalModalSlice'
import { useEffect, useState } from 'react'
import { fetchAllUtilities } from '~/redux/slices/generalAdminSlice'
import SearchInput from '~/components/SearchInput'
const cx = classNames.bind(styles)
function ManageUtilities() {
  const dispatch = useDispatch()
  const [searchDebounce, setSearchDebounce] = useState('')
  const utilitiesList = useSelector((state) => state.generalAdmin.utilitiesList)

  useEffect(() => {
    dispatch(fetchAllUtilities())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchAllUtilities({ name: searchDebounce }))
  }, [searchDebounce, dispatch])

  const handleChange = (value) => {
    setSearchDebounce(value)
  }

  const handleUpdate = (e) => {
    const id = e.currentTarget.dataset.id
    dispatch(setUtilityModal({ isOpen: true, id: id }))
  }

  const handleDelete = (e) => {
    const id = e.currentTarget.dataset.id
     dispatch(
       setConfirmModalVisible({
         name: generalModalNames.UTILITY_MODAL,
         title: 'Xác nhận xoá tiện ích',
         description: 'Bạn có chắc chắn xoá tiện ích này?',
         isOpen: true,
         modalType: 'confirm',
         id,
       }),
     )
  }

  return (
    <div className="container pb-5">
      <div className={cx('header')}>
        <p>Danh sách tiện ích</p>
      </div>
      <div className={cx('d-flex', 'mb-4', 'flex-column', 'flex-md-row', 'justify-content-md-between')}>
        <SearchInput handleChange={handleChange} className={cx('custom-search')} placeholder="Tìm kiếm tên tiện ích" />
        <Button primary className={cx('btn-add', 'ms-auto')} onClick={() => dispatch(setUtilityModal({name: generalModalNames.UTILITY_MODAL, isOpen: true}))}>
          Thêm tiện ích
        </Button>
      </div>
      <div className="table-container" style={{ overflowX: 'auto' }}>
        <Table striped bordered hover className="table-container">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên tiện ích</th>
              <th>Mô tả</th>
              <th>Hình ảnh</th>
              <th>Sửa</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody className={cx('body-table')}>
            {utilitiesList?.map((utility, index) => (
              <tr key={utility.id}>
                <td className="align-middle text-center">
                  <span className={cx('txt', 'text-center')}>{index + 1}</span>
                </td>
                <td className="align-middle">
                  <div className="p-1">
                    <span className={cx('txt')}>{utility.name}</span>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="p-1">
                    <span className={cx('txt')}>{utility.description}</span>
                  </div>
                </td>
                <td className="align-items-center text-center">
                  <img
                    alt="icon"
                    src={utility.image}
                    style={{ width: '72px', height: '72px', objectFit: 'cover' }}
                  ></img>
                </td>
                <td className="align-middle text-center">
                  <button data-id={utility.id} onClick={handleUpdate} className='p-5'>
                    <FontAwesomeIcon icon={faEdit} className={cx('icon-edit')}></FontAwesomeIcon>
                  </button>
                </td>
                <td className="align-middle text-center">
                  <button data-id={utility.id} onClick={handleDelete} className='p-5'><FontAwesomeIcon icon={faTrash} className={cx('icon-delete')}></FontAwesomeIcon></button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
export default ManageUtilities
