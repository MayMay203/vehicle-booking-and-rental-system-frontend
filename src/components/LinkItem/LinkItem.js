import { Link } from 'react-router-dom';
import styles from './LinkItem.module.scss'
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { memo } from 'react';

const cx = classNames.bind(styles)
function LinkItem({ title, to, Icon }) {
  return (
    <Link to={to} className={cx('link')}>
      {Icon}
      {title}
    </Link>
  )
}

LinkItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  Icon: PropTypes.node.isRequired,
}
export default memo(LinkItem);