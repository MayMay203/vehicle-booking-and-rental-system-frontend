import styles from './RegisterPartner.module.scss'
import classNames from 'classnames/bind'
import {Col, Row} from 'react-bootstrap'
import AccordionQAList from '~/components/AccordionQA/AccordionQAList'
import FormRegisterDriver from '~/components/FormRegisterDriver'
import NoteBeforeRegisterPartner from '~/components/NoteBeforeRegisterPartner'
import ProcedureResgisterPartner from '~/components/ProcedureResgisterPartner'
import { images } from '~/assets/images'
import CardsFeedbackPartner from '~/components/CardFeedbackPartner'
import FormRegisterBus from '~/components/FormRegisterBus'
import FormRegisterCarRental from '~/components/FormRegisterCarRental'
import { createSearchParams, useLocation } from 'react-router-dom'
import FormApprovedRegister from '~/components/FormApprovedRegister'
import FormPendingApproveRegister from '~/components/FormPendingApproveRegister'
const cx = classNames.bind(styles)
function RegisterPartner() {
  const location = useLocation()
  const searchParam = createSearchParams(location.search)
  const typePartner = searchParam.get('type')
  const status = searchParam.get('status')
  const driver = 'DRIVER_PARTNER'
  const carRental = 'CAR_RENTAL_PARTNER'
  const bus = 'BUS_PARTNER'
  const feedbackForDriver = [
    {
      id: 1,
      name: 'Nguyễn Thị Lan',
      feedback:
        'Cảm ơn Safety Travel vì đã tạo cho tôi cơ hội để kiếm thêm thu nhập... Mọi người rất. nhiều. Chức Safety Travel ngày càng phát triển!!!',
    },
    {
      id: 2,
      name: 'Nguyễn Bảo Lâm',
      feedback:
        'Cảm ơn Safety Travel vì đã tạo cho tôi cơ hội để kiếm thêm thu nhập... Mọi người rất. nhiều. Chức Safety Travel ngày càng phát triển!!!',
    },
    {
      id: 3,
      name: 'Nguyễn Thị Lan',
      feedback:
        'Cảm ơn Safety Travel vì đã tạo cho tôi cơ hội để kiếm thêm thu nhập... Mọi người rất. nhiều. Chức Safety Travel ngày càng phát triển!!!',
    },
    {
      id: 4,
      name: 'Nguyễn Bảo Lâm',
      feedback:
        'Cảm ơn Safety Travel vì đã tạo cho tôi cơ hội để kiếm thêm thu nhập... Mọi người rất. nhiều. Chức Safety Travel ngày càng phát triển!!!',
    },
    {
      id: 5,
      name: 'Nguyễn Thị Lan',
      feedback:
        'Cảm ơn Safety Travel vì đã tạo cho tôi cơ hội để kiếm thêm thu nhập... Mọi người rất. nhiều. Chức Safety Travel ngày càng phát triển!!!',
    },
    {
      id: 6,
      name: 'Nguyễn Bảo Lâm',
      feedback:
        'Cảm ơn Safety Travel vì đã tạo cho tôi cơ hội để kiếm thêm thu nhập... Mọi người rất. nhiều. Chức Safety Travel ngày càng phát triển!!!',
    },
  ]
  const feedbackForCarRental = [
    {
      id: 1,
      name: 'Trần Văn A',
      feedback: 'Dịch vụ cho thuê xe rất tốt, tôi đã có trải nghiệm tuyệt vời!',
    },
    {
      id: 2,
      name: 'Lê Thị B',
      feedback: 'Xe mới và sạch sẽ, tôi sẽ tiếp tục sử dụng dịch vụ!',
    },
  ]
  const feedbackForBus = [
    {
      id: 1,
      name: 'Nguyễn Văn C',
      feedback: 'Chuyến xe rất thoải mái, tôi rất thích!',
    },
    {
      id: 2,
      name: 'Phạm Thị D',
      feedback: 'Dịch vụ xe buýt rất đáng tin cậy, tôi sẽ giới thiệu cho bạn bè.',
    },
  ]
  
  const questionsAndAnswersForCarRental = [
    { question: 'Tôi có cần vệ sinh khi trả xe thuê?', answer: 'Có, bạn cần đảm bảo xe sạch sẽ khi trả lại.' },
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
  const questionsAndAnswersForBus = [
    { question: 'Tôi có cần vệ sinh khi trả xe khách?', answer: 'Có, bạn cần đảm bảo xe sạch sẽ khi trả lại.' },
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
  const questionsAndAnswersForDriver = [
    { question: 'Tôi có cần vệ sinh khi trả xe tài xế?', answer: 'Có, bạn cần đảm bảo xe sạch sẽ khi trả lại.' },
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

  const notesPartnerDriver = [
    { id: 1, content: 'Đọc kĩ quy định và chính sách bảo mật', sub_contents: [], icon: 'faCircleCheck'},
    { id: 2, content: 'Không chia sẻ tài khoản cho bên thứ ba.', sub_contents: [], icon: 'faCircleCheck'},
    { id: 3, content: 'Nếu không tuân thủ thì sẽ bị xử lí theo quy định.', sub_contents: [], icon: 'faCircleCheck'},
  ]
  const notesIsPartnerDriver = [
    {
      id: 1,
      content: 'Tự do và tự chủ về thời gian',
      sub_contents: [
        { id: 1, value: 'Thời gian linh động, bạn hoàn toàn có thể chủ động quyết định thời gian làm việc của mình' },
        { id: 2, value: 'Thời gian linh động, bạn hoàn toàn có thể chủ động quyết định thời gian làm việc của mình' },
      ],
      icon: 'faCircleCheck',
    },
    {
      id: 2,
      content: 'Thu nhập tin cậy',
      sub_contents: [
        {
          id: 1,
          value: 'Có bảng sao kê thu nhập trực tuyến trên ứng dụng giúp bạn quản lý tài chính của mình tốt hơn',
        },
        { id: 2, value: 'Rút tiền siêu nhanh' },
      ],
      icon: 'faCircleCheck',
    },
    {
      id: 3,
      content: 'Hỗ trợ nhanh chóng và liên tục',
      sub_contents: [
        { id: 1, value: 'Hỗ trợ Đối tác 24/7' },
        { id: 2, value: 'Thời gian linh động' },
      ],
      icon: 'faCircleCheck',
    },
  ]
  
  let questionsAndAnswers
  let listFeedback
  if (typePartner === driver) {
    listFeedback = feedbackForDriver
    questionsAndAnswers = questionsAndAnswersForDriver
  } else if (typePartner === carRental) {
    listFeedback = feedbackForCarRental
    questionsAndAnswers = questionsAndAnswersForCarRental
  } else if (typePartner === bus) {
    listFeedback = feedbackForBus
    questionsAndAnswers = questionsAndAnswersForBus
  }

  if (typePartner !== bus && typePartner !== carRental && typePartner !== driver) {
    return <div></div>
  }

  return (
    <div className={cx('container')}>
      <Row className={cx('wrap-row', 'align-items-center')}>
        <Col xl="6" className="align-items-center">
          <div className={cx('title')}>
            {typePartner === driver && 'Đối tác tài xế'}
            {typePartner === carRental && 'Đối tác cho thuê xe'}
            {typePartner === bus && 'Đối tác nhà xe'}
            <div className={cx('bg-title')}></div>
          </div>

          <div>
            <p className={cx('sub-title')}>Lưu ý trước khi đăng ký:</p>
            <NoteBeforeRegisterPartner notes={notesPartnerDriver}></NoteBeforeRegisterPartner>
            <p className={cx('sub-title')}>Quy trình đăng ký:</p>
            <ProcedureResgisterPartner></ProcedureResgisterPartner>
          </div>
        </Col>
        <Col xl="6" className={cx('wrap-right')}>
          <div className={cx('wrap-form')}>
            <div className={cx('form')}>
              {status === 'Not_registered_yet' ? (
                <>
                  {typePartner === driver && <FormRegisterDriver />}
                  {typePartner === bus && <FormRegisterBus />}
                  {typePartner === carRental && <FormRegisterCarRental />}
                </>
              ) : status === 'approved' ? (
                <FormApprovedRegister />
              ) : status === 'pending_approval' ? (
                <FormPendingApproveRegister />
              ) : (
                <></>
              )}
            </div>
            <div className={cx('bg-form', 'd-none', 'd-sm-block')}></div>
          </div>
        </Col>
      </Row>
      <Row className={cx('wrap-row align-items-center')}>
        <Col md="6">
          {typePartner === driver && <img src={images.why_driver} alt="why-driver" className={cx('img-why')}></img>}
          {typePartner === carRental && (
            <img src={images.why_car_rental} alt="why-car-rental" className={cx('img-why')}></img>
          )}
          {typePartner === bus && (
            <img src={images.why_passenger_bus} alt="why-passenger-bus" className={cx('img-why')}></img>
          )}
        </Col>
        <Col md="6">
          <p className={cx('sub-title')}>
            {typePartner === driver && 'Trở thành đối tác tài xế của Safety Travel'}
            {typePartner === carRental && 'Trở thành đối tác cho thuê xe của Safety Travel'}
            {typePartner === bus && 'Trở thành đối tác nhà xe của Safety Travel'}
          </p>
          <NoteBeforeRegisterPartner notes={notesIsPartnerDriver}></NoteBeforeRegisterPartner>
        </Col>
      </Row>
      <Row className={cx('wrap-row')}>
        <p className={cx('title-feedback')}>Một số chia sẻ từ đối tác</p>
        <CardsFeedbackPartner listFeedback={listFeedback}></CardsFeedbackPartner>
      </Row>
      <Row className={cx('wrap-last-row')}>
        <AccordionQAList questionsAndAnswers={questionsAndAnswers}></AccordionQAList>
      </Row>
    </div>
  )
}

export default RegisterPartner