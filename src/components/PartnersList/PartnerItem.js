import { images } from '~/assets/images'
import { CallIcon, EmailIcon, LocationIcon } from '../Icon'
import LinkItem from '../LinkItem'
import styles from './PartnersList.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCancel, faCheck, faChevronRight, faClose } from '@fortawesome/free-solid-svg-icons'
import Button from '../Button'

const cx = classNames.bind(styles)
function PartnerItem({ data }) {
  const handleCancelPartner = () => {}

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
              <span className={cx('name')}>{data.businessName}</span>
              <span className={cx('represent')}>{`Người đại diện: ${data.nameOfRepresentative}`}</span>
              <LinkItem title={data.phoneOfRepresentative} Icon={<CallIcon />} className={cx('custom')} />
              <LinkItem title={data.emailOfRepresentative} Icon={<EmailIcon />} className={cx('custom')} />
              <LinkItem title={data.address} Icon={<LocationIcon />} className={cx('custom')} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4 col-lg-3 align-content-end">
        <div className="d-flex flex-column column-gap-3 justify-content-end">
          {data.approvalStatus === 'APPROVED' && (
            <div className={cx('checked')}>
              <div className="d-flex column-gap-2 mb-2 justify-content-center">
                <FontAwesomeIcon icon={faCheck} />
                {/* <span>{data.date}</span> */}
                <span>Xác nhận lúc </span>
              </div>
              <span>19:00 12-09-2024</span>
            </div>
          )}
          {data.approvalStatus === 'CANCELED' && (
            <div className={cx('checked', 'reason')}>
              <div className="d-flex column-gap-2 mb-2 justify-content-center">
                <FontAwesomeIcon icon={faClose} />
                {/* <span>{data.date}</span> */}
                <span>Đã huỷ lúc: </span>
              </div>
              <span>19:00 12-09-2024</span>
              <span className='mt-2'>Lý do: Vi phạm hợp đồng</span>
            </div>
          )}
          <Button className={cx('action', 'mb-5', 'mt-4', 'mt-md-0', 'm-auto')}>
            Chi tiết đối tác
            <FontAwesomeIcon icon={faChevronRight} className="ms-2" />
          </Button>
          {data.approvalStatus === 'APPROVED' && (
            <Button
              leftIcon={<FontAwesomeIcon icon={faCancel} />}
              primary
              className="mb-3 m-auto"
              onClick={handleCancelPartner}
            >
              Huỷ đối tác
            </Button>
          )}
          {!data.approvalStatus === 'CANCELED' && (
            <div className={cx('reason')}>
              <div className="d-flex column-gap-2 mb-3 justify-content-center">
                <FontAwesomeIcon icon={faClose} />
                <span>{data.date}</span>
              </div>
              <span>{data.reason}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PartnerItem
