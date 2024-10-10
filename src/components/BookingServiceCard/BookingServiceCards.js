import { faCar, faMotorcycle, faBicycle, faBus, faTruck } from '@fortawesome/free-solid-svg-icons'
import styles from './BookingServiceCard.module.scss'
import classNames from 'classnames/bind'
import BookingServiceCard from './BookingServiceCard'
import { Col } from 'react-bootstrap'

const cx = classNames.bind(styles)

function BookingServiceCards() {
  return (
    <div className={cx('service-card-container')}>
      <Col xs="6" sm="4" md="3" xl="2">
        <BookingServiceCard name={'Xe ô tô 4 chỗ'} icon={faCar} color={'27AE60'} />
      </Col>
      <Col xs="6" sm="4" md="3" xl="2">
        <BookingServiceCard name={'Xe máy'} icon={faMotorcycle} color={'E20D0D'} />
      </Col>
      <Col xs="6" sm="4" md="3" xl="2">
        <BookingServiceCard name={'Xe đạp'} icon={faBicycle} color={'FFC700'} />
      </Col>
      <Col xs="6" sm="4" md="3" xl="2">
        <BookingServiceCard name={'Xe buýt'} icon={faBus} color={'2474E5'} />
      </Col>
      <Col xs="6" sm="4" md="3" xl="2">
        <BookingServiceCard name={'Xe ô tô 7 chỗ'} icon={faCar} color={'27AE60'} />
      </Col>
      <Col xs="6" sm="4" md="3" xl="2">
        <BookingServiceCard name={'Xe tải'} icon={faTruck} color={'D34714'} />
      </Col>
    </div>
  )
}

export default BookingServiceCards
