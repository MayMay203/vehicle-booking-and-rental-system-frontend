import Button from '~/components/Button'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './InforRental.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form'
import Voucher from '../Voucher'
const cx = classNames.bind(styles)
function TimeRental(){
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const [selectedTime, setSelectedTime] = useState(null)
    return (
      <div className="p-0">
        <div className={cx('datetime-rental')}>
          <div className={cx('txt-title')}>Thời gian thuê</div>
          <div className={cx('content-datetime-rental', 'd-flex', 'align-items-center')}>
            <span className={cx('txt-datetime')}>Thời gian nhận:</span>
            <div className={cx('d-flex', 'align-items-center', 'date-time')}>
              <div className={cx('time-rental', 'justify-content-end')}>
                <span className={cx('content-clock', 'txt-datetime')}>
                  {startTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                </span>
                <DatePicker
                  selected={startTime}
                  onChange={(time) => setStartTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="HH:mm"
                  customInput={<FontAwesomeIcon icon={faClock} className={cx('', 'btn-clock')} />}
                />
              </div>

              <div className={cx('date-rental')}>
                <span className={cx('', 'content-calendar', 'txt-datetime')}>
                  {startDate.toLocaleDateString('vi-VN')}
                </span>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  customInput={<FontAwesomeIcon icon={faCalendarDays} className={cx('', 'btn-calendar')} />}
                  calendarClassName={cx('datetime-picker')}
                />
              </div>
            </div>
          </div>
          <div className={cx('content-datetime-rental', 'd-flex', 'align-items-center')}>
            <span className={cx('txt-datetime')}>Thời gian trả: </span>
            <div className={cx('d-flex', 'align-items-center', 'date-time')}>
              <div className={cx('time-rental')}>
                <span className={cx('', 'content-clock', 'txt-datetime')}>
                  {endTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                </span>
                <DatePicker
                  selected={endTime}
                  onChange={(time) => setEndTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="HH:mm"
                  customInput={<FontAwesomeIcon icon={faClock} className={cx('', 'btn-clock')} />}
                />
              </div>

              <div className={cx('date-rental')}>
                <span className={cx('', 'content-calendar', 'txt-datetime')}>
                  {endDate.toLocaleDateString('vi-VN')}
                </span>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="dd/MM/yyyy"
                  customInput={<FontAwesomeIcon icon={faCalendarDays} className={cx('', 'btn-calendar')} />}
                  calendarClassName={cx('datetime-picker')}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={cx('txt-title', 'amount-rental')}>
          <span>Số lượng thuê</span>
          <Form.Select aria-label="Default select example" classNames={cx('select-amount', 'align-right')}>
            {/* <option>Số chiếc thuê</option> */}
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </Form.Select>
        </div>
        <div className={cx('txt-title', 'd-flex')}>
          <span>Phí thuê/1 chiếc</span>
          <span classNames={cx('charge', 'align-right')}>500.000đ</span>
        </div>
        <div className={cx('txt-title', 'd-flex')}>
          <span>Mã giảm giá</span>
        </div>
        <div classNames={cx('voucher')}>
          <Voucher></Voucher>
        </div>
        <div>
          <div className={cx('txt-title')}>Chi phí khác</div>
          <div className={cx('txt-content')}>
            <span>Thuế VAT:</span>
            <span className={cx('align-right')}>200.000đ</span>
          </div>
          <div className={cx('txt-content')}>
            <span>Tiền cọc xe:</span>
            <span className={cx('align-right')}>6.000.000đ</span>
          </div>
          <div className={cx('txt-sub-content')}>
            <span>Tiền cọc xe sẽ được hoàn trả sau khi nhận xe và kiểm tra xe.</span>
          </div>
          <div className={cx('txt-content')}>
            <span>Tiền giữ chỗ:</span>
            <span className={cx('align-right')}>200.000đ</span>
          </div>
          <div className={cx('txt-sub-content')}>
            <span>
              Tiền giữ chỗ sẽ không được hoàn lại nếu huỷ chuyến. Tiền giữ chỗ sẽ được hoàn lại sau khi trả xe.
            </span>
          </div>
          <div className={cx('d-flex justify-content-center', 'txt-content')}>
            <Button primary>Thuê xe</Button>
          </div>
        </div>
      </div>
    )
}
export default TimeRental