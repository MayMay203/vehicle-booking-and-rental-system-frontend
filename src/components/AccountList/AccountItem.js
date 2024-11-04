import styles from './AccountList.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import LinkItem from '../LinkItem'
import { BirdayIcon, CallIcon, EmailIcon, GenderIcon } from '../Icon'
import Button from '../Button'
import {faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import { generalModalNames, setConfirmModalVisible } from '~/redux/slices/generalModalSlice'
import { images } from '~/assets/images'

const cx = classNames.bind(styles)
function AccountItem({ data }) {
  console.log('re-render account item')
  const dispatch = useDispatch()

  const handleLockAccount = () => {
    dispatch(
      setConfirmModalVisible({
        name: generalModalNames.LOCK_ACCOUNT,
        title: 'Xác nhận khoá tài khoản',
        // description: 'Lí do khoá:',
        description: 'Bạn chắc chắn muốn khoá tài khoản này?',
        isOpen: true,
        modalType: 'confirm',
        id: data.id,
      }),
    )
  }

  const handleOpenAccount = () => {
    dispatch(
      setConfirmModalVisible({
        modalType: 'confirm',
        title: 'Xác nhận mở tài khoản',
        description: 'Bạn chắc chắn muốn mở lại tài khoản này?',
        isOpen: true,
        name: generalModalNames.UNLOCK_ACCOUNT,
        id: data.id,
      }),
    )
  }
  return (
    <div className={cx('row', 'item')}>
      <div className="col-12 col-md-8 col-lg-9">
        <div className="row align-items-center row-gap-5">
          <div className="col-12 col-md-6 col-lg-5">
            <div className={cx('avatar-wrapper')}>
              <img src={data.avatar || images.noImage} alt={data.name} className={cx('avatar')} />
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-7">
            <div className="d-flex flex-column row-gap-2 align-items-center align-items-md-baseline">
              <span className={cx('name')}>{data.name || 'Chưa cập nhật'}</span>
              <LinkItem title={data.email} Icon={<EmailIcon />} className={cx('custom')} />
              <LinkItem title={data.phoneNumber || 'Chưa cập nhật'} Icon={<CallIcon />} className={cx('custom')} />
              <LinkItem
                title={
                  data.gender
                    ? data.gender === 'FEMALE'
                      ? 'Nữ'
                      : data.gender === 'MALE'
                      ? 'Nam'
                      : 'Khác'
                    : 'Chưa cập nhật'
                }
                Icon={<GenderIcon />}
                className={cx('custom')}
              />
              <LinkItem title={data.birthDay || 'Chưa cập nhật'} Icon={<BirdayIcon />} className={cx('custom')} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4 col-lg-3 align-content-end">
        {/* {!data.active && (
          <div className={cx('reason')}>
            <div className="d-flex column-gap-2 mb-3 justify-content-center">
              <FontAwesomeIcon icon={faClose} />
              <span>{data.date}</span>
            </div>
            <span>{data.reason}</span>
          </div>
        )} */}
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
          <Button
            leftIcon={<FontAwesomeIcon icon={faLockOpen} />}
            primary
            className="mb-3 mt-4 mt-md-0 m-auto"
            onClick={handleOpenAccount}
          >
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
