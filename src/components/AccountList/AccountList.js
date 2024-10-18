import classNames from 'classnames/bind'
import styles from './AccountList.module.scss'
import { images } from '~/assets/images'
import AccountItem from './AccountItem'

const cx = classNames.bind(styles)
function AccountList({type}) {
  const dataList = [
    {
      id: 1,
      avatar: images.noImage,
      name: 'Nguyễn Khánh Quỳnh',
      email: 'khanhquynh@gmail.com',
      phoneNumber: '0884848885',
      gender: 'FEMALE',
      birthDay: '12-12-2003',
      active: true,
    },
    {
      id: 2,
      avatar: images.noImage,
      name: 'Nguyễn Văn Huỳnh',
      email: 'vanhuynh@gmail.com',
      phoneNumber: '0884848885',
      gender: 'MALE',
      birthDay: '12-02-2003',
      active: false,
    },
    {
      id: 3,
      avatar: images.noImage,
      name: 'Nguyễn Khánh Chi',
      email: 'khanhchi@gmail.com',
      phoneNumber: '0884848885',
      gender: 'FEMALE',
      birthDay: '12-12-2003',
      active: true,
    },
    {
      id: 4,
      avatar: images.noImage,
      name: 'Lê Ngọc Hà',
      email: 'lengocha@gmail.com',
      phoneNumber: '0884848885',
      gender: 'FEMALE',
      birthDay: '12-12-2003',
      active: false,
    },
    {
      id: 5,
      avatar: images.noImage,
      name: 'Trần Xuân Quỳnh',
      email: 'tranxuanquynh@gmail.com',
      phoneNumber: '0884848885',
      gender: 'MALE',
      birthDay: '10-12-2003',
      active: true,
    },
  ]

  const filters = dataList.filter(account => {
    if (type === 'accounts') {
      return account.active === true
    } else {
      return account.active === false
    }
  })
  return (
    <div className={cx('wrapper')}>
      {filters.map((account) => (
        <AccountItem key={account.id} data={account} />
      ))}
    </div>
  )
}

export default AccountList
