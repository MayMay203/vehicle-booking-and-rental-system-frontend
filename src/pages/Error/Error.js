import classNames from "classnames/bind";
import styles from './Error.module.scss'

const cx = classNames.bind(styles)
function Error() {
    return (
      <div className={cx('wrapper','d-flex', 'flex-column', 'align-items-center', 'justify-content-center', 'row-gap-3')}>
        <span className={cx('status')}>404</span>
        <span className={cx('text')}>Không tìm thấy trang web phù hợp</span>
      </div>
    )
}

export default Error;