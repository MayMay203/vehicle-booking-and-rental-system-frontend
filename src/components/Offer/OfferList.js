import styles from './Offer.module.scss'
import classNames from 'classnames/bind'
import OfferItem from './OfferItem'
import { MenuBack, MenuNext } from '../Icon'
import { useState } from 'react'

const cx = classNames.bind(styles)
function OfferList({ title, price, link, amount, className }) {
  const [index, setIndex] = useState(0)
  const handleBack = () => {
    setIndex((prev) => prev + 1)
  }

  const handleNext = () => {
   setIndex((prev) => prev - 1)
  }

  console.log('re-render')
  console.log(index)

  return (
    <div className={cx('wrapper', [className])}>
      <OfferItem
        style={index !== 0 ? { transform: `translateX(calc(${index * 100}% - calc(${-index*12}px)))` } : undefined}
        className={cx('offer-item')}
        title={title}
        price={price}
        link={link}
      />
      <OfferItem
        style={index !== 0 ? { transform: `translateX(calc(${index * 100}% - calc(${-index*12}px)))` } : undefined}
        className={cx('offer-item')}
        title={title}
        price={price}
        link={link}
      />
      <OfferItem
        style={index !== 0 ? { transform: `translateX(calc(${index * 100}% - calc(${-index*12}px)))` } : undefined}
        className={cx('offer-item')}
        title={title}
        price={price}
        link={link}
      />

      <OfferItem
        style={index !== 0 ? { transform: `translateX(calc(${index * 100}% - calc(${-index*12}px)))` } : undefined}
        className={cx('offer-item')}
        title={title}
        price={price}
        link={link}
      />
      <OfferItem
        style={index !== 0 ? { transform: `translateX(calc(${index * 100}% - calc(${-index*12}px)))` } : undefined}
        className={cx('offer-item')}
        title={title}
        price={price}
        link={link}
      />

      {amount > 3 && index < 0 && (
        <button className={cx('btn', 'btn-back')} onClick={handleBack}>
          <MenuBack />
        </button>
      )}
      {amount > 3 && -1 * index < amount - 3 && (
        <button className={cx('btn', 'btn-next')} onClick={handleNext}>
          <MenuNext />
        </button>
      )}
    </div>
  )
}
export default OfferList
