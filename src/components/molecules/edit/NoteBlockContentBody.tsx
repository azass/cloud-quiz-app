import { memo, FC } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectLang } from '../../../slices/editSlice'
import { NoteImage } from './NoteImage'
import { NoteOption } from './NoteOption'
import { NoteTextarea } from './NoteTextarea'
import { NoteTextbox } from './NoteTextbox'
import { useNoteItemContext } from './NoteItemProvider'
import { useNoteItemsContext } from './NoteItemsProvider'
import { NoteLink } from './NoteLink'
import Prop from '../../../consts/props'

export const NoteBlockContentBody: FC = memo(() => {
  const nowLang = useAppSelector(selectLang)
  const { name } = useNoteItemsContext()
  const { editElem } = useNoteItemContext()
  const lv = editElem?.lv
  return (
    <div className={`${lv && `pl-${(Number(lv) - 1) * 4}`}`}>
      {editElem?.type === Prop.NoteItemType.OPTION && (
        <NoteOption lang={nowLang} />
      )}
      {editElem?.type === Prop.NoteItemType.TEXTAREA && (
        <NoteTextarea lang={name === 'question_items' ? nowLang : 1} />
      )}
      {editElem?.type === Prop.NoteItemType.LINK && <NoteLink />}
      {editElem?.type === Prop.NoteItemType.IMAGE && <NoteImage />}
      {editElem?.type === Prop.NoteItemType.TEXTBOX && <NoteTextbox />}
    </div>
  )
})
