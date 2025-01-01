import classNames from "classnames/bind";
import styles from './Error.module.scss'
import { useNavigate } from 'react-router-dom'
import { config } from '~/config'
import Button from '~/components/Button'
import { useSelector } from 'react-redux'

const cx = classNames.bind(styles)
function Error() {
  const navigate = useNavigate()
  const { currentRole } = useSelector((state) => state.menu)
  const handleBack = () => {
    if (currentRole === 'USER') {
      navigate(config.routes.home)
    } else if (currentRole === 'BUS_PARTNER') {
      navigate(config.routes.busTrip)
    } else if (currentRole === 'CAR_RENTAL_PARTNER') {
      navigate(config.routes.serviceManage)
    } else if (currentRole === 'ADMIN'){
      navigate(config.routes.manageAccounts)
    }
  }

  return (
    <div
      className={cx('wrapper', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-center', 'row-gap-3')}
    >
      <span className={cx('status')}>404</span>
      <span className={cx('text')}>Không tìm thấy trang web phù hợp</span>
      <Button to={config.home} className="mt-5" outline onClick={handleBack}>
        Quay lại trang chủ
      </Button>
    </div>
  )
}

export default Error;