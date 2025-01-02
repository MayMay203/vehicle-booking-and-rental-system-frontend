import classNames from 'classnames/bind'
import styles from './AddBusTrip.module.scss'
import Button from '~/components/Button'
import { Col, Form, Modal, Row } from 'react-bootstrap'
import AddManyItems from '~/components/AddManyItems'
import AddManyDropOffLocation from '~/components/AddManyDropOffLocation'
import { getLocations } from '~/apiServices/getLocations'
import { useEffect, useState } from 'react'
import { getLongitudeLatitude } from '~/apiServices/getLongitudeLatitude'
import { getDurationDistance } from '~/apiServices/busPartner/getDurationDistance'
import { useDispatch } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { convertTimeFormat } from '~/utils/convertTimeFormat'
import { toast } from 'react-toastify'
import { addBusTrip } from '~/apiServices/busPartner/addBusTrip'
import { addDropOffLocations } from '~/apiServices/busPartner/addDropOffLocations'
import { fetchAllBusTrips } from '~/redux/slices/busPartnerSlice'
const cx = classNames.bind(styles)
function AddBusTrip({ closeModal, ...props }) {
  const dispatch = useDispatch()
  const [activeAdd, setActiveAdd] = useState(false)
  const [formData, setFormData] = useState({
    departure: '',
    destination: '',
    duration: '',
  })
  const [initialItem, setInitialItem] = useState({
    value: formData.destination || '',
    duration: formData.duration || '',
    price: '',
    dropOffs: [''],
    id: 1,
  })
  const [pickupLocations, setPickupLocations] = useState([''])
  const [provincesList, setProvincesList] = useState([])
  const [listDropOffs, setListDropOffs] = useState([initialItem])
  useEffect(() => {
    setInitialItem((prev) => ({
      ...prev,
      value: formData.destination || '',
      duration: formData.duration || '',
    }))
  }, [formData.duration, formData.destination])
  useEffect(() => {
    const allFieldsFilled =
      Object.values(formData).every((value) => value.toString().trim() !== '') &&
      pickupLocations.some((item) => item !== '') &&
      listDropOffs.every(
        (item) =>
          item.value.toString().trim() !== '' &&
          item.duration.toString().trim() !== '' &&
          item.price.toString().trim() !== '' &&
          item.dropOffs.every((dropOff) => dropOff.trim() !== ''),
      )
    setActiveAdd(allFieldsFilled)
  }, [formData, pickupLocations, listDropOffs])
  const handleInputChange = (e) => {
    const { name, value } = e.target

    const updatedFormData = {
      ...formData,
      [name]: value,
    }

    if (
      (name === 'departure' || name === 'destination') &&
      updatedFormData.departure === updatedFormData.destination &&
      updatedFormData.destination !== ''
    ) {
      toast.error('Vui lòng nhập địa điểm xuất phát và địa điểm đến không trùng nhau!', {
        autoClose: 2000,
        toasposition: 'top-center',
      })
      return
    }

    setFormData(updatedFormData)
    console.log(updatedFormData)
  }

  useEffect(() => {
    async function fetchApi() {
      const provices = await getLocations(1)
      if (provices) {
        const cleanedProvinces = provices
          .map((province) => {
           const cleanedName = province.name.replace(/^(Thành phố|Tỉnh)\s+/i, '') // Loại bỏ tiền tố "Thành phố" hoặc "Tỉnh"
           return {
             ...province,
             name: cleanedName === 'Hồ Chí Minh' ? `TP ${cleanedName}` : cleanedName, // Thêm "TP" nếu là Hồ Chí Minh
           }
          })
          .sort((a, b) => a.name.localeCompare(b.name)) // Sắp xếp theo bảng chữ cái
        setProvincesList(cleanedProvinces)
      }
    }
    fetchApi()
  }, [])
  const getDurationOfTwoProvinces = async () => {
    try {
      const dep = await getLongitudeLatitude(formData.departure)
      const des = await getLongitudeLatitude(formData.destination)
      console.log('dep:', dep)
      console.log('des:', des)

      console.log('dep--:', dep[0].lon)
      console.log('des--:', des[0].lon)
      if (dispatch(checkLoginSession())) {
        const response = await getDurationDistance(dep[0].lon, dep[0].lat, des[0].lon, des[0].lat)
        return response
      }
    } catch (error) {
      console.log('Lỗi:', error)
    }
  }
  console.log('setPickupLocations', pickupLocations)
  useEffect(() => {
    // Kiểm tra session login chỉ một lần trong useEffect
    const checkSessionAndGetDuration = async () => {
      if (dispatch(checkLoginSession())) {
        if (formData.departure && formData.destination) {
          const response = await getDurationOfTwoProvinces()
          if (response) {
            console.log('vào -- response:', response)
            setFormData((prev) => ({ ...prev, duration: response.duration }))
          }
        }
      }
    }

    checkSessionAndGetDuration()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.departure, formData.destination])
  const handleAddBusTrip = async () => {
    if (dispatch(checkLoginSession())) {
      const formDataBusTrip = {
        departureLocation: formData.departure,
        arrivalLocation: formData.destination,
        pickupLocations: pickupLocations,
      }

      try {
        const response = await addBusTrip(formDataBusTrip)
        const idNewBusTrip = response.busTripInfo.id
        console.log('idNewBusTrip', idNewBusTrip)

        console.log('listDropOffs:', listDropOffs)

        for (const item of listDropOffs) {
          const response2 = await addDropOffLocations({
            busTripId: idNewBusTrip,
            province: item.value,
            dropOffLocations: item.dropOffs,
            priceTicket: item.price,
            journeyDuration: item.duration,
          })
          console.log('Response for drop-off:', response2)
        }

        toast.success('Thêm chuyến xe thành công', {
          autoClose: 2000,
          position: 'top-center',
        })

        closeModal()

       dispatch(fetchAllBusTrips({ dep: '', des: '' }))
        console.log('có vô--- nè:')
      } catch (error) {
        if (error === 'This bus trip already exists') {
          toast.error('Chuyến xe đã tồn tại', {
            autoClose: 1800,
            position: 'top-center',
          })
        } else {
          toast.error('Có lỗi xảy ra', {
            autoClose: 2000,
            position: 'top-center',
          })
        }
        console.error('Error:', error)
      }
    }
  }

  return (
    <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className={cx('title-modal', 'w-100', 'text-center')}>
          Thêm chuyến xe
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mt-4">
          <Col>
            <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput1">
              <Form.Label className="mb-3">
                Địa điểm xuất phát<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                aria-label="departure"
                name="departure"
                value={formData.departure}
                onChange={handleInputChange}
                className={cx('txt', 'selectbox', 'add-item')}
              >
                <option key={-1}>Chọn tỉnh/thành phố</option>
                {provincesList.map((province, index) => (
                  <option key={index} value={province.name}>
                    {province.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput2">
              <Form.Label className="mb-3">
                Địa điểm đến<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                aria-label="destination"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                className={cx('txt', 'selectbox', 'add-item')}
              >
                <option key={-1}>Chọn tỉnh/thành phố</option>
                {provincesList.map((province, index) => (
                  <option key={index} value={province.name}>
                    {province.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput3">
              <Form.Label className="mb-3">
                Thời gian di chuyển<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                aria-label="duration"
                name="duration"
                value={convertTimeFormat(formData?.duration)}
                className={cx('txt', 'selectbox', 'add-item')}
                disabled
              >
                {/* {provinces.map((province, index) => (
                  <option key={index} value={province.value}>
                    {province.label}
                  </option>
                ))} */}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        {/* <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput3">
          <Form.Label className="mb-3">
            Địa điểm đón khách<span className="text-danger">*</span>
          </Form.Label>
          <AddManyItems initialItems={initialDepartures}></AddManyItems>
        </Form.Group> */}
        <AddManyItems
          initialItems={[{ value: '', id: 1 }]}
          setLocations={setPickupLocations}
          content={'Địa điểm đón khách'}
        ></AddManyItems>
        <div className={cx('line')}></div>
        {/* <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput3">
          <Form.Label className="mb-3">
            Địa điểm trả khách<span className="text-danger">*</span>
          </Form.Label> */}
        <AddManyDropOffLocation
          provincesList={provincesList}
          setListDropOffs={setListDropOffs}
          departure={formData.departure}
          initialItems={initialItem}
        ></AddManyDropOffLocation>
        {/* </Form.Group> */}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center align-items-center">
        <div className="row w-100">
          <Col></Col>
          <div className="col d-flex justify-content-center">
            <Button outline className={cx('btn')}>
              Hủy
            </Button>
          </div>
          <div className="col d-flex justify-content-center">
            <Button primary outline className={cx('btn')} disabled={!activeAdd} onClick={handleAddBusTrip}>
              Thêm
            </Button>
          </div>
          <Col></Col>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
export default AddBusTrip
