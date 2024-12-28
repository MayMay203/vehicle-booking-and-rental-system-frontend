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
  setLoadingModalVisible,
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
import { fetchAllRegisterPartners } from '~/redux/slices/partnerSlice'
import { config } from '~/config'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { verifyRegisterPartner } from '~/apiServices/verifyRegisterPartner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { Form } from 'react-bootstrap'
import { editBankAccount } from '~/apiServices/editBankAccount'

const cx = classNames.bind(styles)
function DetailPartner() {
  console.log('re-render detail business modal')
  const showDetailPartnerModal = useSelector((state) => state.generalModal.detailPartner)
  const { id, type, status, isOpen, isReadonly } = showDetailPartnerModal
  const [detailData, setDetailData] = useState()
  const [isEditBank, setIsEditBank] = useState(false)
  const [bankInfo, setBankInfo] = useState({})
  const dispatch = useDispatch()

  const banks = [
    { value: '', label: 'Chọn ngân hàng' },
    { value: 'vietcombank', label: 'Ngân hàng TMCP Ngoại Thương Việt Nam (Vietcombank)' },
    { value: 'vietinbank', label: 'Ngân hàng TMCP Công Thương Việt Nam (Vietinbank)' },
    { value: 'bidv', label: 'Ngân hàng TMCP Đầu Tư và Phát Triển Việt Nam (BIDV)' },
    { value: 'agribank', label: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam (Agribank)' },
    { value: 'techcombank', label: 'Ngân hàng TMCP Kỹ Thương Việt Nam (Techcombank)' },
    { value: 'mbbank', label: 'Ngân hàng TMCP Quân Đội (MB Bank)' },
    { value: 'acb', label: 'Ngân hàng TMCP Á Châu (ACB)' },
    { value: 'sacombank', label: 'Ngân hàng TMCP Sài Gòn Thương Tín (Sacombank)' },
    { value: 'vpbank', label: 'Ngân hàng TMCP Việt Nam Thịnh Vượng (VPBank)' },
    { value: 'hdbank', label: 'Ngân hàng TMCP Phát triển Nhà Thành phố Hồ Chí Minh (HDBank)' },
    { value: 'shinhanbank', label: 'Ngân hàng TNHH MTV Shinhan Việt Nam (Shinhan Bank)' },
    { value: 'tpbank', label: 'Ngân hàng TMCP Tiên Phong (TPBank)' },
    { value: 'vib', label: 'Ngân hàng TMCP Quốc tế Việt Nam (VIB)' },
    { value: 'scb', label: 'Ngân hàng TMCP Sài Gòn (SCB)' },
    { value: 'ocb', label: 'Ngân hàng TMCP Phương Đông (OCB)' },
    { value: 'seabank', label: 'Ngân hàng TMCP Đông Nam Á (SeaBank)' },
    { value: 'eximbank', label: 'Ngân hàng TMCP Xuất Nhập Khẩu Việt Nam (Eximbank)' },
    { value: 'pvcombank', label: 'Ngân hàng TMCP Đại Chúng Việt Nam (PVcomBank)' },
  ]
  const sortedBanks = banks.sort((a, b) => a.label.localeCompare(b.label))

  useEffect(() => {
    async function fetchDetailParterRegister() {
      const data = await getDetailPartnerRegister(id)
      if (data) {
        setDetailData(data)
        const bankAccountId =
          data?.busPartnerInfo?.bankAccount?.bankAccountId || data?.carRentalPartnerInfo?.bankAccount.bankAccountId
        const numberBank =
          data?.busPartnerInfo?.bankAccount?.accountNumber || data?.carRentalPartnerInfo.bankAccount?.accountNumber
        const name =
          data?.busPartnerInfo?.bankAccount?.accountHolderName ||
          data?.carRentalPartnerInfo.bankAccount.accountHolderName
        const nameBank = data?.busPartnerInfo?.bankAccount?.bankName || data?.carRentalPartnerInfo?.bankAccount.bankName
        setBankInfo((prev) => ({ ...prev, bankAccountId, name, nameBank, numberBank }))
      }
    }
    if (dispatch(checkLoginSession()) && id) {
      fetchDetailParterRegister()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch, status, isEditBank])

  const handleClose = () => {
    dispatch(setDetailModalVisible({ isOpen: false, isReadonly: false }))
  }

  const handleConfirm = async () => {
    let data
    if (status === config.constants.current) {
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
      handleClose()
    } else {
      dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: true }))
      if (dispatch(checkLoginSession())) {
        data = await verifyRegisterPartner(id, type)
        if (data) {
          toast.success(
            status === config.constants.notConfirmed
              ? 'Xác nhận đăng ký thành công!'
              : 'Khôi phục chế độ đối tác thành công!',
            { autoClose: 1200, position: 'top-center' },
          )
          dispatch(
            fetchAllRegisterPartners({
              partnerType: type,
              status:
                status === config.constants.notConfirmed ? config.constants.notConfirmed : config.constants.cancelled,
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

  const handleChangeBankInfo = (e) => {
    const { name, value } = e.target
    setBankInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleRefuse = () => {
    dispatch(
      setConfirmModalVisible({
        name: generalModalNames.REFUSE_PARTNER,
        title: 'Từ chối đề nghị thành đối tác',
        description: `Việc xác nhận từ chối đồng nghĩa với việc bạn không muốn thiết lập bất kỳ quan hệ nào với đối tác này. Vui lòng nhập lý do bên dưới:`,
        isOpen: true,
        modalType: 'inputConfirm',
        id,
        type: detailData.businessInfo.partnerType,
      }),
    )
    handleClose()
  }

  const handleShowModalEditBank = () => {
    handleClose()
    setIsEditBank(true)
  }

  const handleEditBankAccount = async (e) => {
    e.preventDefault()
    try {
      await editBankAccount(bankInfo.bankAccountId, bankInfo.numberBank, bankInfo.name, bankInfo.nameBank)
      setBankInfo({})
      setIsEditBank(false)
      toast.success('Cập nhật thông tin tài khoản ngân hàng thành công!', { autoClose: 1200, position: 'top-center' })
    } catch (error) {
      setIsEditBank(false)
      toast.error('Cập nhật thông tin tài khoản ngân hàng thất bại!', { autoClose: 1200, position: 'top-center' })
    }
  }
  return (
    <div>
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
                {detailData?.busPartnerInfo?.urlFanpage && (
                  <LinkItem
                    title={detailData.busPartnerInfo.urlFanpage || ''}
                    Icon={<FanPage />}
                    className={cx('custom')}
                  />
                )}
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
                  {detailData?.busPartnerInfo?.description || detailData?.carRentalPartnerInfo?.description}
                </span>
              </div>
              <div className="flex flex-column row-gap-3 mt-4">
                <LinkItem title="Chính sách" Icon={<PolicyIcon />} className={cx('custom')} />
                <ul className={cx('list')}>
                  {detailData?.busPartnerInfo
                    ? detailData?.busPartnerInfo.policy.map((item, index) => (
                        <li className="py-2" key={index}>
                          {item}
                        </li>
                      ))
                    : detailData?.carRentalPartnerInfo.policies.map((item, index) => (
                        <li className="py-2" key={index}>
                          {item}
                        </li>
                      ))}
                </ul>
              </div>
              <div className="flex flex-column row-gap-3">
                <LinkItem title="Giấy phép kinh doanh" Icon={<LicenceIcon />} className={cx('custom')} />
                <div className="d-flex justify-content-center column-gap-5">
                  {(detailData?.busPartnerInfo?.urlLicenses || detailData?.carRentalPartnerInfo?.urlLicenses)?.map(
                    (url, index) => (
                      <img key={index} src={url} alt={`license-${index}`} className="object-fit-contain" />
                    ),
                  )}
                </div>
              </div>
              <div className="flex flex-column row-gap-3">
                <LinkItem title="Ảnh nhà xe" Icon={<ImageIcon />} className={cx('custom')} />
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center mt-3 gy-5">
                  {detailData?.busPartnerInfo?.urlImages
                    ? detailData.busPartnerInfo.urlImages.map((item, index) => (
                        <div className="col" key={index}>
                          <img src={item} alt="image-partner" className="object-fit-cover w-100 h-100"></img>
                        </div>
                      ))
                    : detailData?.carRentalPartnerInfo?.urlImages.map((item, index) => (
                        <div className="col" key={index}>
                          <img src={item} alt="image-partner" className="object-fit-cover w-100 h-100"></img>
                        </div>
                      ))}
                </div>
              </div>
              <div className="d-flex-column row-gap-3 mt-4">
                <LinkItem title="Thông tin tài khoản ngân hàng" Icon={<BankIcon />} className={cx('custom')} />
                <div className="d-flex justify-content-center align-items-center mt-3 column-gap-1">
                  <span className="fs-4">
                    {detailData?.busPartnerInfo?.bankAccount?.accountNumber ||
                      detailData?.carRentalPartnerInfo?.bankAccount.accountNumber}
                    -
                    {detailData?.busPartnerInfo?.bankAccount?.accountHolderName ||
                      detailData?.carRentalPartnerInfo?.bankAccount.accountHolderName}
                    -
                    {detailData?.busPartnerInfo?.bankAccount?.bankName ||
                      detailData?.carRentalPartnerInfo?.bankAccount.bankName}
                  </span>
                  {isReadonly && (
                    <button
                      onClick={handleShowModalEditBank}
                      style={{ fontSize: '1.8rem', color: 'var(--primary-color)', padding: '4px 8px' }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  )}
                </div>
              </div>
              {detailData?.businessInfo.approvalStatus !== config.constants.notConfirmed && (
                <div className="d-flex-column row-gap-3 mt-4">
                  <LinkItem title="Thông tin chi tiết đối tác" Icon={<PartnerIcon />} className={cx('custom')} />
                  <div className="d-flex flex-column row-gap-2">
                    <div className="mt-3 fs-4 ps-5 fst-italic">
                      Thời gian trở thành đối tác -
                      <span style={{ color: '#5DAE70', marginLeft: '8px' }}>{detailData?.timeBecomePartner}</span>
                    </div>
                    {detailData?.businessInfo.approvalStatus === config.constants.current && detailData?.timeUpdate && (
                      <div className="mt-3 fs-4 ps-5 fst-italic">
                        Thời gian khôi phục đối tác -
                        <span style={{ color: '#5DAE70', marginLeft: '8px' }}>{detailData?.timeUpdate}</span>
                      </div>
                    )}
                    {detailData?.businessInfo.approvalStatus === config.constants.cancelled && (
                      <div className="mt-3 fs-4 ps-5 fst-italic d-flex flex-column row-gap-4">
                        <div>
                          Thời gian huỷ đối tác -
                          <span style={{ color: 'red', marginLeft: '8px' }}>{detailData?.timeUpdate}</span>
                        </div>
                        <div>
                          Lý do huỷ -<span style={{ color: 'red', marginLeft: '8px' }}>{detailData?.cancelReason}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="d-flex justify-content-center gap-5" style={{ marginTop: '40px' }}>
                {status === config.constants.notConfirmed ? (
                  <Button outline onClick={handleRefuse}>
                    Từ chối
                  </Button>
                ) : (
                  <Button outline onClick={handleClose}>
                    Thoát
                  </Button>
                )}
                {!isReadonly && (
                  <Button primary onClick={handleConfirm}>
                    {status === config.constants.current
                      ? 'Huỷ đối tác'
                      : status === config.constants.notConfirmed
                      ? 'Xác nhận'
                      : 'Khôi phục đối tác'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={isEditBank} onHide={() => setIsEditBank(false)} centered>
        <Modal.Header closeButton>
          <div className={cx('header')}>
            <Modal.Title
              className={cx('title-header')}
              style={{ color: '#D34714', fontWeight: '600', fontSize: '1.9rem' }}
            >
              CẬP NHẬT TÀI KHOẢN NGÂN HÀNG
            </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form className={cx('form-bank')}>
            <Form.Group className={cx('txt', 'mb-3')} controlId="formBank.ControlInput1">
              <Form.Label>
                Tên chủ tài khoản <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Nguyễn Văn A"
                aria-label="name"
                onChange={handleChangeBankInfo}
                className={cx('txt', 'mt-3')}
                value={bankInfo.name || ''}
              />
            </Form.Group>
            <Form.Group className={cx('txt', 'mb-3')} controlId="formBank.ControlInput2">
              <Form.Label>
                Số tài khoản <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="10042003555"
                name="numberBank"
                aria-label="number-bank"
                className={cx('txt', 'mt-3')}
                onChange={handleChangeBankInfo}
                value={bankInfo.numberBank || ''}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '') // Loại bỏ ký tự không phải là số
                }}
              />
            </Form.Group>
            <Form.Group className={cx('txt', 'mb-5')} controlId="formBank.ControlInput3">
              <Form.Label>
                Tên ngân hàng <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                name="nameBank"
                aria-label="name-bank"
                className={cx('txt', 'mt-3', 'select-box')}
                onChange={handleChangeBankInfo}
                value={bankInfo.nameBank || ''}
              >
                {sortedBanks.map((bank, index) => (
                  <option key={index} value={bank.value}>
                    {bank.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button outline onClick={() => setIsEditBank(false)}>
                Thoát
              </Button>
              <Button
                primary
                disabled={bankInfo.name === '' || bankInfo.numberBank?.length <= 5 || bankInfo.bankName === ''}
                onClick={handleEditBankAccount}
              >
                Cập nhật
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DetailPartner
