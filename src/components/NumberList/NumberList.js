import NumberItem from './NumberItem';

function NumberList() {
    return (
      <div className='row gy-5 row-cols-1 row-cols-sm-2 row-cols-lg-3 justify-content-lg-around row-cols-xl-4'>
        <NumberItem title={'Nhà xe chất lượng cao'} number={'100+'} />
        <NumberItem title={'Tuyến đường'} number={'100+'} />
        <NumberItem title={'Hợp tác cùng phát triển'} number={'500+'} />
        <NumberItem title={'Giao dịch thanh toán thành công'} number={'100+'} />
      </div>
    )
}

export default NumberList;