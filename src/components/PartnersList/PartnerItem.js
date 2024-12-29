import { images } from '~/assets/images'
import { CallIcon, EmailIcon, LocationIcon } from '../Icon'
import LinkItem from '../LinkItem'
import styles from './PartnersList.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck, faChevronRight, faClose } from '@fortawesome/free-solid-svg-icons'
import Button from '../Button'
import { useDispatch } from 'react-redux'
import { setDetailDriverModalVisible, setDetailModalVisible } from '~/redux/slices/generalModalSlice'
import { config } from '~/config'
import { Image } from 'antd'

const cx = classNames.bind(styles)
function PartnerItem({ data }) {
  const dispatch = useDispatch()
  const partnerData = data.businessInfo || data.generalDriverInfo
  const showDetailPartner = () => {
    if (data.businessInfo) {
      dispatch(
        setDetailModalVisible({
          type: partnerData.partnerType,
          id: partnerData.id,
          isOpen: true,
          status: partnerData.approvalStatus,
        }),
      )
    } else {
      dispatch(
        setDetailDriverModalVisible({
          id: partnerData.formRegisterId,
          isOpen: true,
          status: partnerData.approvalStatus,
        }),
      )
    }
  }

  return (
    <div className={cx('row', 'item', 'gy-3')}>
      <div className="col-12 col-md-8 col-lg-9">
        <div className="row align-items-center row-gap-5">
          <div className="col-12 col-md-6 col-lg-5">
            <div className={cx('avatar-wrapper')}>
              <Image src={partnerData.avatar || images.noImage} alt="repre-iamge" className={cx('avatar')} />
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-7">
            <div className="d-flex flex-column row-gap-2 align-items-center align-items-md-baseline">
              <span className={cx('name')}>{partnerData.businessName || partnerData.name}</span>
              {partnerData.nameOfRepresentative && (
                <span className={cx('represent')}>Người đại diện: {`${partnerData.nameOfRepresentative}`}</span>
              )}
              {partnerData.location && (
                <div className={cx('represent')}>
                  Khu vực hoạt động : <span style={{ fontStyle: 'italic' }}>{partnerData.location}</span>
                </div>
              )}
              <LinkItem
                title={partnerData.phoneOfRepresentative || partnerData.phoneNumber}
                Icon={<CallIcon />}
                className={cx('custom')}
              />
              <LinkItem
                title={partnerData.emailOfRepresentative || partnerData.email}
                Icon={<EmailIcon />}
                className={cx('custom')}
              />
              <LinkItem
                title={partnerData.address || partnerData.permanentAddress}
                Icon={<LocationIcon />}
                className={cx('custom')}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4 col-lg-3 align-content-end">
        <div className="d-flex flex-column column-gap-3">
          {partnerData.approvalStatus === config.constants.current &&
            (data.timeBecomePartner || partnerData.timeBecomePartner) && (
              <div className={cx('checked')}>
                <div className="d-flex column-gap-2 mb-2">
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Xác nhận lúc </span>
                </div>
                <span>{data.timeBecomePartner || partnerData.timeBecomePartner}</span>
              </div>
            )}
          {partnerData.approvalStatus === 'CANCEL' && (
            <div className={cx('checked', 'reason')}>
              <div className="d-flex column-gap-2 mb-2 justify-content-center">
                <FontAwesomeIcon icon={faClose} />
                <span>Đã huỷ lúc: </span>
              </div>
              <span>{data.timeUpdate || partnerData.timeBecomePartner}</span>
              <span className="mt-2">Lý do: {data.cancelReason || partnerData.timeBecomePartner}</span>
            </div>
          )}
          <Button className={cx('action', 'mb-2', 'mt-4', 'mt-md-0', 'm-auto')} onClick={showDetailPartner}>
            Chi tiết đối tác
            <FontAwesomeIcon icon={faChevronRight} className="ms-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PartnerItem
