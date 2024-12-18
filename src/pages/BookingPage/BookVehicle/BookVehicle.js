import { Row, Col, Breadcrumb } from 'react-bootstrap'
import styles from './BookVehicle.module.scss'
import classNames from 'classnames/bind'
import { images } from '~/assets/images'
import { useNavigate } from 'react-router-dom'
import { config } from '~/config'
import Button from '~/components/Button'
import AccordionQAList from '~/components/AccordionQA/AccordionQAList'
import BookingServiceCards from '~/components/BookingServiceCard'
import Voucher from '~/components/Voucher'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { fetchAllVouchersForUser, fetchAllVouchersInSystem } from '~/redux/slices/voucherSlice'
const cx = classNames.bind(styles)
function BookVehicle() {
  const { voucherUser } = useSelector((state) => state.voucher)
  const { isLogin } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    if (isLogin && dispatch(checkLoginSession())) {
      dispatch(fetchAllVouchersForUser())
    } else {
      dispatch(fetchAllVouchersInSystem())
    }
  }, [isLogin, dispatch])
  // Danh sách câu hỏi
  const questionsAndAnswers = [
    { question: 'Tôi có cần vệ sinh khi trả xe?', answer: 'Có, bạn cần đảm bảo xe sạch sẽ khi trả lại.' },
    { question: 'Xe có đầy bình xăng khi nhận không?', answer: 'Có, xe sẽ được cung cấp đầy bình xăng khi nhận.' },
    { question: 'Thủ tục thuê xe có phức tạp không?', answer: 'Không, thủ tục rất đơn giản và nhanh chóng.' },
    { question: 'Có yêu cầu đặt cọc không?', answer: 'Có, chúng tôi yêu cầu một khoản đặt cọc nhỏ.' },
    { question: 'Lái xe có được hỗ trợ không?', answer: 'Có, chúng tôi cung cấp hỗ trợ 24/7 cho khách hàng.' },
    { question: 'Có giới hạn quãng đường không?', answer: 'Có, có một số giới hạn tùy vào loại xe.' },
    { question: 'Xe có bảo hiểm không?', answer: 'Có, tất cả xe đều được bảo hiểm.' },
    { question: 'Tôi có cần mang theo giấy tờ gì khi thuê?', answer: 'Bạn cần mang theo CMND và bằng lái xe.' },
    {
      question: 'Nếu xe hỏng, tôi phải làm gì?',
      answer: 'Vui lòng liên hệ với chúng tôi ngay lập tức để được hỗ trợ.',
    },
  ]

  const navigate = useNavigate()
  const handleNavigateToBookingService = () => {
    navigate('/book-vehicle/booking-service')
  }

  return (
    <div className={cx('wrapper', 'container')}>
      <Breadcrumb className="mb-5">
        <Breadcrumb.Item href={config.routes.home}>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item href={config.routes.booking} active>
          Đặt xe
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row className={cx('wrap-header-page', 'm-0')}>
        <Col md="8" xs="5" className="p-0">
          <img className={cx('image')} alt="slider1_rental_page" src={images.booking_page}></img>
        </Col>
        <Col md="4" xs="7" className="d-flex flex-column justify-content-center align-items-center">
          <p className={cx('txt')}>Đặt xe trên Safely Travel</p>
          <div>
            <div className={cx('icon-txt')}>
              <img className={cx('img-icon')} alt="health_and_safety" src={images.health_and_safety}></img>
              <span className={cx('txt')}>An toàn</span>
            </div>
            <div className={cx('icon-txt')}>
              <img className={cx('img-icon')} alt="sensor_occupied" src={images.sensor_occupied}></img>
              <span className={cx('txt')}>Thông minh</span>
            </div>
            <div className={cx('icon-txt')}>
              <img className={cx('img-icon')} alt="acute" src={images.acute}></img>
              <span className={cx('txt')}>Nhanh chóng</span>
            </div>
          </div>
          <Button primary className={cx('btn-booking')} onClick={() => handleNavigateToBookingService()}>
            Đặt xe ngay
          </Button>
        </Col>
      </Row>
      <Row className="pt-5 pb-5">
        <p className={cx('title', 'p-5')}>DỊCH VỤ ĐẶT XE</p>
        <BookingServiceCards></BookingServiceCards>
      </Row>
      <Row className={cx(' pt-5 pb-5', 'background','align-items-center')}>
        <p className={cx('title', 'p-5')}>MÃ GIẢM GIÁ</p>
        {voucherUser.map((voucher) => (
          <Col className="col mt-0" key={voucher.id}>
            <Voucher className="m-auto" data={voucher} />
          </Col>
        ))}
      </Row>
      <AccordionQAList questionsAndAnswers={questionsAndAnswers}></AccordionQAList>
    </div>
  )
}

export default BookVehicle
