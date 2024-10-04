import { NavLink } from 'react-router-dom'
import styles from './Menu.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types';
import Menu from './Menu';

const cx = classNames.bind(styles)
function MenuItem({menu}) {
  return (
    <NavLink
      className={(nav) => {
        return cx('menu-item', { active: nav.isActive })
      }}
      to={menu.to}
    >
      {menu.content}
    </NavLink>
  )
}

Menu.propTypes = {
  menu: PropTypes.object
}
export default MenuItem
