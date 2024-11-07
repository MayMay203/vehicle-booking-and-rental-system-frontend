import PartnerItem from "./PartnerItem";
import styles from './PartnersList.module.scss'
import classNames from "classnames/bind";

const cx = classNames.bind(styles)
function PartnersList({dataList}) {
    return (
      <div className={cx('wrapper')}>
        {dataList.map((partner) => (
          <PartnerItem key={partner.businessInfo.id} data={partner} />
        ))}
      </div>
    )
}

export default PartnersList;