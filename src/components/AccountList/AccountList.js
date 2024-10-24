import classNames from 'classnames/bind'
import styles from './AccountList.module.scss'
import AccountItem from './AccountItem'
import PropTypes from 'prop-types';

const cx = classNames.bind(styles)
function AccountList({ dataList }) {
  return (
    <div className={cx('wrapper')}>
      {dataList.map((account) => (
        <AccountItem key={account.accountInfo.id} data={account.accountInfo} />
      ))}
    </div>
  )
}

AccountList.propTypes = {
  dataList: PropTypes.array.isRequired
}

export default AccountList
