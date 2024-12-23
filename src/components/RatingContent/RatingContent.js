import classNames from 'classnames/bind'
import styles from './RatingContent.module.scss'
import { Row, Col } from 'react-bootstrap'
import { images } from '~/assets/images'
import RatingStar from '../RatingStar'
const cx = classNames.bind(styles)
function RatingContent({ data }) {
  console.log('===========data list rating ben con:', data)
  return (
    <Row className={cx('rating-card')}>
      <Row className="align-items-center">
        <Col xs="2" md="1">
          <img src={data.avatar ? data.avatar : images.avatar} className={cx('avatar')} alt="avatar" />
        </Col>
        <Col xs="7" md="8">
          <span>{data.customerName}</span>
          <RatingStar numberStar={data.ratingValue}></RatingStar>
        </Col>
        <Col xs="3" md="3" className={cx('time-wrap')}>
          <span className={cx('time')}> {data.commentDate.replace(' ', ', ')}</span>
        </Col>
      </Row>
      <Row>
        <Col xs="2" md="1" className={cx('comment-front')}></Col>
        <Col xs="10" md="11" className={cx('comment')}>
          {data.comment}
        </Col>
      </Row>
    </Row>
  )
}
export default RatingContent
