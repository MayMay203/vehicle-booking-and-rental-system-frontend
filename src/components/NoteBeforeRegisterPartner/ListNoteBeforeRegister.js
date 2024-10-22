import classNames from 'classnames/bind'
import styles from './NoteBeforeRegister.module.scss'
import NoteBeforeRegister from './NoteBeforeRegister'
const cx = classNames.bind(styles)
function ListNoteBeforeRegister({ notes, styletxt , style_margin}) {
  return (
    <div className={cx('list-item', style_margin)}>
      {notes.map((note) => (
        <NoteBeforeRegister
          key={note.id}
          content={note.content}
          sub_contents={note.sub_contents}
          icon={note.icon}
          styletxt={styletxt}
          style_margin={style_margin}
        ></NoteBeforeRegister>
      ))}
    </div>
  )
}
export default ListNoteBeforeRegister
