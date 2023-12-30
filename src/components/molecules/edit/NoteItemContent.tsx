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
  const { noteItem } = useNoteItemContext()
  const lv = noteItem?.lv
  return (
    <div className={`${lv && `pl-${(Number(lv) - 1) * 4}`}`}>
      {noteItem?.type === Prop.NoteItemType.OPTION && <NoteOption />}
      {noteItem?.type === Prop.NoteItemType.SELECT && <NoteSelect />}
      {noteItem?.type === Prop.NoteItemType.TEXTAREA && <NoteTextarea />}
      {noteItem?.type === Prop.NoteItemType.LINK && <NoteLink />}
      {noteItem?.type === Prop.NoteItemType.IMAGE && <NoteImage />}
      {noteItem?.type === Prop.NoteItemType.TEXTBOX && <NoteTextbox />}
    </div>
  )
})
