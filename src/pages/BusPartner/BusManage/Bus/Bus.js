import classNames from 'classnames/bind'
import styles from './Bus.module.scss'
import { Table } from 'antd'
import TxtSearch from '~/components/TxtSearch'
import Button from '~/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBus } from '~/apiServices/busPartner/deleteBus'
import { toast } from 'react-toastify'
import ModalBusInfor from '../ModalBusInfor'
import { busByID, fetchAllBuses } from '~/redux/slices/busPartnerSlice'
const cx = classNames.bind(styles)
function Bus() {
  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      align: 'center',
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Biển số xe',
      dataIndex: 'licensePlateNumber',
      align: 'center',
      showSorterTooltip: {
        target: 'full-header',
      },
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
        {
          text: 'Submenu',
          value: 'Submenu',
          children: [
            {
              text: 'Green',
              value: 'Green',
            },
            {
              text: 'Black',
              value: 'Black',
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Mô tả loại xe',
      dataIndex: 'typeVehicle',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 400,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      align: 'center',
      width: 200,
      render: (text, record) => (
        <Image
          rounded
          src={record.image}
          alt="Ảnh"
          style={{ width: '16rem', height: '10rem', objectFit: 'cover', border: '1px solid #D9D9D9' }}
        />
      ),
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: 'Xem',
      dataIndex: 'view',
      align: 'center',
      render: (text, record) => (
        <FontAwesomeIcon
          icon={faArrowUpRightFromSquare}
          style={{ cursor: 'pointer', color: '#A33A3A', fontSize: '2rem' }}
          onClick={() => handleViewBus(record.key)}
        />
      ),
    },
    {
      title: 'Sửa',
      dataIndex: 'update',
      align: 'center',

      render: (text, record) => (
        <FontAwesomeIcon
          icon={faEdit}
          style={{ cursor: 'pointer', color: '#FF672F', fontSize: '2rem' }}
          onClick={() => handleEditBus(record.key)}
        />
      ),
    },
    {
      title: 'Xóa',
      dataIndex: 'delete',
      align: 'center',
      render: (text, record) => (
        <FontAwesomeIcon
          icon={faTrash}
          style={{ cursor: 'pointer', color: '#D5420C', fontSize: '2rem' }}
          onClick={() => handleDeleteBus(record.key)}
        />
      ),
    },
  ]

  // const data = [
  //   {
  //     key: '1',
  //     licensePlateNumber: '30G-49344',
  //     typeVehicle: 'Limounsine 34 chỗ giường nằm',
  //     image: 'https://limody.vn/wp-content/uploads/2020/05/xe-di-bac-kan-5.png',
  //     view: '',
  //   },
  // ]
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false)
  const[selectedIDBus, setSelectedIDBus] = useState(null)
  const allBus = useSelector((state) => state.busPartner.busList)
  // Dùng useCallback để ghi nhớ hàm handleGetAllBus
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      try {
        dispatch(fetchAllBuses())
      } catch (message) {
        console.log(message)
      }
    }
  }, [dispatch])
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      try {
        const newData = allBus?.map((item) => ({
          key: item.busId,
          licensePlateNumber: item.licensePlate,
          typeVehicle: item.nameBusType,
          image: item.imageRepresentative,
        }))
        setData(newData)
        console.log('newData:', newData)
      } catch (message) {
        console.log(message)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allBus])
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  const navigate = useNavigate()
  const handleAddBus = () => {
    navigate('add-bus')
  }
  const dataInforBus = useSelector((state) => state.busPartner.inforBus)
  const handleViewBus = (id) => {
    setShowModal(true)
    setSelectedIDBus(id)
    console.log('id:', id)
  }
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      dispatch(busByID({ id: selectedIDBus }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIDBus])
  const handleEditBus = (id) => {
    navigate('update-bus', { state: { enableEdit: true, busID: id } })
  }
  const closeModal = () => {
    setShowModal(false)
    setSelectedIDBus(null)
  }
  const handleDeleteBus = async (id) => {
    if (dispatch(checkLoginSession())) {
      try {
        const response = await deleteBus(id)
        if (response) {
          toast.success('Xóa xe thành công!', { autoClose: 2000 })
          console.log('Xóa xe thành công!', response)
        }
      } catch (error) {
        console.log('Xóa thất bại:')
        console.log(error)
        // if (message === 'You have already registered this business partner') {
        toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 2000, position: 'top-center' })
        // }
      }
    }
  }
  return (
    <div className="container mt-4 mb-5">
      <div className={cx('header')}>{/* <p>Danh sách xe khách</p> */}</div>
      <div className={cx('d-flex', 'mb-4')}>
        <TxtSearch content={'Tìm xe khách'}></TxtSearch>
        <Button primary className={cx('btn-add')} onClick={handleAddBus}>
          Thêm xe
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        bordered
        pagination={false}
        scroll={{ y: 500 }}
        // pagination={{ position: ['bottomCenter'], pageSize: 10 }}
        rowClassName="table-row-center" // Thêm class để căn giữa dọc
        showSorterTooltip={{
          target: 'sorter-icon',
        }}
      />
      <ModalBusInfor
        show={showModal}
        selectedBus={dataInforBus}
        closeModal={closeModal}
        onHide={() => setShowModal(false)}
      />
    </div>
  )
}
export default Bus
