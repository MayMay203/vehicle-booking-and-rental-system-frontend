import Slider from "react-slick";
import FeedbackItem from "../FeedbackList/FeedbackItem";
import classNames from "classnames/bind";
import styles from './FeedbackSlider.module.scss'

const cx = classNames.bind(styles)
function FeedbackSlider() {
    const settings = {
      dot: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      rows: 2,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1, 
            slidesToScroll: 1,
            rows: 1,
          },
        },
      ],
    }
    return (
      <Slider {...settings} className={cx('custom', 'm-auto', 'mt-5')}>
        <FeedbackItem className="pt-4" />
        <FeedbackItem className="pt-4" />
        <FeedbackItem className="pt-4" />
        <FeedbackItem className="pt-4" />
        <FeedbackItem className="pt-4" />
        <FeedbackItem className="pt-4" />
      </Slider>
    )
}

export default FeedbackSlider;