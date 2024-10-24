import { useState } from 'react'
import styles from './ManagePartners.module.scss'
import classNames from 'classnames/bind'
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap'
import Tabs from '~/components/Tabs'
import { config } from '~/config'
import SearchInput from '~/components/SearchInput'
import PartnersList from '~/components/PartnersList/PartnersList'

const cx = classNames.bind(styles)
function ManagePartners() {
  const [type, setType] = useState('current')
  const tabList = [
    {
      label: 'Hiện tại',
      value: 'current',
    },
    {
      label: 'Chờ xác nhận',
      value: 'notConfirmed',
    },
    {
      label: 'Đã huỷ',
      value: 'canceled',
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
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem href="#">Trang chủ</BreadcrumbItem>
        <BreadcrumbItem href={config.routes.partners}>Quản lý đối tác</BreadcrumbItem>
        <BreadcrumbItem href={`${config.routes.partners}/bus-partners`} active>
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

      <div className={cx('d-flex', 'justify-content-end', 'custom-margin')}>
        <SearchInput />
      </div>

      <PartnersList />
    </div>
  )
}

export default ManagePartners
