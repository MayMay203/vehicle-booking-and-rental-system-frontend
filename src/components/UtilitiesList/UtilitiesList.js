import UtilityItem from './UtilityItem'
import PropTypes from 'prop-types'
function UtilitiesList({ dataList }) {
  return (
    <div className="p-4 pt-0 mt-4 row row-cols-1 row-cols-lg-2 gx-lg-4 gy-3">
      {dataList.map((utility) => (
        <UtilityItem key={utility.id} data={utility} />
      ))}
    </div>
  )
}

UtilitiesList.propTypes = {
  dataList: PropTypes.array.isRequired,
}

export default UtilitiesList
