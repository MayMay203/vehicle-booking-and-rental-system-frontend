import Slider from "react-slick";
import FeedbackItem from "../FeedbackList/FeedbackItem";

function FeedbackSlider() {
    const settings = {
      dot: true,
      slideToShow: 2,
      slideToScroll: 2,
      rows: 2,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1, 
            slidesToScroll: 1,
            rows: 1,
          },
        },
      ],
    }
    return (
      <Slider {...settings} className='mt-5' >
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