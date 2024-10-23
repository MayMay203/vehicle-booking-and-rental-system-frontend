import classNames from "classnames/bind"
import styles from './GuideTakePhoto.module.scss'
import { images } from "~/assets/images"
import { Col, Image } from 'react-bootstrap'
import NoteBeforeRegister from "../NoteBeforeRegisterPartner"
const cx = classNames.bind(styles)
function GuideTakePhoto({type_photo, photos = [], notes}){
    return (
      <div className={cx('row')}>
        <div className={cx('d-flex justify-content-center overflow-none flex-wrap')}>
          {photos.map((photo, index) => (
            <Col key={index} xs={6} className="text-center">
              <Image src={images[photo]} thumbnail className={cx('img')} alt={`Photo ${index}`} />
            </Col>
          ))}
        </div>
        <p className="fs-5 mt-3 text-center">Ảnh chụp mẫu</p>
        <NoteBeforeRegister notes={notes} styletxt={'txt'} style_margin={'margin-top'}></NoteBeforeRegister>
      </div>
    )
}
export default GuideTakePhoto