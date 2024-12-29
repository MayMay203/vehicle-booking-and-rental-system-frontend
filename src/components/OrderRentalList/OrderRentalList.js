import OrderRentalItem from './OrderRentalItem'
function OrderRentalList({ status, dataList }) {
  console.log('list order rental in user--dataList--:', dataList)
  return (
    <div>
      {dataList?.map((item, index) => (
        <OrderRentalItem key={index} status={status} data={item} />
      ))}
    </div>
  )
}


export default OrderRentalList
