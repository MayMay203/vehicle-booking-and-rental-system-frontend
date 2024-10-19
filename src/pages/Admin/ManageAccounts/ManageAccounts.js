import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap'
import styles from './ManageAccount.module.scss'
import classNames from 'classnames/bind'
import { config } from '~/config'
import Tabs from '~/components/Tabs'
import { useState } from 'react'
import AccountList from '~/components/AccountList'
import SearchInput from '~/components/SearchInput'
import Button from '~/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import LockModal from '~/Modals/ServiceModal/LockModal'
import { useAuthModal } from '~/Context/AuthModalProvider'
import { RegisterAdminModal } from '~/Modals/AuthModal'
import { ConfirmModal } from '~/Modals/ServiceModal'

const cx = classNames.bind(styles)
function ManageAccounts() {
  const [type, setType] = useState('accounts')
  const { openAuthModal } = useAuthModal()

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

  const handleAddAdminAccount = () => {
    openAuthModal('registerAdmin')
  }

  return (
    <div className={cx('container', 'wrapper')}>
      <Breadcrumb>
        <BreadcrumbItem href="#">Trang chủ</BreadcrumbItem>
        <BreadcrumbItem href={config.accounts} active>
          Quản lý tài khoản
        </BreadcrumbItem>
      </Breadcrumb>

      <Tabs
        tabList={tabList}
        settings={settings}
        type={type}
        handleClickTab={handleClickTab}
        className={cx('custom-margin', 'custom-fontsize')}
      ></Tabs>

      <div className={cx('d-flex', 'justify-content-between', 'align-items-center', 'custom-margin')}>
        <SearchInput />
        <Button primary className={cx('btn-add')} onClick={handleAddAdminAccount}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
      <AccountList type={type} />
      <LockModal />
      <RegisterAdminModal />
      <ConfirmModal />
    </div>
  )
}

export default ManageAccounts
