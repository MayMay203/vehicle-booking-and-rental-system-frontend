import styles from './Menu.module.scss'
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles)
function Menu({children}) {
    return (<div className={cx('wrapper')}>
        {children}
    </div> );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired
}

export default Menu