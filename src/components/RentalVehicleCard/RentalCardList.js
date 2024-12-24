import React from 'react'
import classNames from 'classnames/bind'
import styles from './RentalCard.module.scss'
import RentalCardItem from './RentalCardItem'
import PropTypes from 'prop-types'
import { Empty } from 'antd'

const cx = classNames.bind(styles)
function RentalCardList({ maxColumns = 4, typeService, role, listVehicleRentals, startDateTime, endDateTime }) {
  //  console.log('endDatatime ---1---', endDateTime)
  //  console.log('startDatatime ---- 1----', startDateTime)
  const cards = listVehicleRentals.map((item, index) => (
    <RentalCardItem key={index} typeService={typeService} role={role} item={item} startDateTime={startDateTime} endDateTime={endDateTime} />
  ))

  const numGhostColumns = maxColumns - (cards.length % maxColumns || maxColumns)

  return (
    <div className={cx('row justify-content-center')}>
      {cards.length > 0 && cards.map((card, index) => <React.Fragment key={index}>{card}</React.Fragment>)}

      {/* Thêm cột "giả" nếu số lượng card không chia hết cho số cột tối đa */}
      {numGhostColumns < maxColumns &&
        Array.from({ length: numGhostColumns }).map((_, index) => (
          <div key={`ghost-${index}`} className={cx('ghost-card')}></div>
        ))}
      {cards.length === 0 && (
        <div style={{ marginTop: '60px', marginBottom: '20px' }}>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Không có xe nào phù hợp với yêu cầu của bạn lúc này."
          />
        </div>
      )}
    </div>
  )
}
RentalCardList.propTypes = {
  typeService: PropTypes.string.isRequired,
}
export default RentalCardList
