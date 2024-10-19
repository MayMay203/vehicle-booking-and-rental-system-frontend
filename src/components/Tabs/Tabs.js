import Slider from 'react-slick/lib/slider';
import styles from './Tabs.module.scss'
import classNames from 'classnames/bind';
import { memo } from 'react';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles)
function Tabs({ tabList, settings, handleClickTab, type, className }) {
  return (
    <Slider {...settings} className={cx('mt-5', { [className]: className })}>
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
  settings: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default memo(Tabs);