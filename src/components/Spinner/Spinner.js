import { ScaleLoader } from 'react-spinners'
import classNames from 'classnames/bind'
import styles from './Spinner.module.scss'
import { useSelector } from 'react-redux'

const cx = classNames.bind(styles)
function Spinner() {
  const showLoading = useSelector((state)=>state.generalModal.loading.isOpen)
  return (
    <div className={cx('loading-container', { show: showLoading })}>
      <ScaleLoader color="#d34714" loading={showLoading} width={5} height={50} />
    </div>
  )
}

export default Spinner
