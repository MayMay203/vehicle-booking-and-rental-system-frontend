import FeatureItem from './FeatureItem';
import { CheckedIcon, PaymentIcon, SecurityIcon, TicketFeatIcon } from '../Icon';

function FeatureList() {
    return (
      <div className='row row-cols-sm-1 row-cols-md-2 row-cols-lg-4'>
        <FeatureItem title="Đặt vé dễ dàng" Icon={TicketFeatIcon} />
        <FeatureItem title="Bảo mật thông tin" Icon={SecurityIcon} />
        <FeatureItem title="Chắc chắn có chỗ" Icon={CheckedIcon} />
        <FeatureItem title="Thanh toán đa dạng" Icon={PaymentIcon} />
      </div>
    )
}

export default FeatureList;