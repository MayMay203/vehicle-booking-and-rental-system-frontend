import TicketItem from './TicketItem'
import PropTypes from 'prop-types'
function TicketList({ status, dataList }) {
  return (
    <div>
      {dataList.map((ticket, index) => (
        <TicketItem key={index} status={status} data={ticket} />
      ))}
    </div>
  )
}

TicketList.propTypes = {
  status: PropTypes.string,
  dataList: PropTypes.array.isRequired,
}

export default TicketList
