import classNames from 'classnames/bind'
import styles from './RatingContent.module.scss'
import { Row, Col } from 'react-bootstrap'
import {images} from '~/assets/images'
import RatingStar from '../RatingStar'
const cx = classNames.bind(styles)
function RatingContent() {
    return (
      <Row className={cx('rating-card')}>
        <Row className='align-items-center'>
          <Col xs="2" md="1">
            <img src={images.avatar} className={cx('avatar')} alt='avatar' />
          </Col>
          <Col xs="7" md="8">
            <span>Bùi Thiên Bảo </span>
            <RatingStar></RatingStar>
          </Col>
          <Col xs="3" md="3" className={cx('time-wrap')}>
            <span className={cx('time')}>12h00, 23/08/2024</span>
          </Col>
        </Row>
        <Row>
          <Col xs="2" md="1" className={cx('comment-front')}></Col>
          <Col xs="10" md="11" className={cx('comment')}>
            Xe chạy êm, chủ xe tốt bụng có điều phí hơi đắt ~ ^o^ ~
          </Col>
        </Row>
      </Row>
    )
}
export default RatingContent
