import { images } from '~/assets/images'
import UtilityItem from './UtilityItem'
function UtilitiesList() {
  return (
    <div className="p-4 pt-0 mt-5 row row-cols-1 row-cols-lg-2 gx-lg-4 gy-3">
      <UtilityItem
        src={images.chair}
        alt="chair"
        title="Ghế massage"
        desc="Ghế massage giúp cho hành khách thư giãn trong chuyến đi dài"
      />
      <UtilityItem
        src={images.sandal}
        alt="sandel"
        title="Dép"
        desc="Khi  đến trạm dừng chân sẽ có dép của nhà xe cho hành khách xuống xe"
      />
      <UtilityItem
        src={images.beverage}
        alt="beverage"
        title="Nước uống"
        desc="Nhà xe sẽ cung cấp nước uống cho hành khách trong quá trình di chuyển"
      />
      <UtilityItem
        src={images.pillow}
        alt="pillow"
        title="Gối nằm"
        desc="Trên xe sẽ có trang bị gối nằm cho mỗi hành khách"
      />
    </div>
  )
}

export default UtilitiesList
