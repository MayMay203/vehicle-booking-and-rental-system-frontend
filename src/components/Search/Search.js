import { memo, useEffect, useState } from 'react'
import Button from '../Button'
import styles from './Search.module.scss'
import classNames from 'classnames/bind'
import { getLocations } from '~/apiServices/getLocations'
import { Select } from 'antd'

const cx = classNames.bind(styles)
function Search({ noSelectBus, noSelectDate = false }) {
  const [busName, setBusName] = useState('Xuân Thảo')
  const [departureLocation, setDepartureLocation] = useState('Đà Nẵng')
  const [arrivalLocation, setArrivalLocation] = useState('Nam Định')
  const [provincesList, setProvincesList] = useState([])

  useEffect(() => {
    async function fetchApi() {
      const provices = await getLocations(1)
      if (provices) {
        const cleanedProvinces = provices.map((province) => {
          return {
            ...province,
            name: province.name.replace(/^(Thành phố|Tỉnh)\s+/i, ''),
          }
        })
        setProvincesList(cleanedProvinces)
      }
    }
    fetchApi()
  }, [])

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
                    value: 'Xuân Thảo',
                    label: 'Xuân Thảo',
                  },
                  {
                    value: 'Minh Phương',
                    label: 'Minh Phương',
                  },
                  {
                    value: 'Đông Hưng',
                    label: 'Đông Hưng',
                  },
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
              <input
                type="date"
                className="w-100"
                defaultValue={new Date().toISOString().split('T')[0]} 
                min={new Date().toISOString().split('T')[0]} 
              />
            </div>
          </div>
        )}
        <div className="col-sm-12 col-md-5 m-lg-auto">
          <Button primary className="mt-3 m-auto w-75 mt-md-5">
            Tìm kiếm
          </Button>
        </div>
      </div>
    </div>
  )
}

export default memo(Search)
