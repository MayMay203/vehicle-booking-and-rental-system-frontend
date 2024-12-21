import TicketItem from "./TicketItem";
import PropTypes from 'prop-types'
function TicketList({ status, dataList, isDetailOrder }) {
  console.log(isDetailOrder)
  return (
    <div>
      {dataList.map((ticket, index) => (
        <TicketItem key={index} status={status} data={ticket} isDetailOrder={isDetailOrder} />
      ))}
    </div>
  )
}

TicketList.propTypes = {
  status: PropTypes.string,
  dataList: PropTypes.array.isRequired,
}

export default TicketList;