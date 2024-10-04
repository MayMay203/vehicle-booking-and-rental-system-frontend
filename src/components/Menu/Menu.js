import styles from './Menu.module.scss'
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { memo } from 'react';

const cx = classNames.bind(styles)
function Menu({children, className}) {
    return (<div className={cx('wrapper',[className])}>
        {children}
    </div> );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired
}

export default memo(Menu)