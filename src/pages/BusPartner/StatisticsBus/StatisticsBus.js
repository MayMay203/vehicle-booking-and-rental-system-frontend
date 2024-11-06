import classNames from "classnames/bind"
import styles from './StatisticsBus.module.scss'
import { Tab, Tabs } from "react-bootstrap"
import StatisticsTicket from "~/components/StatisticsTicket"
const cx = classNames.bind(styles)
function StatisticsBus(){
    return (
      <div className="container mt-5 mb-5 p-0">
        <Tabs defaultActiveKey="Số vé đã bán" id="fill-tab-statistics" className={cx('mb-3')} fill>
          <Tab eventKey="Số vé đã bán" title="Số vé đã bán" className={cx('title-tab')}>
            <StatisticsTicket></StatisticsTicket>
          </Tab>
          <Tab eventKey="Doanh thu" title="Doanh thu" className={cx('title-tab')}>
            Doanh thu
          </Tab>
        </Tabs>
      </div>
    )
}
export default StatisticsBus