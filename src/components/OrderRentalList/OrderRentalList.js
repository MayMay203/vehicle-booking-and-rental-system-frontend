import OrderRentalItem from './OrderRentalItem'
import PropTypes from 'prop-types'
function OrderRentalList({ status, dataList }) {
  return (
    <div>
      {dataList?.map((ticket, index) => (
        <OrderRentalItem key={index} status={status} data={ticket} />
      ))}
    </div>
  )
}

OrderRentalList.propTypes = {
  status: PropTypes.string,
  dataList: PropTypes.array.isRequired,
}

export default OrderRentalList
