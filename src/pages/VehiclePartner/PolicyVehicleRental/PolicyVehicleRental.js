import classNames from "classnames/bind"
import styles from './PolicyVehicleRental.module.scss'
const cx = classNames.bind(styles)
function PolicyVehicleRental(){
    const initialPolicies = [
      { value: 'Không làm ồn, gây mất trật tự trên xe', id: 0 },
      { value: 'Không hút thuốc, uống rượu, sử dụng chất kích thích trên xe', id: 1 },
      { value: 'Có mặt tại văn phòng/quầy vé/bến xe trước 30 phút để làm thủ tục lên xe', id: 2 },
      { value: 'Không mang đồ ăn, thức ăn có mùi lên xe', id: 3 },
      { value: 'Không vứt rác trên xe', id: 4 },
      { value: 'Không mang giày, dép trên xe', id: 5 },
      { value: 'Xuất trình SMS/Email đặt vé trước khi lên xe', id: 6 },
      { value: 'Không mang các vật dễ cháy nổ lên xe', id: 7 },
      { value: 'Trẻ em dưới 5 tuổi hoặc dưới 100 cm được miễn phí vé nếu ngồi cùng ghế/giường với bố mẹ', id: 8 },
    ]

    const [policies, setPolicies] = useState(initialPolicies)
    const [policyCounter, setPolicyCounter] = useState(policies.length)
    console.log('ban đầu:', policyCounter)
    const [modeEdit, setModeEdit] = useState(false)
    const hasEmptyPolicy = policies.some((policy) => policy.value.trim() === '')
    const handleAddPolicy = () => {
      setPolicies((prevState) => [...prevState, { value: '', id: policyCounter + 1 }])
      setPolicyCounter(policyCounter + 1)
      console.log('add:', policyCounter)
    }

    const handleRemovePolicy = (id) => {
      setPolicies((prevState) => prevState.filter((policy) => policy.id !== id))
      console.log('remove:', policyCounter)
    }

    const handlePolicyChange = (e, id) => {
      const { value } = e.target
      setPolicies((prevState) => prevState.map((policy) => (policy.id === id ? { ...policy, value } : policy)))
      console.log('change:', policyCounter)
    }
    const handleTurnOnEditMode = () => {
      setModeEdit(true)
    }
    const handleTurnOffEditMode = () => {
      setModeEdit(false)
    }
    const handleAdd = () => {}
    const handleCancel = () => {
      setPolicies(initialPolicies)
    }
    return (
      <div className="container mt-4 mb-5">
        <div className={cx('header')}>
          <p>Danh sách chính sách</p>
        </div>
        <div className="mt-3 mb-4 d-flex align-items-center">
          <TxtSearch content={'Tìm tên chính sách..'}></TxtSearch>
          <div className="d-flex ms-auto align-items-center">
            <span className={cx('txt-mode', { 'txt-green': modeEdit })}>Chế độ chỉnh sửa</span>
            {!modeEdit ? (
              <FontAwesomeIcon
                icon={faToggleOff}
                className={cx('icon-off')}
                onClick={handleTurnOnEditMode}
              ></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon
                icon={faToggleOn}
                className={cx('icon-on', { 'cursor-disabled': hasEmptyPolicy })}
                onClick={!hasEmptyPolicy ? handleTurnOffEditMode : undefined}
              ></FontAwesomeIcon>
            )}
          </div>
        </div>
        {policies.map((policy, index) => (
          <div className={cx('d-flex')} key={policy.id}>
            <div className={cx('serial-number')}>{index + 1}</div>
            <Form.Control
              type="text"
              placeholder={`Nhập chính sách ${index + 1} `}
              value={policy.value}
              onChange={(e) => handlePolicyChange(e, policy.id)}
              className={cx('txt')}
              disabled={!modeEdit}
            />
            {modeEdit && (
              <FontAwesomeIcon
                icon={faSquareMinus}
                className={cx('add-policy', 'ms-2')}
                onClick={() => handleRemovePolicy(policy.id)}
              />
            )}
          </div>
        ))}
        {modeEdit && (
          <div className="d-flex">
            <FontAwesomeIcon icon={faSquarePlus} className={cx('add-policy')} onClick={handleAddPolicy} />
            {hasEmptyPolicy && (
              <Alert variant="danger" className={cx('warn', 'text-center')}>
                Không được để trống!
              </Alert>
            )}
          </div>
        )}
        {modeEdit && (
          <Row className="justify-content-center mt-4">
            <Col></Col>
            <Col className="d-flex justify-content-center">
              <Button outline className={cx('ms-5 me-5', 'btn')} onClick={handleCancel}>
                Hủy
              </Button>
              <Button primary className={cx('ms-5 me-5', 'btn')} disabled={hasEmptyPolicy} onClick={handleAdd}>
                Cập nhật
              </Button>
            </Col>
            <Col></Col>
          </Row>
        )}
      </div>
    )
}
export default PolicyVehicleRental