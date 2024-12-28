import Logo from '~/components/Logo'
import styles from './Footer.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { config } from '~/config'
import { FacebookIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from '~/components/Icon'

const cx = classNames.bind(styles)
function Footer() {
  return (
    <div className={cx('wrapper')}>
      <div className="row row-cols-1 gy-5 row-cols-md-2">
        <div className="col-12 col-md-6 col-xl-4">
          <Logo />
        </div>
        <div className="col-12 col-md-6 col-xl-8">
          <div className="row row-cols-2 gy-5 row-cols-lg-3 row-cols-xl-4">
            <div className="col">
              <h2 className={cx('title')}>DỊCH VỤ</h2>
              <ul className={cx('list')}>
                <li className={cx('item')}>
                  <Link className={cx('link')} to={config.routes.booking}>
                    Đặt xe
                  </Link>
                </li>
                <li className={cx('item')}>
                  <Link className={cx('link')} to={config.routes.ticket}>
                    Mua vé xe
                  </Link>
                </li>
                <li className={cx('item')}>
                  <Link className={cx('link')} to={config.routes.renting}>
                    Thuê xe
                  </Link>
                </li>
                <li className={cx('item')}>
                  <Link className={cx('link')} to={config.routes.rentalService}>
                    Đăng ký làm đối tác
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col">
              <h2 className={cx('title')}>HỖ TRỢ</h2>
              <ul className={cx('list')}>
                <li className={cx('item')}>
                  <Link className={cx('link')} to={config.routes.answer}>
                    Hỏi đáp
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col">
              <h2 className={cx('title')}>KHÁM PHÁ</h2>
              <ul className={cx('list')}>
                <li className={cx('item')}>
                  <Link className={cx('link')} to={config.routes.about}>
                    Về chúng tôi
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col col-lg-6">
              <h2 className={cx('title')}>LIÊN HỆ</h2>
              <div className={cx('socials')}>
                <a href="#!" className={cx('social')}>
                  <FacebookIcon />
                </a>
                <a href="#!" className={cx('social')}>
                  <InstagramIcon />
                </a>
                <a href="#!" className={cx('social')}>
                  <LinkedInIcon />
                </a>
                <a href="#!" className={cx('social')}>
                  <TwitterIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className={cx('copy-right')}>
        Bản quyền thuộc <span className={cx('brand')}>Safely Travel</span>
      </p>
    </div>
  )
}

export default Footer
