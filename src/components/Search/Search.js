import { memo, useEffect, useState } from 'react'
import Button from '../Button'
import styles from './Search.module.scss'
import classNames from 'classnames/bind'
import { getLocations } from '~/apiServices/getLocations'
import { Select } from 'antd'
import DatePicker from 'react-datepicker'
import { config } from '~/config'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTicket } from '~/redux/slices/searchSlice'
import { getBusinessName } from '~/apiServices/user/getBusPartnerName'

const cx = classNames.bind(styles)
function Search({ noSelectBus, noSelectDate = false }) {
  const searchValues = useSelector((state) => state.search.searchTicket)
  const [busName, setBusName] = useState(searchValues.busName)
  const [departureLocation, setDepartureLocation] = useState(searchValues.departureLocation)
  const [arrivalLocation, setArrivalLocation] = useState(searchValues.arrivalLocation)
  const [provincesList, setProvincesList] = useState([])
  const [businessList, setBusinessList] = useState([])
  const [departureDate, setDepartureDate] = useState(searchValues.departureDate)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setBusName(searchValues.busName)
    setDepartureLocation(searchValues.departureLocation)
    setArrivalLocation(searchValues.arrivalLocation)
    setDepartureDate(searchValues.departureDate)
  }, [searchValues])

  useEffect(() => {
    async function fetchApi() {
      const provinces = await getLocations(1)
      if (provinces) {
       const cleanedProvinces = provinces
         .map((province) => {
           const cleanedName = province.name.replace(/^(Thành phố|Tỉnh)\s+/i, '') // Loại bỏ tiền tố "Thành phố" hoặc "Tỉnh"
           return {
             ...province,
             name: cleanedName === 'Hồ Chí Minh' ? `TP ${cleanedName}` : cleanedName, // Thêm "TP" nếu là Hồ Chí Minh
           }
         })
         .sort((a, b) => a.name.localeCompare(b.name))
        setProvincesList(cleanedProvinces)
      }
      const businessNames = await getBusinessName()
      if (businessNames) {
        setBusinessList(businessNames)
      }
    }
    fetchApi()
  }, [])

  const handleSearch = () => {
    const date = new Date(departureDate)
    const formattedDate = date.toISOString().split('T')[0]
    dispatch(setSearchTicket({ busName, departureDate: formattedDate, departureLocation, arrivalLocation }))
    if (window.location.origin === 'http://localhost:3000' && window.location.pathname === '/') {
      navigate(config.routes.ticket)
    }
  }

  return (
    <div className={cx('wrapper')}>
      <div
        className={
          noSelectBus && noSelectDate
            ? 'row row-cols-1 gy-4 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-3'
            : noSelectBus
            ? 'row row-cols-1 gy-4 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 row-cols-xl-4'
            : 'row row-cols-1 gy-4 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-5'
        }
      >
        {!noSelectBus && (
          <div className="col">
            <div className={cx('item')}>
              <p className={cx('title')}>Chọn nhà xe</p>
              <Select
                showSearch
                style={{
                  width: '100%',
                  fontSize: '1.6rem',
                }}
                defaultValue={busName}
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                onChange={(value) => setBusName(value)}
                options={[
                  {
                    value: 'all',
                    label: 'Tất cả',
                  },
                  ...businessList?.map((business) => ({ value: business, label: business })),
                ]}
              />
            </div>
          </div>
        )}
        <div className="col">
          <div className={cx('item')}>
            <p className={cx('title')}>Nơi xuất phát</p>
            <div className={cx('custom-select')}>
              <Select
                showSearch
                defaultValue={departureLocation}
                style={{
                  width: '100%',
                }}
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={provincesList.map((province) => ({ value: province.name, label: province.name }))}
                onChange={(value) => setDepartureLocation(value)}
              />
            </div>
          </div>
        </div>
        <div className="col">
          <div className={cx('item')}>
            <p className={cx('title')}>Nơi đến</p>
            <div className={cx('custom-select')}>
              <Select
                showSearch
                style={{
                  width: '100%',
                  fontSize: '1.6rem',
                }}
                defaultValue={arrivalLocation}
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                onChange={(value) => setArrivalLocation(value)}
                options={provincesList.map((province) => ({ value: province.name, label: province.name }))}
              />
            </div>
          </div>
        </div>
        {!noSelectDate && (
          <div className="col col-md-6">
            <div className={cx('item')}>
              <p className={cx('title')}>Ngày đi</p>
              {/* <input
                type="date"
                className="w-100"
                defaultValue={new Date().toISOString().split('T')[0]}
                min={new Date().toISOString().split('T')[0]}
              /> */}
              <div className="custom-picker">
                <DatePicker
                  selected={departureDate}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  maxDate={new Date('2025-12-31')}
                  onKeyDown={(e) => e.preventDefault()}
                  onChange={(date) => setDepartureDate(date)}
                />
              </div>
            </div>
          </div>
        )}
        <div className="col-sm-12 col-md-5 m-lg-auto">
          <Button primary className="mt-3 m-auto w-75 mt-md-5" onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </div>
      </div>
    </div>
  )
}

export default memo(Search)
