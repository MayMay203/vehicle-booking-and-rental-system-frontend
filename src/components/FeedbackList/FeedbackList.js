import FeedbackItem from './FeedbackItem';
function FeedbackList() {
    return (
      <div className="row gy-5 row-cols-1 row-cols-lg-2 gx-lg-5 wrapper">
        <FeedbackItem />
        <FeedbackItem />
        <FeedbackItem />
        <FeedbackItem />
      </div>
    )
}

export default FeedbackList;