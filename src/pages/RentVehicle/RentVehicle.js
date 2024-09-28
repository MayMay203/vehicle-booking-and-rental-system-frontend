import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import styles from './RentVehicle.module.scss'
import classNames from 'classnames/bind'
import { images } from '~/assets/images'
import Voucher from '~/components/Voucher';
import AccordionQA from '~/components/AccordionQA';
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import PaginationDots from '~/components/PaginationDots';
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

  const [currentIndex, setCurrentIndex] = useState(0)
  const questionsPerPage = 5
  const [activeAccordions, setActiveAccordions] = useState(Array(questionsAndAnswers.length).fill(false))
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = Math.ceil(questionsAndAnswers.length / questionsPerPage)

  const resetAccordionStates = () => {
    setActiveAccordions(Array(questionsAndAnswers.length).fill(false))
  }

  const displayedQuestions = questionsAndAnswers.slice(currentIndex, currentIndex + questionsPerPage)

  const handleNext = () => {
    if (currentIndex + questionsPerPage < questionsAndAnswers.length) {
      resetAccordionStates()
      setCurrentIndex(currentIndex + questionsPerPage)
      setCurrentPage(currentPage + 1)
    }
  }
  const handlePrevious = () => {
    if (currentIndex - questionsPerPage >= 0) {
      resetAccordionStates()
      setCurrentIndex(currentIndex - questionsPerPage)
      setCurrentPage(currentPage - 1)
    }
  }

  const handlePageChange = (newPage) => {
    resetAccordionStates()
    const newIndex = newPage * questionsPerPage
    setCurrentIndex(newIndex)
    setCurrentPage(newPage)
  }

  const toggleAccordion = (index) => {
    const updatedAccordions = [...activeAccordions]
    updatedAccordions[index] = !updatedAccordions[index]
    setActiveAccordions(updatedAccordions)
  }

  return (
    <div className={cx('wrapper')}>
      <Container>
        <Row>
          <Col>
            <Carousel >
              <Carousel.Item className={cx('carousel-item')}>
                <img className={cx('d-block w-100')} alt="slider1_rental_page" src={images.slider1_rental_page}></img>
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item className={cx('carousel-item')}>
                <img className={cx('d-block w-100')} alt="slider1_rental_page" src={images.slider1_rental_page}></img>
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item className={cx('carousel-item')}>
                <img className={cx('d-block w-100')} alt="slider1_rental_page" src={images.slider1_rental_page}></img>
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
        <Row className="justify-content-center pt-5 pb-5">
          <p className={cx('title', 'p-5')}>DỊCH VỤ THUÊ XE TỰ LÁI</p>
          <div className={cx('trapezoid')}>
            <img className={cx('d-block w-100')} alt="slider1_rental_page" src={images.manned}></img>
            <div className={cx('text-overlay', 'p-4')}>Thuê xe ô tô</div>
          </div>
          <div className={cx('trapezoid', 'flipped')}>
            <img className={cx('d-block w-100')} alt="slider1_rental_page" src={images.self_driving}></img>
            <div className={cx('text-overlay', 'p-4')}>Thuê xe máy, mô tô</div>
          </div>
        </Row>
        <Row className={cx('justify-content-center pt-5 pb-5', 'background')}>
          <p className={cx('title', 'p-5')}>MÃ GIẢM GIÁ</p>
          <Col xxl="4" xl="6" className="d-flex flex-column align-items-center mb-5">
            <Voucher></Voucher>
          </Col>
          <Col xxl="4" xl="6" className={cx('d-flex flex-column align-items-center mb-5')}>
            <Voucher></Voucher>
          </Col>
          <Col xxl="4" xl="6" className="d-flex flex-column align-items-center mb-5">
            <Voucher></Voucher>
          </Col>
          <Col xxl="4" xl="6" className="d-flex flex-column align-items-center mb-5">
            <Voucher></Voucher>
          </Col>
          <Col xxl="4" xl="6" className="d-flex flex-column align-items-center mb-5">
            <Voucher></Voucher>
          </Col>
          <p className={cx('note', 'p-5 justify-content-center')}>Hãy sử dụng mã giảm giá để tiết kiệm hơn nhé!</p>
        </Row>
        <Row className="justify-content-center align-items-center pt-5 pb-5">
          <p className={cx('title', 'p-5')}>CÂU HỎI THƯỜNG GẶP</p>
          <Col xs="1" className="d-flex justify-content-start">
            <Button className={cx('nav-button')} onClick={handlePrevious} disabled={currentIndex === 0} variant="none">
              <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
            </Button>
          </Col>
          <Col xs="10">
            <Row className="justify-content-center">
              {displayedQuestions.map((qa, index) => (
                <AccordionQA
                  className=""
                  key={index}
                  question={qa.question}
                  answer={qa.answer}
                  active={activeAccordions[currentIndex + index]} // Trạng thái active được truyền vào
                  toggleAccordion={() => toggleAccordion(currentIndex + index)}
                ></AccordionQA>
              ))}
            </Row>
          </Col>
          <Col xs="1" className="d-flex justify-content-end">
            <Button
              className={cx('nav-button')}
              onClick={handleNext}
              disabled={currentIndex + questionsPerPage >= questionsAndAnswers.length}
              variant="none"
            >
              <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
            </Button>
          </Col>
          <PaginationDots
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          ></PaginationDots>
        </Row>
      </Container>
    </div>
  )
}

export default RentVehicle;