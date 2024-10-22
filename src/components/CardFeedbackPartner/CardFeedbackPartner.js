import styles from './CardFeedbackPartner.module.scss'
import classNames from 'classnames/bind'
import { images } from '~/assets/images'
import Image from 'react-bootstrap/Image'
const cx = classNames.bind(styles)
function CardFeedbackPartner({ name, feedback }) {
  return (
    <div className={cx('card-feedback')}>
      <Image alt="avatar" src={images.avatar} className={cx('img')} roundedCircle></Image>
      <p className={cx('name')}>{name}</p>
      <p className={cx('feedback')}>{feedback}</p>
    </div>
  )
}
export default CardFeedbackPartner