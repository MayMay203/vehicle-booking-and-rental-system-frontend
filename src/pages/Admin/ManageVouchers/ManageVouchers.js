import classNames from 'classnames/bind'
import styles from './ManageVoucher.module.scss'
import Button from '~/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullseye, faCheckDouble, faPlusCircle, faTicket, faUpDown } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAddVoucherVisible } from '~/redux/slices/generalModalSlice'
import { Empty, Pagination } from 'antd'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { fetchAllVouchers } from '~/redux/slices/voucherSlice'
import Voucher from '~/components/Voucher'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

const cx = classNames.bind(styles)
function ManageVouchers() {
  const [type, setType] = useState('all')
  const dispatch = useDispatch()
  const { voucherList } = useSelector((state) => state.voucher)
  const [filteredList, setFilteredList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOrder, setSortOrder] = useState('asc')

  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      dispatch(fetchAllVouchers({ page: currentPage }))
    }
  }, [currentPage, dispatch])

  useEffect(() => {
    let result = voucherList.result || []

    if (type === 'hasCode') {
      result = result.filter((voucher) => voucher.remainingQuantity > 0)
    } else if (type === 'outOfCode') {
      result = result.filter((voucher) => voucher.remainingQuantity === 0)
    }

    if (result.length > 0) {
      result = [...result].sort((a, b) => {
        const dateA = new Date(a.startDate.split('-').reverse().join('-'))
        const dateB = new Date(b.startDate.split('-').reverse().join('-'))
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
      })
    }

    setFilteredList(result)
    console.log('Filtered and Sorted List:', result)
  }, [voucherList.result, type, sortOrder])

  const handleAddVoucher = () => {
    dispatch(setAddVoucherVisible(true))
  }

  return (
    <div className={cx('wrapper')}>
      <div className="row row-cols-1 row-cols-lg-2 gy-5">
        <div className="col">
          <div className="d-flex gap-2 gap-lg-4">
            <Button
              rounded
              leftIcon={<FontAwesomeIcon icon={faCheckDouble} />}
              className={cx('normal', { active: type === 'all' })}
              style={{ fontSize: '1.5rem', height: '36px' }}
              onClick={() => setType('all')}
            >
              Tất cả
            </Button>
            <Button
              rounded
              className={cx('normal', { active: type === 'hasCode' })}
              onClick={() => setType('hasCode')}
              style={{ fontSize: '1.5rem', height: '36px' }}
              leftIcon={<FontAwesomeIcon icon={faTicket} />}
            >
              Còn mã
            </Button>
            <Button
              rounded
              className={cx('normal', { active: type === 'outOfCode' })}
              onClick={() => setType('outOfCode')}
              style={{ fontSize: '1.5rem', height: '36px' }}
              leftIcon={<FontAwesomeIcon icon={faBullseye} />}
            >
              Hết mã
            </Button>
          </div>
        </div>
        <div className="col">
          <div className="d-flex column-gap-3 justify-content-start justify-content-lg-end">
            <Tippy content="Tăng dần, giảm dần theo ngày có hiệu lực"T>
              <button>
                <Button
                  outline
                  leftIcon={<FontAwesomeIcon icon={faUpDown} />}
                  style={{
                    fontSize: '1.5rem',
                    height: '36px',
                    backgroundColor: '#fff',
                  }}
                  onClick={() => setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'))}
                >
                  Sắp xếp
                </Button>
              </button>
            </Tippy>
            <Button
              primary
              leftIcon={<FontAwesomeIcon icon={faPlusCircle} />}
              style={{ fontSize: '1.5rem', height: '36px' }}
              onClick={handleAddVoucher}
            >
              Thêm mã
            </Button>
          </div>
        </div>
      </div>
      <div className="row mt-5 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gap-5">
        {filteredList?.map((voucher) => (
          <Voucher key={voucher.id} className="m-auto" data={voucher} />
        ))}
        {
          filteredList.length % 2 !== 0 && <div className='m-auto'></div>
        }
      </div>
      {filteredList.length > 0 && (
        <Pagination
          className="mt-5"
          align="center"
          current={currentPage}
          pageSize={6}
          total={voucherList.meta?.total}
          onChange={(page) => setCurrentPage(page)}
        />
      )}
      {filteredList.length === 0 && <Empty style={{ marginTop: '70px' }} description="Không có voucher nào gần đây" />}
    </div>
  )
}

export default ManageVouchers
