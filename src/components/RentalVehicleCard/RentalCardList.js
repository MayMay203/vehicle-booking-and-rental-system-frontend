import React from 'react'
import classNames from 'classnames/bind'
import styles from './RentalCard.module.scss'
import RentalCardItem from './RentalCardItem'
import PropTypes from 'prop-types'

const cx = classNames.bind(styles)
function RentalCardList({ maxColumns = 4, typeService, role, listVehicleRentals }) {
  const cards = listVehicleRentals.map((item, index) => (
    <RentalCardItem
      key={index}
      typeService={typeService}
      role={role}
      item={item}
    />
  ))

  const numGhostColumns = maxColumns - (cards.length % maxColumns || maxColumns)

  return (
    <div className={cx('row justify-content-center')}>
      {cards.map((card, index) => (
        <React.Fragment key={index}>{card}</React.Fragment>
      ))}

      {/* Thêm cột "giả" nếu số lượng card không chia hết cho số cột tối đa */}
      {numGhostColumns < maxColumns &&
        Array.from({ length: numGhostColumns }).map((_, index) => (
          <div key={`ghost-${index}`} className={cx('ghost-card')}></div>
        ))}
    </div>
  )
}
RentalCardList.propTypes = {
  typeService: PropTypes.string.isRequired,
}
export default RentalCardList
