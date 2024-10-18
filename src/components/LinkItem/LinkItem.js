import { Link } from 'react-router-dom';
import styles from './LinkItem.module.scss'
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { memo } from 'react';

const cx = classNames.bind(styles)
function LinkItem({ title, to, Icon, className }) {
  let Component = Link
  if (!to) {
    Component = 'div'
  }
  return (
    <Component to={to} className={cx('link',[className])}>
      {Icon}
      {title}
    </Component>
  )
}

LinkItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  Icon: PropTypes.node.isRequired,
}
export default memo(LinkItem);