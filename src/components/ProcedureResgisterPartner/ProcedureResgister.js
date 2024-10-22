import styles from './ProcedureResgister.module.scss'
import classNames from 'classnames/bind'
import {Col, Row} from 'react-bootstrap'
import {images} from '~/assets/images'
import Image from 'react-bootstrap/Image'
const cx = classNames.bind(styles)
function ProcedureResgister(){
    return (
      <div className={cx('row justify-content-center', 'wrap-step')}>
        <Col xs="3" className={cx('step')}>
          <div className={cx('icon-step')}>
            <Image src={images.step_1_register_partner} roundedCircle className={cx('image')} />
          </div>
          <Row className={cx('content-step')}>
            <span>Điền thông tin đăng ký</span>
          </Row>
        </Col>
        <Col xs="1">
          <hr className={cx('line-dashed')} />
        </Col>
        <Col xs="3" className={cx('step')}>
          <div className={cx('icon-step')}>
            <Image src={images.step_2_register_partner} roundedCircle className={cx('image')} />
          </div>
          <Row className={cx('content-step')}>
            <span>Chờ được xác nhận</span>
          </Row>
        </Col>
        <Col xs="1">
          <hr className={cx('line-dashed')} />
        </Col>
        <Col xs="3" className={cx('step')}>
          <div className={cx('icon-step')}>
            <Image src={images.step_3_register_partner} roundedCircle className={cx('image')} />
          </div>
          <Row className={cx('content-step')}>
            <span>Hợp tác kinh doanh</span>
          </Row>
        </Col>
      </div>
    )
}
export default ProcedureResgister