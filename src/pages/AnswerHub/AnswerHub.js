import styles from './AnswerHub.module.scss'
import classNames from 'classnames/bind'
import { Accordion, Tab, Tabs } from 'react-bootstrap'

const cx = classNames.bind(styles)
function AnswerHub() {
  return (
    <div className={cx('wrapper', 'container', 'wrap-content')}>
      <Tabs defaultActiveKey="buyTicket" fill id="noanim-tab-example" className="mb-3">
        <Tab eventKey="buyTicket" title="Dành cho khách mua vé">
          <Accordion alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span className={cx('txt')}>Tôi có thể hủy vé online đã đặt như thế nào?</span>
              </Accordion.Header>
              <Accordion.Body>
                <p className={cx('txt-content')}>
                  - Bạn có thể vào mục 'Đơn hàng của tôi', chọn mục 'Đơn mua vé' và chọn vé muốn hủy.
                </p>
                <p className={cx('txt-content')}> - Vé xe chỉ được huỷ trước ít nhất 12 tiếng khi bắt đầu khởi hành.</p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <span className={cx('txt')}>Làm thế nào để chỉnh sửa đánh giá điểm nhà xe?</span>
              </Accordion.Header>
              <Accordion.Body>
                <p className={cx('txt-content')}>- Bạn cần đăng nhập để sửa đánh giá chuyến đi.</p>
                <p className={cx('txt-content')}>
                  - Thời gian cho phép sửa đánh giá là trong vòng 14 ngày kể từ ngày khởi hành. Sau khi chỉnh sửa đánh
                  giá, nội dung đánh giá mới nhất của bạn sẽ được cập nhật lại tại Safety Travel.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <span className={cx('txt')}>
                  Vì sao khi đặt vé website Safety Travel chỉ hiển thị chọn số lượng ghế/giường chứ không cho chọn chỗ
                  chính xác mà tôi muốn?
                </span>
              </Accordion.Header>
              <Accordion.Body>
                <p className={cx('txt-content')}>
                  Một số nhà xe chưa hỗ trợ khách hàng chọn vị trí chỗ ngồi/giường nằm trên xe mà nhân viên nhà xe sẽ
                  linh hoạt sắp xếp chỗ khi khách lên xe. Do đó trong trường hợp này khi đặt vé online bạn chỉ chọn số
                  lượng vé cần đặt. Sau đó, bạn sẽ nhận được xác nhận thanh toán/đặt chỗ cho tổng số lượng vé và không
                  có số ghế/số giường chính xác.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <span className={cx('txt')}>Liên lạc với nhà xe/tài xế bằng cách nào?</span>
              </Accordion.Header>
              <Accordion.Body>
                <p className={cx('txt-content')}>
                  Ở mỗi vé xe có mục nhắn tin cho nhà xe đó, chọn vào biểu tượng nhắn tin để kết nối với nahf xe bạn
                  muốn.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <span className={cx('txt')}>Tôi có thể chuyển vé sang hãng xe khác được không?</span>
              </Accordion.Header>
              <Accordion.Body>
                <p className={cx('txt-content')}>
                  Việc chuyển vé sang hãng xe khác tương đương với việc hủy vé của hãng xe đang đặt và mua vé hãng xe
                  mới. Do đó, điều này có thể thực hiện được hay không và số tiền bạn cần thanh toán thêm bao nhiêu dựa
                  trên chính sách hủy vé của hãng xe bạn đang đặt vé cũng như số lượng chỗ còn lại và giá vé của hãng xe
                  mới.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>
                <span className={cx('txt')}>Ai sẽ là người giải quyết vấn đề cho khách?</span>
              </Accordion.Header>
              <Accordion.Body>
                <p className={cx('txt-content')}>
                  Safety Travel có bộ phận giải quyết sự cố, khiếu nại. Bộ phận này sẽ phối hợp với điều hành của các
                  hãng xe để giải quyết vấn đề của bạn qua số hotline: 0842059000
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
              <Accordion.Header>
                <span className={cx('txt')}>Chính sách và quy trình giải quyết tranh chấp, khiếu nại</span>
              </Accordion.Header>
              <Accordion.Body>
                <p className={cx('txt-content')}>
                  Khi có bất kỳ khiếu nại, tranh chấp nào xảy ra liên quan đến dịch vụ vận tải được kết nối qua sàn
                  thương mại điện tử Safety Travel, khách hàng vui lòng thông báo cho chúng tôi trong thời gian sớm
                  nhất. Safety Travel và nhà xe cung cấp dịch vụ cam kết sẽ có trách nhiệm tiếp cận và hỗ trợ khách hàng
                  để giải quyết mọi khiếu nại, tranh chấp đó trên cơ sở khách quan dựa trên thỏa thuận và quy định pháp
                  luật. Chúng tôi luôn đề cao cách thức giải quyết hòa giải, thương lượng giữa các bên nhằm duy trì mối
                  quan hệ tốt đẹp và sự tin tưởng của khách hàng vào các dịch vụ trên sàn thương mại điện tử Safety
                  Travel.
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Tab>
        <Tab eventKey="rental" title=" Dành cho khách thuê xe">
          <Accordion alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span className={cx('txt')}>Tôi có thể thuê xe theo giờ được không, chi phí như thế nào?</span>
              </Accordion.Header>
              <Accordion.Body>
                <p className={cx('txt-content')}>- Bạn có thể thuê xe theo giờ, ngày, tuần.</p>
                <p className={cx('txt-content')}>
                  - Chi phí thuê xe sẽ được tính từ giờ bắt đầu thuê tới khi kết thúc thuê, với mức giá phục thuộc vào
                  khung giờ bạn thuê:
                </p>
                <ul className={cx('txt-content')}>
                  <li>
                    <span className={cx('bold')}>Thuê từ 12h-</span> Chi phí sẽ tính..
                  </li>
                  <li>
                    <span className={cx('bold')}>Thuê từ 12h-</span> Chi phí sẽ tính..
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <span className={cx('txt')}>Tôi có thể hủy xe đã đặt không?</span>
              </Accordion.Header>
              <Accordion.Body>
                <p className={cx('txt-content')}>
                  Bạn có thể hủy xe đã đặt, số tiền bạn đã thanh toán (trừ tiền đặt chỗ trước) sẽ được hoàn lại trong
                  vòng 24h tính ngày làm việc. Nếu chưa nhận được vui lòng liên hệ qua số hotline.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <span className={cx('txt')}>Thuê xe có cần kí hợp đồng hay giấy tờ pháp lí nào không ?</span>
              </Accordion.Header>
              <Accordion.Body>
                <p className={cx('txt-content')}>
                  Khi nhận xe, để đảm bảo quyền lợi cho 2 bên và giải quyết tranh chấp khi xảy ra rủi ro, bạn nên kí hợp
                  đồng hay biên bản bàn giao xe với chủ xe.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <span className={cx('txt')}>Gửi đánh giá cho chủ xe sau chuyến đi như thế nào ?</span>
              </Accordion.Header>
              <Accordion.Body>
                <p className={cx('txt-content')}>- Bạn cần đăng nhập để sửa đánh giá chuyến đi.</p>
                <p className={cx('txt-content')}>
                  - Thời gian cho phép sửa đánh giá là trong vòng 14 ngày kể từ ngày nhận xe. Sau khi chỉnh sửa đánh
                  giá, nội dung đánh giá mới nhất của bạn sẽ được cập nhật lại tại Safety Travel.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <span className={cx('txt')}>Safety Travel có cho thuê xe có tài xế không ?</span>
              </Accordion.Header>
              <Accordion.Body>
                <p className={cx('txt-content')}>
                  Safety Travel đã có dịch vụ thuê xe có tài xế. Khách thuê có thể mở ứng dụng và chọn mục Thuê xe có
                  tài để tìm và thuê xe có tài xế.
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Tab>
        <Tab eventKey="busPartner" title="Dành cho Đối tác nhà xe">
          <Accordion alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span className={cx('txt')}>Thủ tục đăng vé như thế nào ?</span>
              </Accordion.Header>
              <Accordion.Body>
                <p className={cx('txt-content')}>- Bạn cần đăng nhập tài khoản với role đối tác.</p>
                <p className={cx('txt-content')}>
                  - Bạn có thể thêm vé xe ở mục 'Vé xe' hoặc ở mục 'Chuyến xe', bạn chọn chuyến muốn thêm vé và chọn
                  'Thêm lịch khởi hành'.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <span className={cx('txt')}>Khi nào nhà xe sẽ nhận được tiền bán vé từ Safety Travel</span>
              </Accordion.Header>
              <Accordion.Body>
                <p className={cx('txt-content')}>
                  Cuối mỗi tháng, Safety Travel sẽ tổng hợp tiền và chuyển qua tài khoản mà đối tác đã đăng ký. Số tiền
                  sẽ chuyển trong vòng 3 ngày làm việc.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <span className={cx('txt')}>Nếu tài khoản đối tác bị khóa thì sao?</span>
              </Accordion.Header>
              <Accordion.Body>
                <p className={cx('txt-content')}>
                  Tài khoản bị khóa khi bạn vi phạm những điều khoản của chúng tôi và có nêu rõ lí do gửi về email của
                  bạn. Nếu có thắc mắc vui lòng liên hệ số hotline.
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Tab>
        <Tab eventKey="rentalPartner" title="Dành cho Đối tác nhà xe">
          <Accordion alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span className={cx('txt')}>Thủ tục đăng xe cho thuê như thế nào ?</span>
              </Accordion.Header>
              <Accordion.Body>
                <p className={cx('txt-content')}>- Bạn cần đăng nhập tài khoản với role đối tác.</p>
                <p className={cx('txt-content')}>
                  - Bạn có thể thêm xe cho thuê ở mục 'Dịch vụ cho thuê', chọn 'Thêm dịch vụ'.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <span className={cx('txt')}>Khi nào đại lý cho thuê sẽ nhận được tiền bán vé từ Safety Travel</span>
              </Accordion.Header>
              <Accordion.Body>
                <p className={cx('txt-content')}>
                  Cuối mỗi tháng, Safety Travel sẽ tổng hợp tiền và chuyển qua tài khoản mà đối tác đã đăng ký. Số tiền
                  sẽ chuyển trong vòng 3 ngày làm việc.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <span className={cx('txt')}>Nếu tài khoản đối tác bị khóa thì sao?</span>
              </Accordion.Header>
              <Accordion.Body>
                <p className={cx('txt-content')}>
                  Tài khoản bị khóa khi bạn vi phạm những điều khoản của chúng tôi và có nêu rõ lí do gửi về email của
                  bạn. Nếu có thắc mắc vui lòng liên hệ số hotline.
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Tab>
      </Tabs>
    </div>
  )
}

export default AnswerHub
