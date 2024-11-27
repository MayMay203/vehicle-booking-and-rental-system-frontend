import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { config } from '~/config'

function PaymentFailure() {
  const navigate = useNavigate()
  return (
    <Result
      className="mt-5"
      status="error"
      title="Đặt vé không thành công"
      subTitle="Giao dịch của bạn không thành công do đã quá thời hạn thanh toán hoặc xảy ra sự cố mạng. Vui lòng thử lại!"
      extra={[
        <Button type="primary" key="console" onClick={() => navigate(config.routes.home)}>
          Trở về trang chủ
        </Button>,
        <Button key="buy" onClick={() => navigate(config.routes.ticket)}>
          Đặt vé lại
        </Button>,
      ]}
    ></Result>
  )
}

export default PaymentFailure
