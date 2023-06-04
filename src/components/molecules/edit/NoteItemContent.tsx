import { memo, FC } from 'react'
import { NoteImage } from './NoteImage'
import { NoteOption } from './NoteOption'
import { NoteTextarea } from './NoteTextarea'
import { NoteTextbox } from './NoteTextbox'
import { useNoteItemContext } from './NoteItemProvider'
import { NoteLink } from './NoteLink'
import Prop from '../../../consts/props'
import { NoteSelect } from './NoteSelect'

export const NoteItemContent: FC = memo(() => {
  const { noteItem: editElem } = useNoteItemContext()
  const lv = editElem?.lv
  return (
    <div className={`${lv && `pl-${(Number(lv) - 1) * 4}`}`}>
      {editElem?.type === Prop.NoteItemType.OPTION && (
        <NoteOption />
      )}
      {editElem?.type === Prop.NoteItemType.SELECT && (
        <NoteSelect />
      )}
      {editElem?.type === Prop.NoteItemType.TEXTAREA && (
        <NoteTextarea />
      )}
      {editElem?.type === Prop.NoteItemType.LINK && <NoteLink />}
      {editElem?.type === Prop.NoteItemType.IMAGE && <NoteImage />}
      {editElem?.type === Prop.NoteItemType.TEXTBOX && <NoteTextbox />}
    </div>
  )
})