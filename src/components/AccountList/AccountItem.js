import styles from './AccountList.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import LinkItem from '../LinkItem'
import { BirdayIcon, CallIcon, EmailIcon, GenderIcon } from '../Icon'
import Button from '../Button'
import { faClose, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useServiceModal } from '~/Context/ServiceModalProvider'

const cx = classNames.bind(styles)
function AccountItem({ data }) {
  const { openServiceModal } = useServiceModal()

  const handleLockAccount = () => {
    openServiceModal('lock')
  }
  return (
    <div className={cx('row', 'item')}>
      <div className="col-12 col-md-8 col-lg-9">
        <div className="row align-items-center row-gap-5">
          <div className="col-12 col-md-6 col-lg-5">
            <div className={cx('avatar-wrapper')}>
              <img src={data.avatar} alt={data.name} className={cx('avatar')} />
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-7">
            <div className="d-flex flex-column row-gap-2 align-items-center align-items-md-baseline">
              <span className={cx('name')}>{data.name}</span>
              <LinkItem title={data.email} Icon={<EmailIcon />} className={cx('custom')} />
              <LinkItem title={data.phoneNumber} Icon={<CallIcon />} className={cx('custom')} />
              <LinkItem
                title={data.gender === 'FEMALE' ? 'Nữ' : data.gender === 'MALE' ? 'Nam' : 'Khác'}
                Icon={<GenderIcon />}
                className={cx('custom')}
              />
              <LinkItem title={data.birthDay} Icon={<BirdayIcon />} className={cx('custom')} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4 col-lg-3 align-content-end">
        {!data.active && (
          <div className={cx('reason')}>
            <div className="d-flex column-gap-2 mb-3 justify-content-center">
              <FontAwesomeIcon icon={faClose} />
              <span>{data.date}</span>
            </div>
            <span>{data.reason}</span>
          </div>
        )}
        {data.active ? (
          <Button
            leftIcon={<FontAwesomeIcon icon={faLock} />}
            primary
            className="mb-3 mt-4 mt-md-0 m-auto"
            onClick={handleLockAccount}
          >
            Khoá tài khoản
          </Button>
        ) : (
          <Button leftIcon={<FontAwesomeIcon icon={faLockOpen} />} primary className="mb-3 mt-4 mt-md-0 m-auto">
            Mở tài khoản
          </Button>
        )}
      </div>
    </div>
  )
}

AccountItem.propTypes = {
  data: PropTypes.object.isRequired,
}
export default AccountItem
