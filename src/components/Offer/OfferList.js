import styles from './Offer.module.scss'
import classNames from 'classnames/bind'
import OfferItem from './OfferItem'
import { MenuBack, MenuNext } from '../Icon'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

const cx = classNames.bind(styles)
function OfferList({ title, price, link, amount, src, voucher, className }) {
  const [index, setIndex] = useState(0)
  const [number, setNumber] = useState(3)

  const isSm = useMediaQuery({ query: '(max-width: 767.98px)' })
  const isMd = useMediaQuery({ query: '(min-width: 768px) and (max-width: 991.98px)' })
  console.log(number)

  useEffect(() => {
    if (isSm) {
      setNumber(1)
    } else if (isMd) {
      setNumber(2)
    } else {
      setNumber(3)
    }
  }, [isSm, isMd])

  const handleBack = () => {
    setIndex((prev) => prev + 1)
  }

  const handleNext = () => {
    setIndex((prev) => prev - 1)
  }

  return (
    <div className={cx('wrapper', [className])}>
      <OfferItem
        style={index !== 0 ? { transform: `translateX(calc(${index * 100}% - calc(${-index * 12}px)))` } : undefined}
        className={cx('offer-item')}
        title={title}
        price={price}
        link={link}
        src={src}
        voucher={voucher}
      />
      <OfferItem
        style={index !== 0 ? { transform: `translateX(calc(${index * 100}% - calc(${-index * 12}px)))` } : undefined}
        className={cx('offer-item')}
        title={title}
        price={price}
        link={link}
        src={src}
        voucher={voucher}
      />
      <OfferItem
        style={index !== 0 ? { transform: `translateX(calc(${index * 100}% - calc(${-index * 12}px)))` } : undefined}
        className={cx('offer-item')}
        title={title}
        price={price}
        link={link}
        src={src}
        voucher={voucher}
      />

      <OfferItem
        style={index !== 0 ? { transform: `translateX(calc(${index * 100}% - calc(${-index * 12}px)))` } : undefined}
        className={cx('offer-item')}
        title={title}
        price={price}
        link={link}
        src={src}
        voucher={voucher}
      />
      <OfferItem
        style={index !== 0 ? { transform: `translateX(calc(${index * 100}% - calc(${-index * 12}px)))` } : undefined}
        className={cx('offer-item')}
        title={title}
        price={price}
        link={link}
        src={src}
        voucher={voucher}
      />

      {amount > 3 && index < 0 && (
        <button className={cx('btn', 'btn-back')} onClick={handleBack}>
          <MenuBack />
        </button>
      )}
      {amount > number && -1 * index < amount - number && (
        <button className={cx('btn', 'btn-next')} onClick={handleNext}>
          <MenuNext />
        </button>
      )}
    </div>
  )
}
export default OfferList
