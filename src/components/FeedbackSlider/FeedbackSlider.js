import Slider from "react-slick";
import FeedbackItem from "../FeedbackList/FeedbackItem";
import classNames from "classnames/bind";
import styles from './FeedbackSlider.module.scss'

const cx = classNames.bind(styles)
function FeedbackSlider({ dataList, handleComment }) {
    const isSmallList = dataList.length < 3; 

    const settings = {
      dots: true,
      slidesToShow: isSmallList ? 2 : 2, // Hiển thị tối đa 2 phần tử
      slidesToScroll: isSmallList ? 1 : 2, // Cuộn từng phần tử nếu danh sách nhỏ
      rows: isSmallList ? 1 : 2, // Hiển thị 1 hàng nếu danh sách nhỏ
      infinite: false,
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
            {dataList.map((feedback, index) => (
                <FeedbackItem
                    key={index}
                    data={feedback}
                    className="pt-4"
                    handleComment={handleComment}
                />
            ))}
        </Slider>
    );
}

export default FeedbackSlider;