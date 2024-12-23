import styles from './RentingOffer.module.scss'
import classNames from 'classnames/bind';
import RentingOfferItem from './RentingOfferItem';
import { images } from '~/assets/images';

const cx = classNames.bind(styles)
function RentingOfferList() {
    return (
      <div className={cx('row gy-5 justify-content-center row-cols-lg-3', 'wrapper')}>
        <RentingOfferItem title={'Thuê xe máy tự lái'} src={images.renting} />
        <RentingOfferItem title={'Thuê xe ô tô tự lái'} src={images.rentalCar} />
        <RentingOfferItem title={'Thuê xe có người lái'} src={images.rentalCarTravel} />
      </div>
    )
}

export default RentingOfferList;