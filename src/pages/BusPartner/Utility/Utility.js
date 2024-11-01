import classNames from "classnames/bind"
import styles from './Utility.module.scss'
import Button from "~/components/Button"
import { Image, Table } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { images } from "~/assets/images"
import { faBottleWater, faEdit, faFan, faHammer, faMattressPillow, faTrash } from "@fortawesome/free-solid-svg-icons"
import SearchInput from "~/components/SearchInput"
import TxtSearch from "~/components/TxtSearch"
const cx = classNames.bind(styles)
 function Utility(){
  const listUtilities = [
    { id: 1, img: faBottleWater, name: 'Nước uống', description: 'Nhà xe có phục vụ nước uống cho hành khách.' },
    { id: 2, img: faMattressPillow, name: 'Gối nằm', description: 'Trên xe có trang bị gối nằm.' },
    { id: 3, img: faFan, name: 'Điều hòa', description: 'Trên xe có trang bị điều hòa.' },
    {
      id: 4,
      img: faHammer,
      name: 'Búa phá kính',
      description: 'Dùng để phá kính ô tô thoát hiểm trong trường hợp khẩn cấp..',
    },
    { id: 5, img: faFan, name: 'Điều hòa', description: 'Trên xe có trang bị điều hòa.' },
    { id: 6, img: faMattressPillow, name: 'Gối nằm', description: 'Trên xe có trang bị gối nằm.' },
    { id: 7, img: faFan, name: 'Điều hòa', description: 'Trên xe có trang bị điều hòa.' },
    { id: 8, img: faBottleWater, name: 'Nước uống', description: 'Nhà xe có phục vụ nước uống cho hành khách.' },
    { id: 9, img: faMattressPillow, name: 'Gối nằm', description: 'Trên xe có trang bị gối nằm.' },
    { id: 10, img: faBottleWater, name: 'Nước uống', description: 'Nhà xe có phục vụ nước uống cho hành khách.' },
    { id: 11, img: faBottleWater, name: 'Nước uống', description: 'Nhà xe có phục vụ nước uống cho hành khách.' },
    { id: 12, img: faBottleWater, name: 'Nước uống', description: 'Nhà xe có phục vụ nước uống cho hành khách.' },
  ]
  return (
    <div className="container">
      <div className={cx('header')}>
        <p>Danh sách tiện ích</p>
      </div>
      <div className={cx('d-flex', 'mb-4')}>
        <TxtSearch content={'Tìm tên tiện ích'}></TxtSearch>
        <Button primary className={cx('btn-add')}>
          Thêm tiện ích
        </Button>
      </div>
      <div className="table-container">
        <Table striped bordered hover className="table-container">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên tiện ích</th>
              <th>Mô tả</th>
              <th>Hình ảnh</th>
              <th>Sửa</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody className={cx('body-table')}>
            {listUtilities.map((utility, index) => (
              <tr key={utility.id}>
                <td className="align-middle text-center">
                  <span className={cx('txt', 'text-center')}>{index + 1}</span>
                </td>
                <td className="align-middle">
                  <div className={cx('icon-txt')}>
                    <span className={cx('txt')}>{utility.name}</span>
                  </div>
                </td>
                <td className="align-middle">
                  <div className={cx('icon-txt')}>
                    <span className={cx('txt')}>{utility.description}</span>
                  </div>
                </td>
                <td className="align-items-center text-center">
                  <FontAwesomeIcon icon={utility.img} className={cx('icon-utility')}></FontAwesomeIcon>
                </td>
                <td className="align-middle text-center">
                  <FontAwesomeIcon icon={faEdit} className={cx('icon-edit')}></FontAwesomeIcon>
                </td>
                <td className="align-middle text-center">
                  <FontAwesomeIcon icon={faTrash} className={cx('icon-delete')}></FontAwesomeIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )


 }
 export default Utility