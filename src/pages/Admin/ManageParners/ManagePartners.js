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
import { fetchAllRegisterPartners } from '~/redux/slices/partnerSlice'

const cx = classNames.bind(styles)
function ManagePartners() {
  console.log('re-render managePartners')
  const partnerList = useSelector((state) => state.partners.partnerList)
  const [type, setType] = useState(config.variables.current)
  const [partnerType, setPartnerType] = useState('')
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    const searchParam = createSearchParams(location.search)
    setPartnerType(searchParam.get('type'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  // Partner type change call API method
  useEffect(() => {
    dispatch(fetchAllRegisterPartners({ partnerType, type }))
  },[partnerType, type, dispatch])

  const tabList = [
    {
      label: 'Hiện tại',
      value: config.variables.current,
    },
    {
      label: 'Chờ xác nhận',
      value: config.variables.notConfirmed,
    },
    {
      label: 'Đã huỷ',
      value: config.variables.cancelled,
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

  const handleChange = useCallback(() => {
    
  },[])

  return (
    <div className={cx('wrapper')}>
      <Breadcrumb>
        <BreadcrumbItem href="#">Trang chủ</BreadcrumbItem>
        <BreadcrumbItem href={config.routes.managePartners}>Quản lý đối tác</BreadcrumbItem>
        <BreadcrumbItem href={`${config.routes.managePartners}/bus-partners`} active>
          Đối tác nhà xe
        </BreadcrumbItem>
      </Breadcrumb>

      <Tabs
        tabList={tabList}
        settings={settings}
        type={type}
        handleClickTab={handleClickTab}
        className={cx('custom-margin', 'custom-fontsize')}
      ></Tabs>
      <SearchInput handleChange={handleChange} className={cx('custom-margin')}/>

      {partnerList && <PartnersList dataList={partnerList} />}
    </div>
  )
}

export default ManagePartners
