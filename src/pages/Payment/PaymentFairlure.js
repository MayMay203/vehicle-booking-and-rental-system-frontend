import {Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import Button from '~/components/Button'
import { config } from '~/config'

function PaymentFailure() {
  const navigate = useNavigate()
  return (
    <Result
      className="mt-5"
      status="error"
      title="Đặt vé không thành công"
      subTitle="Giao dịch của bạn không thành công do đã quá thời hạn thanh toán hoặc xảy ra sự cố mạng. Vui lòng thử lại!"
      extra={
       <div className='d-flex justify-content-center row-gap-3'>
          <Button outline onClick={() => navigate(config.routes.home)} style={{width: '160px'}}>
            Trở về trang chủ
          </Button>,
          <Button primary onClick={() => navigate(config.routes.ticket)} style={{width: '160px'}}>
            Đặt vé lại
          </Button>,
       </div>
      }
    ></Result>
  )
}

export default PaymentFailure
