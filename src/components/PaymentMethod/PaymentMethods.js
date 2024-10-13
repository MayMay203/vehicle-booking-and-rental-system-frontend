import classNames from 'classnames/bind'
import styles from './PaymentMethod.module.scss'
import React, { useState } from 'react'
import { Col } from 'react-bootstrap'
import PaymentMethod from './PaymentMethod'
const cx = classNames.bind(styles)
function PaymentMethods() {
  const cash = 'cash'
  const credit_card = 'credit_card'

  const [active, setActive] = useState(null)
  const handleSelectPayment = (id) => {
    setActive(id)
  }
  return (
    <div className={cx('row', 'justify-content-center')}>
      <Col lg="6" xs="12">
        <PaymentMethod
          id={1}
          type={cash}
          isActive={active === 1}
          onClick={() => handleSelectPayment(1)}
        ></PaymentMethod>
      </Col>
      <Col lg="6" xs="12">
        <PaymentMethod
          id={2}
          type={credit_card}
          isActive={active === 2}
          onClick={() => handleSelectPayment(2)}
        ></PaymentMethod>
      </Col>
    </div>
  )
}
export default PaymentMethods
