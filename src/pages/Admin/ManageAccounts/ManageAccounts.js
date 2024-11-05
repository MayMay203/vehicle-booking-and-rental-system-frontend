import styles from './ManageAccount.module.scss'
import classNames from 'classnames/bind'
import Tabs from '~/components/Tabs'
import { useCallback, useEffect, useState } from 'react'
import AccountList from '~/components/AccountList'
import SearchInput from '~/components/SearchInput'
import Button from '~/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { modalNames, setAuthModalVisible } from '~/redux/slices/authModalSlice'
import { checkLoginSession } from '~/redux/slices/userSlice'
import useDebounce from '~/hook'
import { fetchAllAccounts } from '~/redux/slices/accountSlice'
import { Pagination } from 'antd'

const cx = classNames.bind(styles)
function ManageAccounts() {
  console.log('re-render manage accounts')
  const dispatch = useDispatch()
  const accountList = useSelector((state) => state.accounts.dataAccounts)
  const [type, setType] = useState('accounts')
  const [searchInput, setSearchInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const searchDebounce = useDebounce(searchInput.trim(), 500)
  // Pagination
  const { pageSize, total } = accountList.meta || {}
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      dispatch(fetchAllAccounts({ active: type === 'accounts', page: currentPage }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, currentPage])

  useEffect(() => {
    async function searchByEmail() {
      try {
        setIsLoading(true)
        if (!searchDebounce) {
          if (dispatch(checkLoginSession())) {
            dispatch(fetchAllAccounts({ active: type === 'accounts', page: currentPage }))
          }
          setIsLoading(false)
          return
        }
        if (dispatch(checkLoginSession())) {
          dispatch(fetchAllAccounts({ email: searchDebounce, active: type === 'accounts', page: currentPage }))
        }
        setIsLoading(false)
      } catch (message) {
        setIsLoading(false)
        console.log(message)
      }
    }
    searchByEmail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDebounce])

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

  const handleAddAccount = () => {
    dispatch(setAuthModalVisible({ modalName: modalNames.REGISTER_ADMIN, isVisible: true }))
  }

  const handleChange = useCallback((value) => {
    setSearchInput(value)
  }, [])

  return (
    <div className={cx('container', 'wrapper')}>
      <Tabs
        tabList={tabList}
        settings={settings}
        type={type}
        handleClickTab={handleClickTab}
        className={cx('custom-margin', 'custom-fontsize')}
      ></Tabs>

      <div className={cx('d-flex', 'justify-content-between', 'align-items-center', 'custom-margin')}>
        <SearchInput handleChange={handleChange} isLoading={isLoading} />
        <Button primary className={cx('btn-add')} onClick={handleAddAccount}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
      {accountList.result && <AccountList dataList={accountList.result} />}
      <Pagination
        className="mt-5"
        align="center"
        current={currentPage}
        pageSize={1}
        total={total === 0 ? pageSize : pageSize * total}
        onChange={(page)=>setCurrentPage(page)}
      />
    </div>
  )
}

export default ManageAccounts
