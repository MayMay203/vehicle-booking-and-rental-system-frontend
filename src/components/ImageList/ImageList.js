import { images } from '~/assets/images';
import styles from './ImageList.module.scss'
import classNames from 'classnames/bind';
import Slider from 'react-slick';

const cx = classNames.bind(styles)
function ImageList() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
        <div className='mt-5 p-5 pt-2'>
        <Slider {...settings}>
          <div className={cx('item')}>
            <img className={cx('img')} src={images.trip} alt="car"></img>
          </div>
          <div className={cx('item')}>
            <img className={cx('img')} src={images.trip} alt="car"></img>
          </div>
          <div className={cx('item')}>
            <img className={cx('img')} src={images.renting} alt="car"></img>
          </div>
          <div className={cx('item')}>
            <img className={cx('img')} src={images.renting2} alt="car"></img>
          </div>
        </Slider>
      </div>
    )
}

export default ImageList;