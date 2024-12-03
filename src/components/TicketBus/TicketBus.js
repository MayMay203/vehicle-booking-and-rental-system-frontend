import classNames from 'classnames/bind'
import styles from './TicketBus.module.scss'
import { Col, Form, Row } from 'react-bootstrap'
import AddManyBreakDay from '../AddManyBreakDay'
const cx = classNames.bind(styles)
function TicketBus() {
  return (
    <div className={cx('row', 'wrap-ticket')}>
      <Col className={cx('id-ticket')} lg={1}>
        Vé xe
      </Col>
      <Col lg={5} className={cx('p-3')}>
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
                className={cx('txt')}
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
                name="startDay"
                aria-label="startDay"
                className={cx('txt')}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className={cx('txt', 'mb-3', 'mt-3')} controlId="formAdd.ControlInput5">
              <Form.Label className="mb-2">
                Giá vé <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="45"
                name="price"
                aria-label="price"
                className={cx('txt')}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className={cx('txt', 'mb-3', 'mt-3')} controlId="formAdd.ControlInput5">
              <Form.Label className="mb-2">
                Giảm giá <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="45"
                name="discount"
                aria-label="discount"
                className={cx('txt')}
              />
            </Form.Group>
          </Col>
        </Row>
      </Col>
      <Col lg={6} className={cx('wrap-break-days')}>
        <AddManyBreakDay initialItems={[1]}></AddManyBreakDay>
      </Col>
    </div>
  )
}
export default TicketBus
