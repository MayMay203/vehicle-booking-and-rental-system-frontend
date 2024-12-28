import classNames from 'classnames/bind'
import styles from './PolicySecurity.module.scss'

const cx = classNames.bind(styles)

function PolicySecurity() {
  return (
    <div className={cx('container', 'mt-5 mb-5')}>
      {/* <Logo className={cx('logo', 'mb-5')} /> */}
      {/* <div className={cx('line')}></div> */}
      <div className={cx('policy-container', 'mt-5 mb-5')}>
        <p className={cx('txt-header')}>Chính Sách Bảo Mật</p>
        <p className={cx('txt-content')}>
          Chào mừng bạn đến với Safety Travel! Chúng tôi cam kết bảo vệ thông tin cá nhân và dữ liệu của bạn khi sử dụng
          dịch vụ đặt vé, thuê xe, đăng ký làm đối tác nhà xe và đối tác cho thuê xe.
        </p>
        <h2 className={cx('txt-content', 'bold')}>1. Thu Thập Thông Tin</h2>
        <p className={cx('txt-content')}>
          Chúng tôi thu thập các thông tin như họ tên, số điện thoại, email, địa chỉ, thông tin thanh toán và lịch sử
          giao dịch khi bạn sử dụng hệ thống của chúng tôi.
        </p>
        <h2 className={cx('txt-content', 'bold')}>2. Sử Dụng Thông Tin</h2>
        <ul className={cx('txt-content')}>
          <li>Hỗ trợ đặt vé, thuê xe và các dịch vụ liên quan.</li>
          <li>Đăng ký và quản lý tài khoản đối tác.</li>
          <li>Xử lý thanh toán online an toàn và nhanh chóng.</li>
          <li>Hỗ trợ dịch vụ khách hàng và giải quyết khiếu nại.</li>
        </ul>
        <h2 className={cx('txt-content', 'bold')}>3. Bảo Vệ Dữ Liệu</h2>
        <p className={cx('txt-content')}>
          Dữ liệu của bạn được mã hóa và bảo vệ bởi các hệ thống bảo mật tiên tiến, đảm bảo an toàn trong suốt quá trình
          giao dịch và trò chuyện với đối tác qua hệ thống chat.
        </p>
        <h2 className={cx('txt-content', 'bold')}>4. Quyền Lợi Người Dùng</h2>
        <ul className={cx('txt-content')}>
          <li>Truy cập và chỉnh sửa thông tin cá nhân.</li>
          <li>Yêu cầu xóa dữ liệu nếu không còn sử dụng dịch vụ.</li>
          <li>Nhận thông báo về các thay đổi trong chính sách bảo mật.</li>
        </ul>
        <h2 className={cx('txt-content', 'bold')}>5. Chia Sẻ Thông Tin</h2>
        <p className={cx('txt-content')}>
          Chúng tôi không chia sẻ thông tin của bạn với bên thứ ba nếu không có sự đồng ý từ bạn, trừ các trường hợp
          pháp luật yêu cầu.
        </p>
        <p className={cx('txt-content')}>
          Nếu có bất kỳ câu hỏi hoặc thắc mắc nào liên quan đến chính sách bảo mật, vui lòng liên hệ với chúng tôi qua
          hotline hoặc email hỗ trợ.
        </p>
      </div>
    </div>
  )
}

export default PolicySecurity
