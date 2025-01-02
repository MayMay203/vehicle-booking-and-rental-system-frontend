import classNames from 'classnames/bind'
import styles from './TicketBus.module.scss'
import { Col, Form, Row } from 'react-bootstrap'
import AddManyBreakDay from '../AddManyBreakDay'
import { useEffect, useState } from 'react'
// import { DatePicker } from 'antd'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { addNewBreakAndChangeDiscount } from '~/apiServices/busPartner/addNewBreakAndChangeDiscount'
import { fetchTicketInfor } from '~/redux/slices/busPartnerSlice'
import dayjs from 'dayjs'
const cx = classNames.bind(styles)
function UpdateTicketBus({ startDate, priceTicket, idTicket, data, enableEdit = true }) {
  const dispatch = useDispatch()
  const [activeAdd, setActiveAdd] = useState(false)
  const [saved, setSaved] = useState(false)
  const [dataBusTicket, setDataBusTicket] = useState({
    startOperationDay: '',
    discountPercentage: '',
    departureTime: '',
    breakDays: [''],
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setDataBusTicket((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const [newBreakDays, setNewBreakDays] = useState([])

  const setBreakDays = (days) => {
    setNewBreakDays(days)
    console.log()
  }
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const { breakDays = [], ...restOfDataBusTicket } = dataBusTicket

    // Check if all fields in `data` and `restOfDataBusTicket` are filled
    const allFieldsFilled =
      Object.values(data).every((value) => value?.toString().trim() !== '') &&
      Object.values(restOfDataBusTicket).every((value) => value?.toString().trim() !== '') 
      ///những giá trị trong mảng newBReakDays có giá trị
      setActiveAdd(allFieldsFilled)
    setSaved(false)
    console.log(
      'Có vô==data:',
      data,
      '---restOfDataBusTicket:',
      restOfDataBusTicket,
      '---allFieldsFilled',
      allFieldsFilled,
    )
  }, [dataBusTicket, data])
  const handleSave = async () => {
    if (dispatch(checkLoginSession())) {
      try {
        const filteredBreakDays = newBreakDays.filter((item) => item.startDay && item.endDay )

        const dataPost = {
          busTripScheduleId: idTicket,
          discountPercentage: dataBusTicket.discountPercentage,
          startOperationDay: dataBusTicket.startOperationDay,
          breakDays: filteredBreakDays,
        }

        console.log('------dataPost----', dataPost)

        const response = await addNewBreakAndChangeDiscount(dataPost)
        if (response) {
          toast.success('Cập nhật vé xe thành công!', { autoClose: 2000 })
          console.log('Cập nhật vé xe thành công!', response)
          setSaved(true)
          dispatch(fetchTicketInfor({ id: idTicket, date: dayjs(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD') }))
        }
      } catch (error) {
        console.log('Cập nhật thất bại:')
        console.log(error)
        toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 2000, position: 'top-center' })
      }
    }
  }
  useEffect(() => {
    if (data) {
      setDataBusTicket({
        startOperationDay: data?.startOperationDay,
        discountPercentage: data.discountPercentage,
        departureTime: data.departureTime,
        breakDays: data.breakDays,
      })
    }
  }, [data])
  return (
    <div className={cx('row', 'wrap-ticket')}>
      <Col className={cx('id-ticket')} sm={12} lg={1}>
        Vé xe
      </Col>
      <Col sm={12} lg={5} className={cx('p-3')}>
        <Row>
          <Col>
            <Form.Group className={cx('txt', 'mb-3', 'mt-3')} controlId="formAdd.ControlInput5">
              <Form.Label className="mb-2">
                Giờ khởi hành <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="45"
                name="departureTime"
                aria-label="departureTime"
                value={dataBusTicket.departureTime}
                className={cx('txt')}
                disabled
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className={cx('txt', 'mb-3', 'mt-3')} controlId="formAdd.ControlInput5">
              <Form.Label className="mb-2">
                Ngày bắt đầu <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="45"
                name="startOperationDay"
                aria-label="startOperationDay"
                value={dataBusTicket.startOperationDay}
                className={cx('txt')}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className={cx('txt', 'mb-3', 'mt-3')} controlId="formAdd.ControlInput5">
              <Form.Label className="mb-2">
                Giảm giá (%)<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="0"
                value={dataBusTicket.discountPercentage || ''}
                name="discountPercentage"
                aria-label="discountPercentage"
                className={cx('txt')}
                onChange={(e) => {
                  let value = e.target.value
                  if (value === '' || (value >= 0 && value <= 100)) {
                    handleInputChange(e)
                  } else {
                    toast.error('Vui lòng nhập gí trị từ 0 - 100!', {
                      autoClose: 2000,
                      position: 'top-center',
                    })
                  }
                }}
                max="100"
                min="0"
              />
            </Form.Group>
          </Col>
        </Row>
      </Col>
      <Col sm={12} lg={6} className={cx('wrap-break-days')}>
        <Row className="align-items-start">
          <Row className="align-items-start">
            <div className="d-flex align-items-start">
              <p className={cx('me-3', 'txt', 'p-2', 'background')}>Ngày nghỉ</p>
            </div>
            <div>
              {dataBusTicket?.breakDays?.length > 0 ? (
                dataBusTicket.breakDays.map((item) => (
                  <div className={cx('d-flex', 'align-items-start', 'mt-2', 'mb-2')} key={item.id}>
                    <Form.Group className={cx('txt', 'd-flex')} controlId={`formAddStart_${item.id}`}>
                      <Form.Label className="mb-2 d-flex mt-3 me-2">Từ</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="45"
                        name="startDay"
                        aria-label="startDay"
                        value={item.startDay}
                        className={cx('txt')}
                        readOnly
                      />
                    </Form.Group>
                    <Form.Group className={cx('txt', 'd-flex')} controlId={`formAddEnd_${item.id}`}>
                      <Form.Label className="mb-2 d-flex mt-3 ms-5 me-2">Đến</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="45"
                        name="endDay"
                        aria-label="endDay"
                        value={item.endDay}
                        className={cx('txt')}
                        readOnly
                      />
                    </Form.Group>
                  </div>
                ))
              ) : (
                <div className="text-muted">Không có dữ liệu nghỉ.</div>
              )}
            </div>
          </Row>
          <AddManyBreakDay
            initialItems={[{ start: '', end: '', id: 1 }]}
            content="Thêm ngày nghỉ"
            setBreakDays={setBreakDays}
          ></AddManyBreakDay>
        </Row>
      </Col>
      <div className={cx('save-button', { disabled: !activeAdd || saved})} onClick={activeAdd ? handleSave : undefined}>
        {saved ? 'Đã lưu' : ' Lưu vé xe'}
      </div>
    </div>
  )
}
export default UpdateTicketBus
