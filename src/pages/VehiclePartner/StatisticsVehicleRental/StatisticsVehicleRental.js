import classNames from 'classnames/bind'
import styles from './StatisticsVehicleRental.module.scss'
import { Tab, Tabs } from 'react-bootstrap'
import StatsNumberVehicleRental from '~/components/StatsNumberVehicleRental/StatsNumberVehicleRental'
import StatsRevenueRentalService from '~/components/StatsRevenueRental/StatsRevenueRentalService'
const cx = classNames.bind(styles)
function StatisticsVehicleRental() {
  return (
    <div className="container mt-5 mb-5 p-0">
      <Tabs defaultActiveKey="Số xe cho thuê" id="fill-tab-statistics" className={cx('mb-3')} fill>
        <Tab eventKey="Số xe cho thuê" title="Số xe cho thuê" className={cx('title-tab')}>
          <StatsNumberVehicleRental></StatsNumberVehicleRental>
        </Tab>
        <Tab eventKey="Doanh thu" title="Doanh thu" className={cx('title-tab')}>
          <StatsRevenueRentalService></StatsRevenueRentalService>
        </Tab>
      </Tabs>
    </div>
  )
}
export default StatisticsVehicleRental
