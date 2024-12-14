import {Row, Col, Carousel, Button, Breadcrumb } from 'react-bootstrap';
import styles from './RentVehicle.module.scss'
import classNames from 'classnames/bind'
import { images } from '~/assets/images'
// import VoucherList from '~/components/Voucher/VoucherList';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { config } from '~/config'
import AccordionQAList from '~/components/AccordionQA/AccordionQAList';
const cx = classNames.bind(styles)
function RentVehicle() {
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
  const manned = 'manned'
  const self_driving = 'self_driving'

  const navigate = useNavigate() 
  const handleNavigateToRentalService = (type) => {
    navigate('/rent-vehicle/rental-service', { state: { typeService: type} }) 
  }

  return (
    <div className={cx('wrapper', 'container')}>
      <Breadcrumb className="mb-5">
        <Breadcrumb.Item href={config.routes.home}>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item href={config.routes.renting} active>
          Thuê xe
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col>
          <Carousel>
            <Carousel.Item className={cx('carousel-item')}>
              <img className={cx('d-block w-100')} alt="slider1_rental_page" src={images.slider1_rental_page}></img>
              <Carousel.Caption>
                {/* <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className={cx('carousel-item')}>
              <img className={cx('d-block w-100')} alt="slider1_rental_page" src={images.slider2_rental_page}></img>
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className={cx('carousel-item')}>
              <img className={cx('d-block w-100')} alt="slider1_rental_page" src={images.slider3_rental_page}></img>
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
      <Row className="pt-5 pb-5">
        <p className={cx('title', 'p-5')}>DỊCH VỤ THUÊ XE</p>
        <Col sm="6" className="d-flex justify-content-start">
          <Button className={cx('trapezoid')} variant="none" onClick={() => handleNavigateToRentalService(manned)}>
            <img className={cx('d-block w-100')} alt="slider1_rental_page" src={images.manned}></img>
            <div className={cx('text-overlay', 'p-4')}>Thuê xe có người lái</div>
          </Button>
        </Col>
        <Col sm="6" className="d-flex justify-content-end">
          <Button
            className={cx('trapezoid', 'flipped', 'justify-content-right')}
            variant="none"
            onClick={() => handleNavigateToRentalService(self_driving)}
          >
            <img className={cx('d-block w-100')} alt="slider1_rental_page" src={images.self_driving}></img>
            <div className={cx('text-overlay', 'p-4')}>Thuê xe tự lái</div>
          </Button>
        </Col>
      </Row>
      <Row className={cx(' pt-5 pb-5', 'background')}>
        <p className={cx('title', 'p-5')}>MÃ GIẢM GIÁ</p>
        {/* <VoucherList></VoucherList> */}
      </Row>
      <AccordionQAList questionsAndAnswers={questionsAndAnswers}></AccordionQAList>
    </div>
  )
}

export default RentVehicle;