import FeedbackItem from './FeedbackItem';
function FeedbackList({ className }) {
  const classes = `wrapper row gy-5 row-cols-1 row-cols-lg-2 gx-lg-5 ${className}`
    return (
      <div className={classes}>
        <FeedbackItem />
        <FeedbackItem />
        <FeedbackItem />
        <FeedbackItem />
      </div>
    )
}

export default FeedbackList;