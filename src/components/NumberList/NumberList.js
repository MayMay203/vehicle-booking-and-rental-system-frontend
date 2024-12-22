import NumberItem from './NumberItem';

function NumberList({numberList}) {
    return (
      <div className='row gy-5 row-cols-1 row-cols-sm-2 row-cols-lg-3 justify-content-lg-around row-cols-xl-4'>
        <NumberItem title={'Nhà xe chất lượng cao'} number={numberList[0]} />
        <NumberItem title={'Tuyến đường'} number={numberList[1]} />
        <NumberItem title={'Hợp tác cùng phát triển'} number={numberList[2]} />
        <NumberItem title={'Giao dịch thanh toán thành công'} number={numberList[3]} />
      </div>
    )
}

export default NumberList;