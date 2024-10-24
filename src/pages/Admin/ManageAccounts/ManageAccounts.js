import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap'
import styles from './ManageAccount.module.scss'
import classNames from 'classnames/bind'
import { config } from '~/config'
import Tabs from '~/components/Tabs'
import { useEffect, useState } from 'react'
import AccountList from '~/components/AccountList'
import SearchInput from '~/components/SearchInput'
import Button from '~/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { modalNames, setAuthModalVisible } from '~/redux/slices/authModalSlice'
import { getAllAccounts } from '~/apiServices/getAllAccounts'
import { checkLoginSession } from '~/redux/slices/userSlice'

const cx = classNames.bind(styles)
function ManageAccounts() {
  const dispatch = useDispatch()
  const [type, setType] = useState('accounts')
  const [accountList, setAccountList] = useState([])
  const [filterData, setFilterData] = useState([])

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

  useEffect(() => {
    async function fetchAllAccounts() {
      if (dispatch(checkLoginSession())) {
        let data = await getAllAccounts()
        if (data) {
          setAccountList(data.result)
        }
      }
    }
    fetchAllAccounts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountList])

  useEffect(() => {
    if (accountList.length > 0) {
      let data
      if (type === 'accounts') {
        data = accountList.filter((account) => account.accountInfo.active === true)
      } else {
        data = accountList.filter((account) => account.accountInfo.active === false)
      }
      setFilterData(data)
    }
},[accountList, type])

  const handleClickTab = (type) => {
    setType(type)
  }

  const handleAddAccount = () => {
    dispatch(setAuthModalVisible({ modalName: modalNames.REGISTER_ADMIN, isVisible: true }))
  }

  return (
    <div className={cx('container', 'wrapper')}>
      <Breadcrumb>
        <BreadcrumbItem href="#">Trang chủ</BreadcrumbItem>
        <BreadcrumbItem href={config.routes.accounts} active>
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
        <Button primary className={cx('btn-add')} onClick={handleAddAccount}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
      {accountList && <AccountList dataList={filterData} />}
    </div>
  )
}

export default ManageAccounts
