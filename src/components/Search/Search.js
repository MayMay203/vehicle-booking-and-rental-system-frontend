import { memo } from 'react'
import Button from '../Button'
import styles from './Search.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function Search({ noSelectBus, noSelectDate = false }) {
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
              <div className={cx('custom-select')}>
                <select className="w-100">
                  <option>Chọn nhà xe</option>
                  <option value="Xuân Thảo">Xuân Thảo</option>
                  <option value="Xuân Thảo">Minh Phương</option>
                  <option value="Xuân Thảo">Minh Tiến</option>
                </select>
              </div>
            </div>
          </div>
        )}
        <div className="col">
          <div className={cx('item')}>
            <p className={cx('title')}>Nơi xuất phát</p>
            <div className={cx('custom-select')}>
              <select className="w-100">
                <option>Nơi xuất phát</option>
                <option value="Xuân Thảo">Hà Nội</option>
                <option value="Xuân Thảo">Hải Phòng</option>
                <option value="Xuân Thảo">Thanh Hoá</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col">
          <div className={cx('item')}>
            <p className={cx('title')}>Nơi đến</p>
            <div className={cx('custom-select')}>
              <select className="w-100">
                <option>Nơi đến</option>
                <option value="Xuân Thảo">Nghệ An</option>
                <option value="Xuân Thảo">Hà Tĩnh</option>
                <option value="Xuân Thảo">Quảng Bình</option>
              </select>
            </div>
          </div>
        </div>
        {!noSelectDate && (
          <div className="col col-md-6">
            <div className={cx('item')}>
              <p className={cx('title')}>Ngày đi</p>
              <input type="date" className="w-100"></input>
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
