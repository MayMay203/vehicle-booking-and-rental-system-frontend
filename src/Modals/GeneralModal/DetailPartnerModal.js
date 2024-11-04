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
  PolicyIcon,
} from '~/components/Icon'
import { getDetailPartnerRegister } from '~/apiServices/getDetailPartnerRegister'
import { BankIcon } from '~/components/Icon'
import { verifyRegisterParter } from '~/apiServices/verifyRegisterPartner'
import { fetchAllRegisterPartners } from '~/redux/slices/partnerSlice'
import { config } from '~/config'

const cx = classNames.bind(styles)
function DetailPartner() {
  console.log('re-render ticket modal')
  const showDetailPartnerModal = useSelector((state) => state.generalModal.detailPartner)
  const { id, type, status, isOpen } = showDetailPartnerModal
  console.log(type)
  const [detailData, setDetailData] = useState()
  const dispatch = useDispatch()

  // const detailData = {
  //   businessInfo: {
  //     id: 1,
  //     businessName: 'Nhà xe Thanh Hồng Sơn',
  //     emailOfRepresentative: 'thanhhongson1995@gmail.com',
  //     nameOfRepresentative: 'Nguyễn Thị Thảo',
  //     phoneOfRepresentative: '0912348192',
  //     address: '16 Thái Hòa, Nghệ An',
  //     partnerType: 'BUS_PARTNER',
  //     approvalStatus: 'APPROVED',
  //     avatar:
  //       'https://vehiclerentalbookingsystem.s3.ap-southeast-2.amazonaws.com/7af6fff9-5f5b-4f12-9d97-700b342ebed9_avatar.jpg',
  //     accountInfo: {
  //       id: 1,
  //       email: 'admin@gmail.com',
  //     },
  //   },
  //   timeCancel: '18:00 01-11-2024',
  //   busPartnerInfo: {
  //     description:
  //       'Nhà xe đến từ Nghệ An được thành lập vào năm 2010, chuyên phục vụ các chuyến đi xuyên tỉnh từ Đà Nẵng - Nghệ An, Nghệ An - Hà Nội, HCM',
  //     urlFanpage: 'thanhhongson1995.com.vn',
  //     policy: ['Chính sách hoàn tiền trong 24 giờ nếu chuyến xe bị hủy', 'Đảm bảo an toàn'],
  //     urlLicenses: [
  //       'https://vehiclerentalbookingsystem.s3.ap-southeast-2.amazonaws.com/b7e07f7b-b8d0-4eb3-87f0-6834d372ba27_giayphepkinhdoanh2.jpg',
  //     ],
  //     urlImages: [
  //       'https://vehiclerentalbookingsystem.s3.ap-southeast-2.amazonaws.com/29c91b13-d2a7-4bec-9eec-72caaf098256_nhaxehongson.jpg',
  //       'https://vehiclerentalbookingsystem.s3.ap-southeast-2.amazonaws.com/ec678c1e-6488-4965-9dd8-bbb959789263_nhaxehongson2.jpg',
  //     ],
  //     bankAccount: {
  //       accountNumber: '0707030308',
  //       accountHolderName: 'Nguyễn Hữu Thọ',
  //       bankName: 'Ngân hàng ABC',
  //       idAccount: 1,
  //     },
  //   },
  // }

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
    if (status === config.variables.notConfirmed) {
      data = await verifyRegisterParter(id, type)
      if (data) {
        toast.success('Xác nhận đăng ký thành công!')
        dispatch(fetchAllRegisterPartners({ type, status }))
        handleClose()
      } else {
        toast.error('Xác nhận đăng ký thất bại!')
        handleClose()
      }
    }
    else if (status === config.variables.current) {
      dispatch(
        setConfirmModalVisible({
          name: generalModalNames.CANCEL_PARTNER,
          title: 'Xác nhận huỷ đối tác',
          description: 'Lý do huỷ đối tác:',
          isOpen: true,
          modalType: 'inputConfirm',
          id,
          type: detailData.type,
        }),
      )
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
              <span>Người đại diện: </span>
              <span>{detailData?.businessInfo.nameOfRepresentative}</span>
            </div>
            <div className="p-3">
              <LinkItem
                title={detailData?.businessInfo.emailOfRepresentative}
                Icon={<EmailIcon />}
                className={cx('custom')}
              />
              <LinkItem
                title={detailData?.businessInfo.phoneOfRepresentative}
                Icon={<CallIcon />}
                className={cx('custom')}
              />
              <LinkItem title={detailData?.busPartnerInfo.urlFanpage} Icon={<FanPage />} className={cx('custom')} />
              <LinkItem
                title={detailData?.businessInfo.address}
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
            <div className="d-flex justify-content-center gap-5" style={{ marginTop: '40px' }} onClick={handleClose}>
              <Button outline>Thoát</Button>
              <Button primary onClick={handleConfirm}>
                {status === config.variables.current ? 'Huỷ đối tác' : 'Xác nhận'}
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default DetailPartner
