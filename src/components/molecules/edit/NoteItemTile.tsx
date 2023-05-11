import log from 'loglevel'
import { FC, memo } from 'react'
import { NoteItemBar } from './NoteItemBar'
import { NoteItemContent } from './NoteItemContent'
import { NoteItemAdds } from './NoteItemAdds'
import { useNoteItemContext } from './NoteItemProvider'
import { useNoteItemsContext, useEdittingContext } from './NoteItemsProvider'
import Colors from '../../../consts/colors'
import Prop from '../../../consts/props'

export const NoteItemTile: FC = memo(() => {
  log.setLevel('debug')
  const { name, editable, isOptions } = useNoteItemsContext()
  const { editting, setEditting } = useEdittingContext()
  const { noteItem: editElem, index } = useNoteItemContext()
  const shouldEdit = () => {
    if (editElem.type === 'link' && editElem.link === '') {
      return true
    } else if (editElem.type === 'image' && editElem.image_path === '') {
      return true
    } else if (editElem.type === 'textarea' && editElem.text === '') {
      return true
    }
    return false
  }
  const id = name + '_' + index
  if (!editElem.type || editElem.type === '') {
    if (isOptions) {
      editElem.type = Prop.NoteItemType.OPTION
    } else if ('text' in editElem) {
      editElem.type = Prop.NoteItemType.TEXTAREA
    } else if ('link' in editElem) {
      editElem.type = Prop.NoteItemType.LINK
    } else if ('image_path' in editElem) {
      editElem.type = Prop.NoteItemType.IMAGE
    }
  }
  if (editable) {
    if (!editting && shouldEdit()) {
      setEditting(true)
    }
  }
  return (
    <div key={id} className={Colors.baseBg} title="NoteBlockContent">
      {editable && editting && index === 0 && <NoteItemAdds index={-1} />}
      <div className="border-gray-600 pt-0">
        {editting && <NoteItemBar />}
        <NoteItemContent />
      </div>
      {editable && editting && <NoteItemAdds index={index} />}
    </div>
  )
})
