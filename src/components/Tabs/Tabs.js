import Slider from 'react-slick/lib/slider';
import styles from './Tabs.module.scss'
import classNames from 'classnames/bind';
import { memo } from 'react';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles)
function Tabs({tabList, settings, handleClickTab, type}) {
    return (
        <Slider {...settings} className='mt-5'>
          {tabList.map((tab, index) => (
            <button
              key={index}
              className={cx('tab-item', { active: type === tab.value })}
              onClick={() => handleClickTab(tab.value)}
              >
                  {tab.label}
            </button>
          ))}
        </Slider>
    )
}

Tabs.propTypes = {
    handleClickTab: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    tabList: PropTypes.array.isRequired,
    settings: PropTypes.object.isRequired
}

export default memo(Tabs);