import classNames from 'classnames/bind'
import styles from './ModalBusInfor.module.scss'
import Modal from 'react-bootstrap/Modal'
import { Col, InputGroup, Row, Form, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBus, faCouch, faTicket } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import SlideUtility from '~/components/SlideUtility'
import { images } from '~/assets/images'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { fetchAllUtilities } from '~/redux/slices/busPartnerSlice'
const cx = classNames.bind(styles)
function ModalBusInfor({ selectedBus, ...props }) {
  const dispatch = useDispatch()
  const listUtilities = useSelector((state) => state.busPartner.utilityList)
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      dispatch(fetchAllUtilities())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  const selectedFiles = selectedBus?.imagesBus || []
  const utilitiesOfBus = selectedBus?.utilities?.map((utility) => utility.id) || []
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className={cx('txt-title')}>
          THÔNG TIN XE KHÁCH
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={cx('container mt-5 mb-5', 'wrap-container')}>
          <Row className={cx('form-add-bus-trip', 'justify-content-center')}>
            <Col className={cx('col-sm-12 col-md-6', 'col-form')}>
              <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput4">
                <Form.Label className="mb-3">
                  Loại phương tiện<span className="text-danger">*</span>
                </Form.Label>
                <InputGroup className={cx('txt', 'infor-item')}>
                  <Form.Control
                    type="text"
                    // aria-label="typeVehicle"
                    // name="typeVehicle"
                    className={cx('txt', 'selectbox', 'infor-item')}
                    value={selectedBus?.busType?.name}
                    readOnly
                  ></Form.Control>
                  <InputGroup.Text className={cx('txt')}>
                    <FontAwesomeIcon icon={faBus} />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput5">
                <Form.Label className="mb-3">
                  Số ghế <span className="text-danger">*</span>
                </Form.Label>
                <InputGroup className={cx('txt', 'infor-item')}>
                  <Form.Control
                    type="text"
                    // placeholder="45"
                    // name="numberSeat"
                    value={selectedBus?.busType?.numberOfSeat}
                    // aria-label="numberSeat"
                    className={cx('txt')}
                    readOnly
                  />
                  <InputGroup.Text className={cx('txt')}>
                    <FontAwesomeIcon icon={faTicket} />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col className={cx('col-sm-12 col-md-6', 'col-form')}>
              <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput5">
                <Form.Label className="mb-3">
                  Biển số xe <span className="text-danger">*</span>
                </Form.Label>
                <InputGroup className={cx('txt', 'infor-item')}>
                  <Form.Control
                    type="text"
                    // placeholder="30G-49344"
                    // name="licensePlate"
                    value={selectedBus?.licensePlate}
                    // aria-label="licensePlate"
                    className={cx('txt')}
                    readOnly
                  />
                  <InputGroup.Text className={cx('txt')}>
                    <FontAwesomeIcon icon={faTicket} />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput4">
                <Form.Label className="mb-3">
                  Loại ghế<span className="text-danger">*</span>
                </Form.Label>
                <InputGroup className={cx('txt', 'infor-item')}>
                  <Form.Control
                    type="text"
                    // aria-label="typeSeat"
                    // name="typeSeat"
                    className={cx('txt', 'selectbox', 'infor-item')}
                    value={selectedBus?.busType?.chairType}
                    readOnly
                  ></Form.Control>
                  <InputGroup.Text className={cx('txt')}>
                    <FontAwesomeIcon icon={faCouch} />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-4">
            <div className={cx('txt', 'padding-5')}>
              Tiện ích<span className="text-danger">*</span>
            </div>
            <SlideUtility
              enableEdit={false}
              isModal={true}
              utilitiesOfBus={utilitiesOfBus}
              listUtilities={listUtilities}
            ></SlideUtility>
          </Row>
          <Row className={cx('infor-img', 'mt-5')}>
            <div className={cx('txt', 'padding-5')}>
              Hình ảnh<span className="text-danger">*</span>
            </div>
          </Row>
          <Row className={cx('infor-img', 'mt-3 ms-5 me-5', 'justify-content-center')}>
            <Row className={cx('list-img')}>
              {[...Array(6)].map((_, index) => (
                <Col xs={12} sm={6} md={4} key={index} className="d-flex justify-content-center">
                  <Image src={selectedFiles[index] || images.no_picture} thumbnail className={cx('img-vehicle')} />
                </Col>
              ))}
            </Row>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  )
}
export default ModalBusInfor
