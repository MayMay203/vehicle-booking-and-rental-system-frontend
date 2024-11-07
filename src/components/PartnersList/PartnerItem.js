import { images } from '~/assets/images'
import { CallIcon, EmailIcon, LocationIcon } from '../Icon'
import LinkItem from '../LinkItem'
import styles from './PartnersList.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck, faChevronRight, faClose } from '@fortawesome/free-solid-svg-icons'
import Button from '../Button'
import { useDispatch } from 'react-redux'
import { setDetailModalVisible } from '~/redux/slices/generalModalSlice'

const cx = classNames.bind(styles)
function PartnerItem({ data }) {
  const dispatch = useDispatch()
  const  businessData  = data.businessInfo
  const showDetailPartner = () => {
    dispatch(setDetailModalVisible({ type: businessData.partnerType, id: businessData.id, isOpen: true, status: businessData.approvalStatus }))
  }

  return (
    <div className={cx('row', 'item', 'gy-3')}>
      <div className="col-12 col-md-8 col-lg-9">
        <div className="row align-items-center row-gap-5">
          <div className="col-12 col-md-6 col-lg-5">
            <div className={cx('avatar-wrapper')}>
              <img src={images.noImage} alt="repre-iamge" className={cx('avatar')} />
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-7">
            <div className="d-flex flex-column row-gap-2 align-items-center align-items-md-baseline">
              <span className={cx('name')}>{businessData.businessName}</span>
              <span className={cx('represent')}>Người đại diện: {`${businessData.nameOfRepresentative}`}</span>
              <LinkItem title={businessData.phoneOfRepresentative} Icon={<CallIcon />} className={cx('custom')} />
              <LinkItem title={businessData.emailOfRepresentative} Icon={<EmailIcon />} className={cx('custom')} />
              <LinkItem title={businessData.address} Icon={<LocationIcon />} className={cx('custom')} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4 col-lg-3 align-content-end">
        <div className="d-flex flex-column column-gap-3">
          {businessData.approvalStatus === 'APPROVED' && (
            <div className={cx('checked')}>
              <div className="d-flex column-gap-2 mb-2">
                <FontAwesomeIcon icon={faCheck} />
                <span>Xác nhận lúc </span>
              </div>
              <span>{data.timeCancel}</span>
            </div>
          )}
          {businessData.approvalStatus === 'CANCEL' && (
            <div className={cx('checked', 'reason')}>
              <div className="d-flex column-gap-2 mb-2 justify-content-center">
                <FontAwesomeIcon icon={faClose} />
                <span>Đã huỷ lúc: </span>
              </div>
              <span>{data.timeCancel}</span>
              <span className="mt-2">Lý do: {data.cancelReason}</span>
            </div>
          )}
          <Button className={cx('action', 'mb-2', 'mt-4', 'mt-md-0', 'm-auto')} onClick={showDetailPartner}>
            Chi tiết đối tác
            <FontAwesomeIcon icon={faChevronRight} className="ms-2" />
          </Button>
          {/* {businessData.approvalStatus === 'APPROVED' && (
            <Button
              leftIcon={<FontAwesomeIcon icon={faCancel} />}
              primary
              className="mb-3 m-auto"
              onClick={handleCancelPartner}
            >
              Huỷ đối tác
            </Button>
          )} */}
          {!businessData.approvalStatus === 'CANCEL' && (
            <div className={cx('reason')}>
              <div className="d-flex column-gap-2 mb-3 justify-content-center">
                <FontAwesomeIcon icon={faClose} />
                <span>{businessData.date}</span>
              </div>
              <span>{businessData.reason}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PartnerItem
