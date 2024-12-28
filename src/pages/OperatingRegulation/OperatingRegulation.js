import classNames from 'classnames/bind'
import styles from './OperatingRegulation.module.scss'

const cx = classNames.bind(styles)

function OperatingRegulation() {
  return (
    <div className={cx('regulation-container', 'container', 'mt-5 mb-5')}>
      <h1 className={cx('txt-header')}>QUY CHẾ HOẠT ĐỘNG</h1>
      <p className={cx('txt-content')}>
        Chào mừng Quý khách đến với Safety Travel - hệ thống đặt vé xe, thuê xe và đăng ký đối tác uy tín và hiện đại
        tại Việt Nam.
      </p>

      <h2 className={cx('txt-content', 'bold')}>I. Phạm vi hoạt động</h2>
      <p className={cx('txt-content')}>
        Safety Travel cung cấp các dịch vụ bao gồm nhưng không giới hạn: mua vé xe khách, đặt xe thuê tự lái hoặc có tài
        xế, đăng ký làm đối tác nhà xe và đối tác cho thuê xe. Hệ thống tích hợp thanh toán online và tính năng chat
        trực tiếp với đối tác.
      </p>

      <h2 className={cx('txt-content', 'bold')}>II. Quy định dành cho khách hàng</h2>
      <ul className={cx('txt-content')}>
        <li>Khách hàng cần cung cấp thông tin chính xác khi đặt vé hoặc thuê xe.</li>
        <li>Thanh toán được thực hiện thông qua các cổng thanh toán hợp lệ và được bảo mật.</li>
        <li>Mọi thay đổi hoặc hủy vé phải tuân thủ theo chính sách quy định của từng dịch vụ cụ thể.</li>
        <li>Khách hàng phải tuân thủ quy định an toàn và bảo vệ tài sản trong quá trình sử dụng dịch vụ.</li>
      </ul>

      <h2 className={cx('txt-content', 'bold')}>III. Quy định dành cho đối tác</h2>
      <ul className={cx('txt-content')}>
        <li>Đối tác nhà xe và cho thuê xe phải đăng ký và cung cấp đầy đủ giấy tờ pháp lý liên quan.</li>
        <li>Đảm bảo phương tiện trong tình trạng tốt, đáp ứng đầy đủ các tiêu chuẩn an toàn.</li>
        <li>Tôn trọng và đảm bảo quyền lợi khách hàng, hỗ trợ khách trong mọi tình huống.</li>
        <li>Không được hủy chuyến hoặc từ chối phục vụ mà không có lý do chính đáng.</li>
      </ul>

      <h2 className={cx('txt-content', 'bold')}>IV. Chính sách bảo mật và thanh toán</h2>
      <p className={cx('txt-content')}>
        Safety Travel cam kết bảo mật thông tin cá nhân và thanh toán của khách hàng. Các giao dịch được mã hóa và tuân
        thủ các tiêu chuẩn bảo mật quốc tế.
      </p>

      <h2 className={cx('txt-content', 'bold')}>V. Điều khoản chung</h2>
      <ul className={cx('txt-content')}>
        <li>Safety Travel có quyền chỉnh sửa, bổ sung quy chế mà không cần thông báo trước.</li>
        <li>Quy chế này có hiệu lực ngay khi được công bố trên hệ thống.</li>
        <li>Mọi tranh chấp phát sinh sẽ được giải quyết trên tinh thần hợp tác và tôn trọng lẫn nhau.</li>
      </ul>

      <p className={cx('txt-content')}>
        Để biết thêm thông tin chi tiết, vui lòng liên hệ với đội ngũ hỗ trợ của chúng tôi.
      </p>
    </div>
  )
}

export default OperatingRegulation
