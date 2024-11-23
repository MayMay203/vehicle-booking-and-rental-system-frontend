import { Modal } from 'react-bootstrap'
import styles from './GeneralModal.module.scss'
import classNames from 'classnames/bind'
import Button from '~/components/Button'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
  generalModalNames,
  setConfirmModalVisible,
  setDetailDriverModalVisible,
  setLoadingModalVisible,
} from '~/redux/slices/generalModalSlice'
import LinkItem from '~/components/LinkItem'
import {
  CallIcon,
  CitizenIcon,
  EmailIcon,
  ImageIcon,
  InsuranceIcon,
  LicenceIcon,
  LocationIcon,
  PartnerIcon,
  PolicyIcon,
} from '~/components/Icon'
import { BankIcon } from '~/components/Icon'
import { fetchAllDriverPartners } from '~/redux/slices/partnerSlice'
import { config } from '~/config'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { getDetailDriverPartner } from '~/apiServices/getDetailDriverPartner'
import { verifyDriverPartner } from '~/apiServices/verifyDriverPartner'

const cx = classNames.bind(styles)
function DetailDriverPartner() {
  console.log('re-render detail driver modal')
  const showDetailDriverPartnerModal = useSelector((state) => state.generalModal.DetailDriverPartner)
  const { id, isOpen, status } = showDetailDriverPartnerModal
  const [detailData, setDetailData] = useState({})
  const dispatch = useDispatch()
  useEffect(() => {
    async function fetchDetailDriverPartner() {
      const data = await getDetailDriverPartner(id)
      if (data) {
        setDetailData(data)
      }
    }
    if (dispatch(checkLoginSession()) && id) {
      fetchDetailDriverPartner()
    }
  }, [id, dispatch, status])

  const handleClose = () => {
    dispatch(setDetailDriverModalVisible({ isOpen: false }))
  }

  const handleConfirm = async () => {
    let data
    if (status === config.variables.current) {
      dispatch(
        setConfirmModalVisible({
          name: generalModalNames.CANCEL_DRIVER_PARTNER,
          title: 'Xác nhận huỷ đối tác',
          description: `Huỷ mối quan hệ đối tác đồng nghĩa với dừng mọi hoạt động của đối tác này.
          Nếu tiếp tục hãy nhập vào lí do:`,
          isOpen: true,
          modalType: 'inputConfirm',
          id,
        }),
      )
      handleClose()
    } else {
      dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: true }))
      if (dispatch(checkLoginSession())) {
        data = await verifyDriverPartner(id)
        if (data) {
          toast.success(
            status === config.variables.notConfirmed
              ? 'Xác nhận đăng ký thành công!'
              : 'Khôi phục chế độ đối tác thành công!',
            { autoClose: 1200, position: 'top-center' },
          )
          dispatch(
            fetchAllDriverPartners({
              status:
                status === config.variables.notConfirmed
                  ? config.variables.notConfirmed
                  : config.variables.cancelled,
            }),
          )
          dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: false }))
          handleClose()
        } else {
          dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: false }))
          toast.error('Xác nhận đăng ký thất bại!', { autoClose: 1200, position: 'top-center' })
          handleClose()
        }
      }
    }
  }

  const handleRefusePartner = () => {
    dispatch(
      setConfirmModalVisible({
        name: generalModalNames.REFUSE_DRIVER_PARTNER,
        title: 'Từ chối quan hệ đối tác',
        description: `Việc xác nhận từ chối đồng nghĩa với việc bạn không muốn thiết lập bất kỳ quan hệ nào với đối tác này. Vui lòng nhập lý do bên dưới:`,
        isOpen: true,
        modalType: 'inputConfirm',
        id,
      }),
    )
    handleClose()
  }

  return (
    <Modal className={cx('custom-modal')} show={isOpen} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title
            className={cx('title-header')}
            style={{ color: '#D34714', fontWeight: '600', fontSize: '2.6rem' }}
          >
            THÔNG TIN TÀI XẾ
          </Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="row row-cols-2 row-cols-lg-2 gy-5">
          <div className="col col-12 col-lg-5 d-flex align-items-center justify-content-center">
            <img src={detailData.generalDriverInfo?.avatar} alt="image-partner" className={cx('image-partner')}></img>
          </div>
          <div className="col col-12 col-lg-7">
            <span className="d-inline-block mb-4" style={{ color: '#D34714', fontSize: '1.9rem', fontWeight: '500' }}>
              {detailData.generalDriverInfo?.name}
            </span>

            <div className="d-flex row-gap-2" style={{ fontSize: '1.6rem', fontWeight: 500 }}>
              <span>Khu vực hoạt động</span>
              <span className="ms-1">- {detailData.generalDriverInfo?.location}</span>
            </div>
            <div className="p-3">
              <LinkItem
                title={detailData.generalDriverInfo?.email || ''}
                Icon={<EmailIcon />}
                className={cx('custom')}
              />
              <LinkItem
                title={detailData.generalDriverInfo?.phoneNumber || ''}
                Icon={<CallIcon />}
                className={cx('custom')}
              />
              <LinkItem
                title={detailData.generalDriverInfo?.permanentAddress || ''}
                Icon={<LocationIcon />}
                className={cx('custom', 'mt-2')}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="px-4 py-2 mt-5">
            <h2 style={{ color: 'var(--primary-color)', fontWeight: '600', fontSize: '1.8rem', marginBottom: '12px' }}>
              Thông tin cá nhân
            </h2>
            <div className="px-3">
              <div className="flex flex-column row-gap-3">
                <LinkItem title="CCCD/CMND" Icon={<CitizenIcon />} className={cx('custom', 'mb-1')} />
                <ul className={cx('list', 'fs-4', 'ms-4', 'mb-3')}>
                  <li className="py-2">Số CCCD/CMND: {detailData.citizen?.citizenId}</li>
                  <li className="py-2">Ngày hết hạn: {detailData.citizen?.dateOfIssue}</li>
                  <li className="py-2">Nơi đăng ký: {detailData.citizen?.placeOfIssue}</li>
                  <li className="py-2">Ngày hết hạn: {detailData.citizen?.expiryDate}</li>
                </ul>
                <div className="d-flex justify-content-center column-gap-5">
                  {detailData.citizen?.citizenImages?.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`license-${index}`}
                      style={{ width: '300px', height: '200px', objectFit: 'contain' }}
                    />
                  ))}
                </div>
              </div>
              <div className="d-flex-column row-gap-3 mt-4 mb-3">
                <LinkItem title="Thông tin tài khoản ngân hàng" Icon={<BankIcon />} className={cx('custom')} />
                <div className="d-flex justify-content-center">
                  <span className="mt-3 fs-4">
                    {detailData?.bankAccount?.accountNumber}-{detailData?.bankAccount?.accountHolderName}-
                    {detailData?.bankAccount?.bankName}
                  </span>
                </div>
              </div>
              <div className="flex flex-column row-gap-3">
                <LinkItem title="Thông tin nhân thân" Icon={<CitizenIcon />} className={cx('custom', 'mb-1')} />
                <ul className={cx('list', 'fs-4', 'ms-4', 'mb-3')}>
                  <li className="py-2">Họ và tên: {detailData.relative?.nameOfRelative}</li>
                  <li className="py-2">Số điện thoại: {detailData.relative?.phoneOfRelative}</li>
                  <li className="py-2">Quan hệ: {detailData.relative?.relationship}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="px-4 mt-3">
            <h2 style={{ color: 'var(--primary-color)', fontWeight: '600', fontSize: '1.8rem', marginBottom: '12px' }}>
              Thông tin phương tiện
            </h2>
            <div className="flex flex-column row-gap-3 mt-4">
              <LinkItem title="Thông tin tổng quát" Icon={<PolicyIcon />} className={cx('custom')} />
              <ul className={cx('list', 'fs-4', 'ms-4')}>
                <li className="py-2">Biển số xe: {detailData.vehicle?.licensePlateNumber}</li>
                <li className="py-2">Loại xe: {detailData.vehicle?.vehicleType}</li>
                <li className="py-2">Số giấy phép lái xe: {detailData.driverLicense?.driverLicenseNumber}</li>
                <li className="py-2">Hạng: {detailData.driverLicense?.licenseType}</li>
                <li className="py-2">Ngày hết hạn: {detailData.driverLicense?.issueDateLicense}</li>
              </ul>
            </div>
            <div className="flex flex-column row-gap-3">
              <LinkItem title="Giấy phép lái xe" Icon={<LicenceIcon />} className={cx('custom')} />
              <div className="d-flex justify-content-center column-gap-5 mt-2">
                {detailData.driverLicense?.driverLicenseImage.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`license-${index}`}
                    style={{ width: '300px', height: '200px', objectFit: 'contain' }}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-column row-gap-3">
              <LinkItem title="Bảo hiểm xe" Icon={<InsuranceIcon />} className={cx('custom')} />
              <div className="d-flex justify-content-center column-gap-5 mt-2">
                {detailData.vehicle?.vehicleInsurance.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`license-${index}`}
                    style={{ width: '300px', height: '200px', objectFit: 'contain' }}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-column row-gap-3">
              <LinkItem title="Hình xe" Icon={<ImageIcon />} className={cx('custom')} />
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center mt-1 gy-5">
                {detailData.vehicle?.vehicleImages?.map((item) => (
                  <div className="col">
                    <img src={item} alt="image-partner" className="object-fit-cover w-100 h-100"></img>
                  </div>
                ))}
              </div>
            </div>
            {status !== config.variables.notConfirmed && (
              <div className="d-flex-column row-gap-3 mt-4">
                <LinkItem title="Thông tin chi tiết đối tác" Icon={<PartnerIcon />} className={cx('custom')} />
                <div className="d-flex flex-column row-gap-2">
                  <div className="mt-3 fs-4 ps-5 fst-italic">
                    Thời gian trở thành đối tác -
                    <span style={{ color: '#5DAE70', marginLeft: '8px' }}>
                      {detailData.generalDriverInfo?.timeBecomePartner}
                    </span>
                  </div>
                  {status === config.variables.current &&
                    detailData.generalDriverInfo?.timeUpdate && (
                      <div className="mt-3 fs-4 ps-5 fst-italic">
                        Thời gian khôi phục đối tác -
                        <span style={{ color: '#5DAE70', marginLeft: '8px' }}>
                          {detailData.generalDriverInfo?.timeUpdate}
                        </span>
                      </div>
                    )}
                  {status === config.variables.cancelled && (
                    <div className="mt-3 fs-4 ps-5 fst-italic d-flex flex-column row-gap-4">
                      <div>
                        Thời gian huỷ đối tác -
                        <span style={{ color: 'red', marginLeft: '8px' }}>
                          {detailData.generalDriverInfo?.timeUpdate}
                        </span>
                      </div>
                      <div>
                        Lý do huỷ -
                        <span style={{ color: 'red', marginLeft: '8px' }}>
                          {detailData.generalDriverInfo?.cancelReason}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="d-flex justify-content-center gap-5" style={{ marginTop: '40px' }}>
              {status === config.variables.notConfirmed ? (
                <Button outline onClick={handleRefusePartner}>
                  Từ chối
                </Button>
              ) : (
                <Button outline onClick={handleClose}>
                  Thoát
                </Button>
              )}
              <Button primary onClick={handleConfirm}>
                {status === config.variables.current
                  ? 'Huỷ đối tác'
                  : status === config.variables.notConfirmed
                  ? 'Xác nhận'
                  : 'Khôi phục đối tác'}
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default DetailDriverPartner
