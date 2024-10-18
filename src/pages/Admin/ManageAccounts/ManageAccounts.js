import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap'
import styles from './ManageAccount.module.scss'
import classNames from 'classnames/bind'
import { config } from '~/config'
import Tabs from '~/components/Tabs'
import { useState } from 'react'
import AccountList from '~/components/AccountList'
import SearchInput from '~/components/SearchInput'

const cx = classNames.bind(styles)
function ManageAccounts() {
  const [type, setType] = useState('accounts')

  const tabList = [
    {
      label: 'Tài khoản',
      value: 'accounts',
    },
    {
      label: 'Đã khoá',
      value: 'locked',
    },
  ]

  const settings = {
    slidesToShow: 2,
    infinite: false,
    swipe: false,
    draggable: false,
  }

  const handleClickTab = (type) => {
    setType(type)
  }

  return (
   <div className='container'>
      <div className={cx('wrapper')}>
        <Breadcrumb>
          <BreadcrumbItem href="#">Trang chủ</BreadcrumbItem>
          <BreadcrumbItem href={config.accounts} active>
            Quản lý tài khoản
          </BreadcrumbItem>
        </Breadcrumb>
  
        <Tabs tabList={tabList} settings={settings} type={type} handleClickTab={handleClickTab}></Tabs>
  
        <SearchInput className='mt-5' />
        <AccountList type={type} />
      </div>
   </div>
  )
}

export default ManageAccounts
