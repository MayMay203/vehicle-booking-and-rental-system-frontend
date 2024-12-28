import { Col, Image, Row } from 'react-bootstrap'
import styles from './About.module.scss'
import classNames from 'classnames/bind'
import { images } from '~/assets/images'

const cx = classNames.bind(styles)
function About() {
  return (
    <div className={cx('wrapper', 'container')}>
      <Row className={cx('wrap-content-1')}>
        <Col md={4} className={cx('txt-header')}>
          Safety Travel - Cùng bạn đến mọi hành trình
        </Col>
        <Col md={1}></Col>
        <Col md={7} className={cx('txt-content')}>
          Mỗi chuyến đi là một hành trình khám phá cuộc sống và thế giới xung quanh, là cơ hội học hỏi và chinh phục
          những điều mới lạ của mỗi cá nhân để trở nên tốt hơn. Do đó, chất lượng trải nghiệm của khách hàng là ưu tiên
          hàng đầu và là nguồn cảm hứng của đội ngũ chúng tôi.
          <span className={cx('bold')}> Safety Travel</span> là nền tảng chia sẻ ô tô, sứ mệnh của chúng tôi không chỉ
          dừng lại ở việc kết nối chủ xe và khách hàng một cách Nhanh chóng - An toàn - Tiện lợi, mà còn hướng đến việc
          truyền cảm hứng KHÁM PHÁ những điều mới lạ đến cộng đồng qua những chuyến đi trên nền tảng của chúng tôi.
        </Col>
      </Row>
      <Row className={cx('wrap-content-1')}>
        <Image src={images.aboutUs1}></Image>
      </Row>

      <Row className={cx('wrap-content-1')}>
        <Col md={7}>
          <p className={cx('txt-header')}>Sứ mệnh của Safety Travel</p>
          <p className={cx('txt-content')}>
            <span className={cx('bold')}> Cầm lái</span> và <span className={cx('bold')}> Khám phá</span> thế giới.
          </p>
          <p className={cx('txt-content')}>
            <span className={cx('bold')}> Safety Travel</span> không chỉ dừng lại ở việc kết nối cộng đồng ô tô mà còn
            mở rộng dịch vụ cho thuê và mua vé xe khách, tạo điều kiện thuận lợi cho những hành trình dài hay ngắn của
            bạn. Chúng tôi cung cấp nền tảng hiện đại, dễ sử dụng giúp bạn đặt vé xe khách nhanh chóng, tiết kiệm thời
            gian và chi phí, đảm bảo mang đến sự thoải mái và an toàn trên mọi tuyến đường.
          </p>
          <p className={cx('txt-content')}>
            Với đội ngũ xe khách là các đối tác uy tín và chuyên nghiệp, Safety Travel cam kết mang đến:
          </p>
          <ul className={cx('txt-content')}>
            <li>
              <span className={cx('bold')}>Đa dạng tuyến đường</span> từ nội thành đến liên tỉnh, phục vụ nhu cầu di
              chuyển của mọi hành khách.
            </li>
            <li>
              <span className={cx('bold')}>Chất lượng dịch vụ cao cấp</span> từ những hãng xe hàng đầu, đảm bảo đúng giờ
              và mang lại trải nghiệm tốt nhất.
            </li>
            <li>
              <span className={cx('bold')}>An toàn và bảo hiểm đầy đủ</span> trong suốt chuyến đi, giúp bạn an tâm khám
              phá và tận hưởng.
            </li>
            <li>
              <span className={cx('bold')}>Chính sách giá minh bạch</span> và nhiều ưu đãi hấp dẫn, mang lại giá trị
              thực cho mỗi hành trình.
            </li>
          </ul>

          <p className={cx('txt-content')}>
            Chúng tôi luôn chào đón các đối tác gia nhập hệ thống để cùng mở rộng mạng lưới dịch vụ, mang lại lợi ích
            cho cộng đồng và phát triển ngành vận tải hành khách chuyên nghiệp hơn.
          </p>
          <p className={cx('txt-content', 'txt-color')}>
            Hãy để <span className={cx('bold')}>Safety Travel</span> đồng hành cùng bạn trên mọi nẻo đường, biến mỗi
            chuyến đi thành một phần của cuộc sống trọn vẹn và đáng nhớ!
          </p>
        </Col>
        <Col md={1}></Col>
        <Col md={4}>
          <Image src={images.aboutUs2} className={cx('img-content3')}></Image>
          <Image src={images.aboutUs3} className={cx('img-content3')} rounded></Image>
        </Col>
      </Row>
    </div>
  )
}

export default About
