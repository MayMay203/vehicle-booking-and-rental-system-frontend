import classNames from 'classnames/bind'
import styles from './RatingContent.module.scss'
import { Row, Col } from 'react-bootstrap'
import RatingContent from './RatingContent'
const cx = classNames.bind(styles)
function RatingContentList() {
  return (
    <div>
      <RatingContent></RatingContent>
      <RatingContent></RatingContent>
      <RatingContent></RatingContent>
      <RatingContent></RatingContent>
    </div>
  )
}
export default RatingContentList
