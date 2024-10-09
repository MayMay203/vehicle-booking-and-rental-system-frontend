import classNames from 'classnames/bind'
import styles from './BookingVehicleCard.module.scss'
import BookingVehicleCard from './BookingVehicleCard'
import React, { useState } from 'react'
const cx = classNames.bind(styles)
function BookingVehicleList() {
  const car = 'car';
  const two_wheeler = 'two_wheeler';
  const electric_bike = 'electric_bike';

  const [active, setActive] = useState(null);
  const handleSelectVehicle = (id) =>{
    setActive(id);
  }
  return (
    <div className={cx('row', 'justify-content-center')}>
      <BookingVehicleCard
        id={1}
        type={car}
        isActive={active===1}
        onClick={() => handleSelectVehicle(1)}
      ></BookingVehicleCard>
      <BookingVehicleCard
        id={2}
        type={two_wheeler}
        isActive={active===2}
        onClick={() => handleSelectVehicle(2)}
      ></BookingVehicleCard>
      <BookingVehicleCard
        id={3}
        type={electric_bike}
        isActive={active===3}
        onClick={() => handleSelectVehicle(3)}
      ></BookingVehicleCard>
      <BookingVehicleCard
        id={4}
        type={car}
        isActive={active===4}
        onClick={() => handleSelectVehicle(4)}
      ></BookingVehicleCard>
      <BookingVehicleCard
        id={5}
        type={two_wheeler}
        isActive={active===5}
        onClick={() => handleSelectVehicle(5)}
      ></BookingVehicleCard>
      <BookingVehicleCard
        id={6}
        type={electric_bike}
        isActive={active===6}
        onClick={() => handleSelectVehicle(6)}
      ></BookingVehicleCard>
    </div>
  )
}
export default BookingVehicleList
