import classNames from "classnames/bind"
import styles from './AddServiceRental.module.scss'
import FormInforServiceRental from '~/components/FormInforServiceRental'
import { Row } from 'react-bootstrap'
import { useState } from 'react'
import CRUDImage from "~/components/CRUDImage"
import Button from "~/components/Button"
const cx = classNames.bind(styles)
function AddServiceRental(){
   const [formData, setFormData] = useState({
     car_company: '',
     type_vehicle: '',
     car_year: '',
     quantity: '',
     type_service: 'Cả 2 dịch vụ',
     price1: '',
     price2: '',
     price_according: '',
     location: '',
     reduce: '',
     status: '',
     description: '',
     utility: '',
   })
   
   const handleInputChange = () => {
    setFormData()
   }
   const handleSave = () => {

   }
   return (
     <div className="container mb-5 mt-5">
       <div className={cx('header', 'd-flex')}>
         <p className={cx('justify-content-center', 'txt-header')}>Thêm dịch vụ cho thuê xe</p>
       </div>
       <Row className={cx('content-tab')}>
         <FormInforServiceRental formData={formData} handleInputChange={handleInputChange}></FormInforServiceRental>
         <p className={cx('txt', 'padding', 'mb-5')}>Hình ảnh</p>
         <CRUDImage
           initialNumberPhoto={1}
           imagePerRow={4}
           handleSave={handleSave}
           obligatory={true}
           urlImages={['']}
         ></CRUDImage>
       </Row>
       <Row className="d-flex row-cols-6 justify-content-center">
         <Button primary className={cx('btn')}>
           Hủy
         </Button>
         <div></div>
         <Button primary className={cx('btn')}>
           Thêm
         </Button>
       </Row>
     </div>
   )
}
export default AddServiceRental