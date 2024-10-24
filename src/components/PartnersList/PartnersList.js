import PartnerItem from "./PartnerItem";
import styles from './PartnersList.module.scss'
import classNames from "classnames/bind";

const cx = classNames.bind(styles)
function PartnersList() {
    const dataList = [
      {
        id: 1,
        businessName: 'Công ty TNHH Vận Tải Minh Tâm',
        nameOfRepresentative: 'Phạm Minh Tâm',
        emailOfRepresentative: 'minhtamvt@gmail.com',
        phoneOfRepresentative: '0987654321',
        address: '102 Nguyễn Văn Linh, Đà Nẵng',
        avatar: 'https://vehiclerentalbookingsystem.s3.ap-southeast-2.amazonaws.com/avatar1.jpg',
        approvalStatus: 'CANCELED',
      },
      {
        id: 2,
        businessName: 'Công ty TNHH Vận Tải Minh Tâm 2',
        nameOfRepresentative: 'Phạm Minh Tâm',
        emailOfRepresentative: 'minhtamvt@gmail.com',
        phoneOfRepresentative: '0987654321',
        address: '102 Nguyễn Văn Linh, Đà Nẵng',
        avatar: 'https://vehiclerentalbookingsystem.s3.ap-southeast-2.amazonaws.com/avatar1.jpg',
        approvalStatus: 'CANCELED',
      },
      {
        id: 3,
        businessName: 'Công ty TNHH Vận Tải Minh Tâm',
        nameOfRepresentative: 'Phạm Minh Tâm',
        emailOfRepresentative: 'minhtamvt@gmail.com',
        phoneOfRepresentative: '0987654321',
        address: '102 Nguyễn Văn Linh, Đà Nẵng',
        avatar: 'https://vehiclerentalbookingsystem.s3.ap-southeast-2.amazonaws.com/avatar1.jpg',
        approvalStatus: 'CANCELED',
      },
    ]
    return (<div className={cx('wrapper')}>
        {
            dataList.map(partner => (
                <PartnerItem key={partner.id} data={partner}/>
            ))
       }
    </div> );
}

export default PartnersList;