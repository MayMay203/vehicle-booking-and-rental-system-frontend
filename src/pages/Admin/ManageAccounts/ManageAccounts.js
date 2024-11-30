import styles from './ManageAccount.module.scss'
import classNames from 'classnames/bind'
import Tabs from '~/components/Tabs'
import { useCallback, useEffect, useMemo, useState } from 'react'
import AccountList from '~/components/AccountList'
import SearchInput from '~/components/SearchInput'
import Button from '~/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { modalNames, setAuthModalVisible } from '~/redux/slices/authModalSlice'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { fetchAllAccounts } from '~/redux/slices/accountSlice'
import { Empty, Pagination } from 'antd'
import { config } from '~/config'

const cx = classNames.bind(styles)
function ManageAccounts() {
  console.log('re-render manage accounts')
  const dispatch = useDispatch()
  const accountList = useSelector((state) => state.accounts.dataAccounts)
  console.log(accountList)
  const isLoading = useSelector((state) => state.accounts.isLoading)
  const [type, setType] = useState('accounts')
  // Search
  const [searchDebounce, setSearchDebounce] = useState('')
  // Pagination
  const { total } = accountList?.meta || {}
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
        if (!searchDebounce) {
          if (dispatch(checkLoginSession())) {
            dispatch(fetchAllAccounts({ active: type === 'accounts', page: currentPage }))
          }
          return
        }
        if (dispatch(checkLoginSession())) {
          dispatch(fetchAllAccounts({ email: searchDebounce, active: type === 'accounts' }))
        }
      } catch (message) {
        console.log(message)
      }
    }
    searchByEmail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDebounce])

  const tabList = useMemo(
    () => [
      {
        label: 'Tài khoản',
        value: 'accounts',
      },
      {
        label: 'Đã khoá',
        value: 'locked',
      },
    ],
    [],
  )

  const settings = useMemo(
    () => ({
      slidesToShow: 2,
      infinite: false,
      swipe: false,
      draggable: false,
    }),
    [],
  )

  const handleClickTab = useCallback((type) => {
    setType(type)
  }, [])

  const handleAddAccount = () => {
    dispatch(setAuthModalVisible({ modalName: modalNames.REGISTER_ADMIN, isVisible: true }))
  }

  const handleChange = useCallback((value) => {
    setSearchDebounce(value)
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
      {accountList?.result && <AccountList dataList={accountList.result} />}
      {accountList?.result?.length > 0 && (
        <Pagination
          className="mt-5"
          align="center"
          current={currentPage}
          pageSize={config.variables.pagesize}
          total={total}
          onChange={(page) => setCurrentPage(page)}
        />
      )}
      {accountList.length === 0 && <Empty style={{ marginTop: '70px' }} description="Không có dữ liệu tài khoản nào" />}
    </div>
  )
}

export default ManageAccounts
