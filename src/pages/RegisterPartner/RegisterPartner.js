import styles from './RegisterPartner.module.scss'
import classNames from 'classnames/bind'
import {Col, Row} from 'react-bootstrap'
import AccordionQAList from '~/components/AccordionQA/AccordionQAList'
import FormRegisterDriver from '~/components/FormRegisterDriver'
import NoteBeforeRegisterPartner from '~/components/NoteBeforeRegisterPartner'
import ProcedureResgisterPartner from '~/components/ProcedureResgisterPartner'
import { images } from '~/assets/images'
import CardsFeedbackPartner from '~/components/CardFeedbackPartner'
const cx = classNames.bind(styles)
function RegisterPartner() {
  const listFeedback = [
    {
      id: 1,
      name: 'Nguyễn Thị Lan',
      feedback: 'Cảm ơn Safety Travel vì đã tạo cho tôi cơ hội để kiếm thêm thu nhập... Mọi người rất. nhiều. Chức Safety Travel ngày càng phát triển!!!',
    },
    {
      id: 2,
      name: 'Nguyễn Bảo Lâm',
      feedback: 'Cảm ơn Safety Travel vì đã tạo cho tôi cơ hội để kiếm thêm thu nhập... Mọi người rất. nhiều. Chức Safety Travel ngày càng phát triển!!!',
    },
    {
      id: 3,
      name: 'Nguyễn Thị Lan',
      feedback: 'Cảm ơn Safety Travel vì đã tạo cho tôi cơ hội để kiếm thêm thu nhập... Mọi người rất. nhiều. Chức Safety Travel ngày càng phát triển!!!',
    },
    {
      id: 4,
      name: 'Nguyễn Bảo Lâm',
      feedback: 'Cảm ơn Safety Travel vì đã tạo cho tôi cơ hội để kiếm thêm thu nhập... Mọi người rất. nhiều. Chức Safety Travel ngày càng phát triển!!!',
    },
    {
      id: 5,
      name: 'Nguyễn Thị Lan',
      feedback: 'Cảm ơn Safety Travel vì đã tạo cho tôi cơ hội để kiếm thêm thu nhập... Mọi người rất. nhiều. Chức Safety Travel ngày càng phát triển!!!',
    },
    {
      id: 6,
      name: 'Nguyễn Bảo Lâm',
      feedback: 'Cảm ơn Safety Travel vì đã tạo cho tôi cơ hội để kiếm thêm thu nhập... Mọi người rất. nhiều. Chức Safety Travel ngày càng phát triển!!!',
    },
  ]
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
  const notesPartnerDriver = [
    { id: 1, content: 'Đọc kĩ quy định và chính sách bảo mật', sub_contents: [], icon: 'faCircleCheck'},
    { id: 2, content: 'Không chia sẽ', sub_contents: [], icon: 'faCircleCheck'},
    { id: 3, content: 'Nếu không tuân thủ thì sẽ...', sub_contents: [], icon: 'faCircleCheck'},
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
  return (
    <div className={cx('container')}>
      <Row className={cx('wrap-row')}>
        <Col xl="6">
          <div className={cx('title')}>
            Đối tác tài xế
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
              <FormRegisterDriver></FormRegisterDriver>
            </div>
            <div className={cx('bg-form', 'd-none', 'd-sm-block')}></div>
          </div>
        </Col>
      </Row>
      <Row className={cx('wrap-row align-items-center')}>
        <Col md="6">
          <img src={images.why_driver} alt="why-driver" className={cx('img-why')}></img>
        </Col>
        <Col md="6">
          <p className={cx('sub-title')}>Trở thành đối tác tài xế của Safety Travel</p>
          <NoteBeforeRegisterPartner notes={notesIsPartnerDriver}></NoteBeforeRegisterPartner>
        </Col>
      </Row>
      <Row className={cx('wrap-row')}>
        <CardsFeedbackPartner listFeedback={listFeedback}></CardsFeedbackPartner>
      </Row>
      <Row className={cx('wrap-last-row')}>
        <AccordionQAList questionsAndAnswers={questionsAndAnswers}></AccordionQAList>
      </Row>
    </div>
  )
}

export default RegisterPartner