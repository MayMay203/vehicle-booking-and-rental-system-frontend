import styles from './ManageAccount.module.scss'
import classNames from 'classnames/bind'
import Tabs from '~/components/Tabs'
import { useCallback, useEffect, useState } from 'react'
import AccountList from '~/components/AccountList'
import SearchInput from '~/components/SearchInput'
import Button from '~/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { modalNames, setAuthModalVisible } from '~/redux/slices/authModalSlice'
import { getAllAccounts } from '~/apiServices/getAllAccounts'
import { checkLoginSession } from '~/redux/slices/userSlice'
import useDebounce from '~/hook'
import { searchAccByEmail } from '~/apiServices/searchAccByEmail'

const cx = classNames.bind(styles)
function ManageAccounts() {
  const dispatch = useDispatch()
  const [type, setType] = useState('accounts')
  const [accountList, setAccountList] = useState([])
  const [filterData, setFilterData] = useState([])
  const[filterSearch, setFilterSearch] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const searchDebounce = useDebounce(searchInput.trim(), 500)
  
  useEffect(() => {
    async function searchByEmail() {
      try {
        if (!searchDebounce) {
          setFilterSearch(filterData)
          return
        }
        if (checkLoginSession()) {
          const data = await searchAccByEmail(searchDebounce)
          let searchList;
            if (type === 'accounts') {
              searchList = data.result.filter((account) => account.accountInfo.active === true)
              console.log(filterSearch)
            } else {
              searchList = data.result.filter((account) => account.accountInfo.active === false)
              console.log(filterSearch)
            }
          setFilterSearch(searchList)
        }
      } catch (message) {
        console.log(message)
      }
    }
    searchByEmail()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchDebounce])

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

  const fetchAllAccounts = async () => {
    if (dispatch(checkLoginSession())) {
      let data = await getAllAccounts()
      if (data) {
        setAccountList(data.result)
      }
    }
  }

 useEffect(() => {
   fetchAllAccounts()
   // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [type])

  useEffect(() => {
    if (accountList.length > 0) {
      let data
      if (type === 'accounts') {
        data = accountList.filter((account) => account.accountInfo.active === true)
      } else {
        data = accountList.filter((account) => account.accountInfo.active === false)
      }
      setFilterData(data)
      setFilterSearch(data)
    }
},[accountList, type])

  const handleClickTab = (type) => {
    setType(type)
  }

  const handleAddAccount = () => {
    dispatch(setAuthModalVisible({ modalName: modalNames.REGISTER_ADMIN, isVisible: true }))
  }

  const handleChange = useCallback((value) => {
    setSearchInput(value)
  },[])

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
        <SearchInput handleChange={handleChange} />
        <Button primary className={cx('btn-add')} onClick={handleAddAccount}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
      {accountList && <AccountList dataList={filterSearch} />}
    </div>
  )
}

export default ManageAccounts
