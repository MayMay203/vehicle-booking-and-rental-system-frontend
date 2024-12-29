import styles from './Offer.module.scss'
import classNames from 'classnames/bind'
import OfferItem from './OfferItem'
import { MenuBack, MenuNext } from '../Icon'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Voucher from '../Voucher'

const cx = classNames.bind(styles)
function OfferList({ dataList, voucher, className }) {
  const [index, setIndex] = useState(0)
  const [number, setNumber] = useState(3)

  const isSm = useMediaQuery({ query: '(max-width: 767.98px)' })
  const isMd = useMediaQuery({ query: '(min-width: 768px) and (max-width: 991.98px)' })

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
      {voucher &&
        dataList.map((voucher) => (
          <div
            style={
              index !== 0 ? { transform: `translateX(calc(${index * 100}% - calc(${-index * 12}px)))` } : undefined
            }
            className={cx('offer-item', 'voucher-item')}
            key={voucher.id}
          >
            <Voucher data={voucher} />
          </div>
        ))}
      {!voucher &&
        dataList.map((item, indexArr) => (
          <OfferItem
            key={indexArr}
            style={
              index !== 0 ? { transform: `translateX(calc(${index * 100}% - calc(${-index * 12}px)))` } : undefined
            }
            className={cx('offer-item')}
            title={item.title}
            price={item.price}
            link={item.link}
            src={item.src}
            voucher={voucher}
          />
        ))}
      {dataList.length > 3 && index < 0 && (
        <button className={cx('btn', 'btn-back')} onClick={handleBack}>
          <MenuBack />
        </button>
      )}
      {dataList.length > number && -1 * index < dataList.length - number && (
        <button className={cx('btn', 'btn-next')} onClick={handleNext}>
          <MenuNext />
        </button>
      )}
    </div>
  )
}
export default OfferList
