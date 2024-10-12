import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faFileSignature, faHandHoldingDollar, faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { Col, Row } from 'react-bootstrap'
import styles from './StepOrder.module.scss'
const cx = classNames.bind(styles)

function StepOrder({ numberSteps, typeService, stepDoing }) {
  return (
    <Row className={cx('m-0 justify-content-center align-items-center', 'wrap-step')}>
      <Row>
        {numberSteps >= 1 && (
          <>
            <Col className={cx('step')}>
              <div className={cx('icon-step', stepDoing === 1 ? 'doing' : stepDoing > 1 ? 'done' : '')}>
                <FontAwesomeIcon icon={faCar}></FontAwesomeIcon>
              </div>
              <Row className={cx('content-step', stepDoing === 1 ? 'doing' : stepDoing > 1 ? 'done' : '')}>
                <span>Tìm và chọn xe</span>
              </Row>
            </Col>
            <Col>
              <hr className={cx('line-dashed', stepDoing === 1 ? 'doing' : stepDoing > 1 ? 'done' : '')} />
            </Col>
          </>
        )}

        {numberSteps >= 2 && (
          <>
            <Col className={cx('step')}>
              <div className={cx('icon-step', stepDoing === 2 ? 'doing' : stepDoing > 2 ? 'done' : '')}>
                <FontAwesomeIcon icon={faFileSignature}></FontAwesomeIcon>
              </div>
              <Row className={cx('content-step', stepDoing === 2 ? 'doing' : stepDoing > 2 ? 'done' : '')}>
                <span>Xác nhận {typeService}</span>
              </Row>
            </Col>
            <Col>
              <hr className={cx('line-dashed', stepDoing === 2 ? 'doing' : stepDoing > 2 ? 'done' : '')} />
            </Col>
          </>
        )}

        {numberSteps >= 3 && (
          <>
            <Col className={cx('step')}>
              <div className={cx('icon-step', stepDoing === 3 ? 'doing' : stepDoing > 3 ? 'done' : '')}>
                <FontAwesomeIcon icon={faHandHoldingDollar}></FontAwesomeIcon>
              </div>
              <Row className={cx('content-step', stepDoing === 3 ? 'doing' : stepDoing > 3 ? 'done' : '')}>
                <span>Thanh toán</span>
              </Row>
            </Col>
          </>
        )}
        {numberSteps >= 4 && (
          <>
            <Col>
              <hr className={cx('line-dashed', stepDoing === 2 ? 'doing' : stepDoing > 3 ? 'done' : '')} />
            </Col>
            <Col className={cx('step')}>
              <div className={cx('icon-step', stepDoing === 3 ? 'doing' : '')}>
                <FontAwesomeIcon icon={faMapLocationDot}></FontAwesomeIcon>
              </div>
              <Row className={cx('content-step', stepDoing === 3 ? 'doing' : '')}>
                <span>Theo dõi xe</span>
              </Row>
            </Col>
          </>
        )}
      </Row>
    </Row>
  )
}

export default StepOrder
