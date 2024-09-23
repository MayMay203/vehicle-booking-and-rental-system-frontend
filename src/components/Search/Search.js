import Button from '../Button'
import styles from './Search.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function Search() {
  return (
    <div className={cx('wrapper')}>
      <div className="row">
        <div className="col">
          <div className={cx('item')}>
            <p className={cx('title')}>Chọn nhà xe</p>
            <div className={cx('custom-select')}>
                <select>
                  <option>Chọn nhà xe</option>
                  <option value="Xuân Thảo">Xuân Thảo</option>
                  <option value="Xuân Thảo">Minh Phương</option>
                  <option value="Xuân Thảo">Minh Tiến</option>
                </select>
            </div>
          </div>
        </div>
        <div className="col">
          <div className={cx('item')}>
            <p className={cx('title')}>Nơi xuất phát</p>
           <div className={cx('custom-select')}>
                <select>
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
                <select>
                  <option>Nơi đến</option>
                  <option value="Xuân Thảo">Nghệ An</option>
                  <option value="Xuân Thảo">Hà Tĩnh</option>
                  <option value="Xuân Thảo">Quảng Bình</option>
                </select>
           </div>
          </div>
        </div>
        <div className="col">
          <div className={cx('item')}>
            <p className={cx('title')}>Ngày đi</p>
            <input type="date"></input>
          </div>
        </div>
        <div className='col m-auto'>
          <Button primary className='m-auto'>Tìm kiếm</Button>
        </div>
      </div>
    </div>
  )
}

export default Search
