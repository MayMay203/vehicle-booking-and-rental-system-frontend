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
  setDetailModalVisible,
} from '~/redux/slices/generalModalSlice'
import LinkItem from '~/components/LinkItem'
import {
  CallIcon,
  DescriptionIcon,
  EmailIcon,
  FanPage,
  ImageIcon,
  LicenceIcon,
  LocationIcon,
  PartnerIcon,
  PolicyIcon,
} from '~/components/Icon'
import { getDetailPartnerRegister } from '~/apiServices/getDetailPartnerRegister'
import { BankIcon } from '~/components/Icon'
import { verifyRegisterParter } from '~/apiServices/verifyRegisterPartner'
import { fetchAllRegisterPartners } from '~/redux/slices/partnerSlice'
import { config } from '~/config'
import { checkLoginSession } from '~/redux/slices/userSlice'

const cx = classNames.bind(styles)
function DetailPartner() {
  console.log('re-render ticket modal')
  const showDetailPartnerModal = useSelector((state) => state.generalModal.detailPartner)
  const { id, type, status, isOpen } = showDetailPartnerModal
  console.log(type)
  const [detailData, setDetailData] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchDetailParterRegister() {
      const data = await getDetailPartnerRegister(id, type)
      if (data) {
        setDetailData(data)
      }
    }
    fetchDetailParterRegister()
  }, [id, type])

  const handleClose = () => {
    dispatch(setDetailModalVisible({ isOpen: false }))
  }

  const handleConfirm = async () => {
    let data
    if (status === config.variables.current) {
      dispatch(
        setConfirmModalVisible({
          name: generalModalNames.CANCEL_PARTNER,
          title: 'Xác nhận huỷ đối tác',
          description: `Huỷ mối quan hệ đối tác đồng nghĩa với dừng mọi hoạt động của đối tác này.
          Nếu tiếp tục hãy nhập vào lí do:`,
          isOpen: true,
          modalType: 'inputConfirm',
          id,
          type: detailData.businessInfo.partnerType,
        }),
      )
    } else {
      if (dispatch(checkLoginSession())) {
        data = await verifyRegisterParter(id, type)
        if (data) {
          toast.success(
            status === config.variables.notConfirmed
              ? 'Xác nhận đăng ký thành công!'
              : 'Khôi phục chế độ đối tác thành công!',
            { autoClose: 1200, position: 'top-center' },
          )
          dispatch(
            fetchAllRegisterPartners({
              partnerType: type,
              status:
                status === config.variables.notConfirmed ? config.variables.notConfirmed : config.variables.cancelled,
            }),
          )
          handleClose()
        } else {
          toast.error('Xác nhận đăng ký thất bại!')
          handleClose()
        }
      }
    }
  }

  return (
    <Modal className={cx('custom-modal')} show={isOpen} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title
            className={cx('title-header')}
            style={{ color: '#D34714', fontWeight: '600', fontSize: '2.6rem' }}
          >
            THÔNG TIN CHI TIẾT
          </Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="row row-cols-2 row-cols-lg-2 gy-5">
          <div className="col col-12 col-lg-5 d-flex align-items-center justify-content-center">
            <img src={detailData?.businessInfo.avatar} alt="image-partner" className={cx('image-partner')}></img>
          </div>
          <div className="col col-12 col-lg-7">
            <span className="d-inline-block mb-4" style={{ color: '#D34714', fontSize: '1.9rem', fontWeight: '500' }}>
              {detailData?.businessInfo.businessName}
            </span>

            <div className="d-flex row-gap-2" style={{ fontSize: '1.6rem', fontWeight: 500 }}>
              <span>Người đại diện</span>
              <span className="ms-1">- {detailData?.businessInfo.nameOfRepresentative}</span>
            </div>
            <div className="p-3">
              <LinkItem
                title={detailData?.businessInfo.emailOfRepresentative || ''}
                Icon={<EmailIcon />}
                className={cx('custom')}
              />
              <LinkItem
                title={detailData?.businessInfo.phoneOfRepresentative || ''}
                Icon={<CallIcon />}
                className={cx('custom')}
              />
              <LinkItem
                title={detailData?.busPartnerInfo.urlFanpage || ''}
                Icon={<FanPage />}
                className={cx('custom')}
              />
              <LinkItem
                title={detailData?.businessInfo.address || ''}
                Icon={<LocationIcon />}
                className={cx('custom', 'mt-2')}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="p-3">
            <div className="flex flex-column">
              <LinkItem title="Mô tả" Icon={<DescriptionIcon />} className={cx('custom')} />
              <span className={cx('d-inline-block', 'px-4', 'line-height-1-4', 'mt-3')}>
                {detailData?.busPartnerInfo.description}
              </span>
            </div>
            <div className="flex flex-column row-gap-3 mt-4">
              <LinkItem title="Chính sách" Icon={<PolicyIcon />} className={cx('custom')} />
              <ul className={cx('list')}>
                {detailData?.busPartnerInfo.policy.map((item) => (
                  <li className="py-2">{item}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-column row-gap-3">
              <LinkItem title="Giấy phép kinh doanh" Icon={<LicenceIcon />} className={cx('custom')} />
              <div className="d-flex justify-content-center">
                <img src={detailData?.busPartnerInfo.urlLicenses} alt="licence" className="object-fit-contain"></img>
              </div>
            </div>
            <div className="flex flex-column row-gap-3">
              <LinkItem title="Ảnh nhà xe" Icon={<ImageIcon />} className={cx('custom')} />
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center mt-3 gy-5">
                {detailData?.busPartnerInfo.urlImages.map((item) => (
                  <div className="col">
                    <img src={item} alt="image-partner" className="object-fit-cover w-100 h-100"></img>
                  </div>
                ))}
              </div>
            </div>
            <div className="d-flex-column row-gap-3 mt-4">
              <LinkItem title="Thông tin tài khoản ngân hàng" Icon={<BankIcon />} className={cx('custom')} />
              <div className="d-flex justify-content-center">
                <span className="mt-3 fs-4">
                  {detailData?.busPartnerInfo.bankAccount.accountNumber}-
                  {detailData?.busPartnerInfo.bankAccount.accountHolderName}-
                  {detailData?.busPartnerInfo.bankAccount.bankName}
                </span>
              </div>
            </div>
            {detailData?.businessInfo.approvalStatus !== config.variables.notConfirmed && (
              <div className="d-flex-column row-gap-3 mt-4">
                <LinkItem title="Thông tin chi tiết đối tác" Icon={<PartnerIcon />} className={cx('custom')} />
                <div className="d-flex flex-column row-gap-2">
                  <div className="mt-3 fs-4 ps-5 fst-italic">
                    Thời gian trở thành đối tác -
                    <span style={{ color: '#5DAE70', fontWeight: '600', marginLeft: '8px' }}>
                      {detailData?.timeCancel}
                    </span>
                  </div>
                  {detailData?.businessInfo.approvalStatus === config.variables.cancelled && (
                    <div className="mt-3 fs-4 ps-5 fst-italic d-flex column-gap-5">
                      <div>
                        Thời gian huỷ đối tác -
                        <span style={{ color: 'red', fontWeight: '600', marginLeft: '8px' }}>
                          {detailData?.timeCancel}
                        </span>
                      </div>
                      <div>
                        Lý do huỷ -
                        <span style={{ color: 'red', fontWeight: '600', marginLeft: '8px' }}>
                          {detailData?.cancelReason}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="d-flex justify-content-center gap-5" style={{ marginTop: '40px' }} onClick={handleClose}>
              <Button outline>Thoát</Button>
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

export default DetailPartner
