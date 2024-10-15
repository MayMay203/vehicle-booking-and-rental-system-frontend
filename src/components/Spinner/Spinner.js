import { ScaleLoader } from 'react-spinners'
import classNames from 'classnames/bind'
import styles from './Spinner.module.scss'
import { useGlobalModal } from '~/Context/GlobalModalProvider'

const cx = classNames.bind(styles)
function Spinner() {
  const { isOpenGlobalModal } = useGlobalModal()
  return (
    <div className={cx('loading-container', { show: isOpenGlobalModal.loading })}>
      <ScaleLoader color="#d34714" loading={isOpenGlobalModal.loading} width={5} height={50} />
    </div>
  )
}

export default Spinner
