import { useCallback, useEffect, useState } from 'react'
import styles from './ManagePartners.module.scss'
import classNames from 'classnames/bind'
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap'
import Tabs from '~/components/Tabs'
import { config } from '~/config'
import SearchInput from '~/components/SearchInput'
import PartnersList from '~/components/PartnersList/PartnersList'
import { createSearchParams, useLocation } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { fetchAllDriverPartners, fetchAllRegisterPartners } from '~/redux/slices/partnerSlice'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { Empty, Pagination } from 'antd'

const cx = classNames.bind(styles)
function ManagePartners() {
  console.log('re-render managePartners')
  const partnerList = useSelector((state) => state.partners.partnerList)
  const [type, setType] = useState(config.constants.notConfirmed)
  const [partnerType, setPartnerType] = useState('')
  const location = useLocation()
  const dispatch = useDispatch()
  // Search
  const [searchDebounce, setSearchDebounce] = useState('')
  // Pagination
  const { total } = partnerList?.meta || {}
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const searchParam = createSearchParams(location.search)
    setPartnerType(searchParam.get('type'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  // Partner type change call API method
  useEffect(() => {
    if (partnerType === config.constants.busPartner || partnerType === config.constants.carRentalPartner) {
      if (dispatch(checkLoginSession())) {
        dispatch(fetchAllRegisterPartners({ partnerType, status: type, page: currentPage }))
      }
    } else if (partnerType === config.constants.driverPartner) {
      console.log('VO DRIVER')
      if (dispatch(checkLoginSession())) {
        dispatch(fetchAllDriverPartners({ status: type, page: currentPage }))
      }
    }
  }, [partnerType, type, dispatch, currentPage])

  const tabList = [
    {
      label: 'Chờ xác nhận',
      value: config.constants.notConfirmed,
    },
    {
      label: 'Hiện tại',
      value: config.constants.current,
    },
    {
      label: 'Đã huỷ',
      value: config.constants.cancelled,
    },
  ]

  const settings = {
    slidesToShow: 3,
    infinite: false,
    swipe: false,
    draggable: false,
  }

  const handleClickTab = (type) => {
    setType(type)
  }

  useEffect(() => {
    if (partnerType === config.constants.busPartner || partnerType === config.constants.carRentalPartner) {
      dispatch(
        fetchAllRegisterPartners({
          partnerType,
          status: type,
          emailOfRepresentative: searchDebounce,
          // page: currentPage,
        }),
      )
    } else if (partnerType === config.constants.driverPartner) {
      dispatch(fetchAllDriverPartners({ status: type, email: searchDebounce }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDebounce])

  const handleChange = useCallback((value) => {
    setSearchDebounce(value)
  }, [])

  return (
    <div className={cx('wrapper')}>
      <Breadcrumb>
        <BreadcrumbItem href="#">Trang chủ</BreadcrumbItem>
        <BreadcrumbItem href="#">Đối tác</BreadcrumbItem>
        <BreadcrumbItem active>
          {partnerType === config.constants.busPartner
            ? 'Đối tác nhà xe'
            : partnerType === config.constants.carRentalPartner
            ? 'Đối tác cho thuê xe'
            : 'Đối tác tài xế'}
        </BreadcrumbItem>
      </Breadcrumb>

      <Tabs
        tabList={tabList}
        settings={settings}
        type={type}
        handleClickTab={handleClickTab}
        className={cx('custom-margin', 'custom-fontsize')}
      ></Tabs>
      <SearchInput handleChange={handleChange} className={cx('custom-margin')} />

      {partnerList.result && <PartnersList dataList={[...partnerList.result].reverse()} />}
      {partnerList.result?.length > 0 && (
        <Pagination
          className="mt-5"
          align="center"
          current={currentPage}
          pageSize={config.constants.pagesize}
          total={total}
          onChange={(page) => setCurrentPage(page)}
        />
      )}

      {partnerList.result?.length === 0 && (
        <Empty style={{ marginTop: '70px' }} description="Không có dữ liệu đối tác nào" />
      )}
    </div>
  )
}

export default ManagePartners
