import classNames from 'classnames/bind'
import styles from './UpdateBusTrip.module.scss'
import { Col, Form, Modal, Row } from 'react-bootstrap'
import AddManyItems from '~/components/AddManyItems'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { detailBusTrip } from '~/apiServices/busPartner/detailBusTrip'
import { convertTimeFormat } from '~/utils/convertTimeFormat'
import AddManyDropOffLocation from '~/components/AddManyDropOffLocation'
// import AddManyDropOffLocation from '~/components/AddManyDropOffLocation'
const cx = classNames.bind(styles)
function UpdateBusTrip({ idBusTrip, ...props }) {
  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()
  const [initialDepartures, setInitialDepartures] = useState([{ value: '', id: 1 }])
  const [initialItemDropOffs, setInitialItemDropOffs] = useState([{
    value: formData.destination || '',
    duration: formData.duration || '',
    price: '',
    dropOffs: [''],
    idDropOffs: '',
    id: 1,
  }])
  useEffect(() => {
    const getInforBusTrip = async () => {
      if (dispatch(checkLoginSession())) {
        if (idBusTrip) {
          const response = await detailBusTrip(idBusTrip)
          setFormData(response)
          setInitialDepartures(response?.pickupLocations.map((item, index) => ({ value: item, id: index + 1 })))
          setInitialItemDropOffs(
            response?.dropOffLocationInfos.map((item, index) => ({
              value: item.province || '',
              duration: item.journeyDuration || '',
              price: item.priceTicket,
              dropOffs: item.dropOffLocations,
              idDropOffs: item.id,
              id: index + 1,
            })),
          )
        }
      }
    }
    getInforBusTrip()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idBusTrip, props.show])
  console.log('idBusTrip---formData:', idBusTrip, '--', formData)
  return (
    <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className={cx('title-modal', 'w-100', 'text-center')}>
          Cập nhật chuyến xe
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mt-4">
          <Col>
            <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput1">
              <Form.Label className="mb-3">
                Địa điểm xuất phát<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                aria-label="departureLocation"
                name="departureLocation"
                value={formData?.busTripInfo?.departureLocation}
                className={cx('txt', 'selectbox', 'add-item')}
                readOnly
                disabled
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput2">
              <Form.Label className="mb-3">
                Địa điểm đến<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                aria-label="arrivalLocation"
                name="arrivalLocation"
                value={formData?.busTripInfo?.arrivalLocation}
                className={cx('txt', 'selectbox', 'add-item')}
                readOnly
                disabled
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput3">
              <Form.Label className="mb-3">
                Thời gian di chuyển<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                aria-label="journeyDuration"
                name="journeyDuration"
                value={
                  formData?.busTripInfo?.journeyDuration ? convertTimeFormat(formData.busTripInfo.journeyDuration) : ''
                }
                className={cx('txt', 'selectbox', 'add-item')}
                readOnly
                disabled
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <AddManyItems
          formData={formData}
          idBusTrip={idBusTrip}
          mode="update"
          initialItems={initialDepartures}
          content={'Địa điểm đón khách'}
        ></AddManyItems>
        <div className={cx('line')}></div>
        <AddManyDropOffLocation
          mode="update"
          // setListDropOffs={setListDropOffs}
          idBusTrip={idBusTrip}
          departure={formData?.busTripInfo?.arrivalLocation}
          initialItems={initialItemDropOffs}
        ></AddManyDropOffLocation>
      </Modal.Body>
      {/* <Modal.Footer className="d-flex justify-content-center align-items-center">
        <div className="row w-100">
          <Col></Col>
          <div className="col d-flex justify-content-center">
            <Button outline className={cx('btn')}>
              Hủy
            </Button>
          </div>
          <div className="col d-flex justify-content-center">
            <Button primary outline className={cx('btn')}>
              Cập nhật
            </Button>
          </div>
          <Col></Col>
        </div>
      </Modal.Footer> */}
    </Modal>
  )
}
export default UpdateBusTrip
