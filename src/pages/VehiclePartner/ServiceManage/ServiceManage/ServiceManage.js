import classNames from "classnames/bind"
import styles from './ServiceManage.module.scss'
import { Col, Row } from "react-bootstrap"
import Button from "~/components/Button"
import { useState } from "react"
import TableListRentalService from "~/components/TableListRentalService/TableListRentalService"
// import { useNavigate } from "react-router-dom"
import AddServiceRental from "../AddServiceRental"
const cx = classNames.bind(styles)
function ServiceManage(){
    const [typeService, setTypeService] = useState(2)
    const [activeTypeFilter, setActiveTypeFilter] = useState('all')
    const [modalAddService, setModalAddService] = useState(false)
    const handleTypeFilterClick = (btnType) => {
      setActiveTypeFilter(btnType)
      setTypeService(btnType === 'all' ? 2 : btnType === 'manned' ? 1 : 0)
    }
    console.log("type service:", typeService)
    // const navigate = useNavigate()
    const handleAddService = () => {
      // navigate('add-service-rental')
      setModalAddService(true)
    }
    return (
      <div className="container">
        <Row className="mt-4 justify-content-center align-items-center">
          <div className={cx('header', 'd-flex')}>
            <p className={cx('justify-content-center', 'txt-header')}>Danh sách dịch vụ cho thuê xe</p>
          </div>
        </Row>
        <Row className="mt-4 justify-content-center align-items-center mb-5">
          <Col xs="10" className="p-2 align-items-center justify-content-center">
            <div className={cx('type-filter-container')}>
              <Button
                rounded
                className={cx('type-filter', { active: activeTypeFilter === 'all' })}
                onClick={() => handleTypeFilterClick('all')}
              >
                Tất cả
              </Button>

              <Button
                rounded
                className={cx('type-filter', { active: activeTypeFilter === 'manned' })}
                onClick={() => handleTypeFilterClick('manned')}
              >
                Thuê xe có người lái
              </Button>

              <Button
                rounded
                className={cx('type-filter', { active: activeTypeFilter === 'self-driving' })}
                onClick={() => handleTypeFilterClick('self-driving')}
              >
                Thuê xe tự lái
              </Button>
            </div>
          </Col>
          <Col xs="2" className="d-flex justify-content-end p-2">
            <Button primary onClick={handleAddService}>
              Thêm dịch vụ
            </Button>
          </Col>
        </Row>
        <TableListRentalService typeService={typeService}></TableListRentalService>
        <div className="mb-5 mt-5"></div>
        <AddServiceRental
          // enableEdit={true}
          // functionModal={'add'}
          show={modalAddService}
          onHide={() => setModalAddService(false)}
        ></AddServiceRental>
      </div>
    )
}
export default ServiceManage