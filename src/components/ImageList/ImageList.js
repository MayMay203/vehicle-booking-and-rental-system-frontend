import styles from './ImageList.module.scss'
import classNames from 'classnames/bind'
import 'matchmedia-polyfill'
import 'matchmedia-polyfill/matchMedia.addListener'
import Slider from 'react-slick'
import PropTypes from 'prop-types'

const cx = classNames.bind(styles)

function ImageList({ dataList }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <div className="mt-5 p-5 pt-2">
      <Slider {...settings}>
        {dataList.map((image, index) => (
          <div key={index} className={cx('item')}> {/* Lớp item được áp dụng ở đây */}
            <img className={cx('img')} src={image} alt="car" />
          </div>
        ))}
      </Slider>
    </div>
  )
}

ImageList.propTypes = {
  dataList: PropTypes.array.isRequired,
}

export default ImageList
