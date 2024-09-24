import FeedbackItem from './FeedbackItem';

function FeedbackList() {
    return (
      <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-4 gx-lg-5 row-cols-5 wrapper">
        <FeedbackItem />
        <FeedbackItem />
        <FeedbackItem />
        <FeedbackItem />
      </div>
    )
}

export default FeedbackList;