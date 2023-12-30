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
  const { noteItem, index } = useNoteItemContext()
  const shouldEdit = () => {
    if (noteItem.type === 'link' && noteItem.link === '') {
      return true
    } else if (noteItem.type === 'image' && noteItem.image_path === '') {
      return true
    } else if (noteItem.type === 'textarea' && noteItem.text === '') {
      return true
    }
    return false
  }
  const id = name + '_' + index
  if (!noteItem.type || noteItem.type === '') {
    if (isOptions) {
      noteItem.type = Prop.NoteItemType.OPTION
    } else if ('text' in noteItem) {
      noteItem.type = Prop.NoteItemType.TEXTAREA
    } else if ('link' in noteItem) {
      noteItem.type = Prop.NoteItemType.LINK
    } else if ('image_path' in noteItem) {
      noteItem.type = Prop.NoteItemType.IMAGE
    }
  }
  if (editable) {
    if (!editting && shouldEdit()) {
      setEditting(true)
    }
  }
  return (
    <div key={id} className={Colors.baseBg} title="NoteItemTile">
      {editting && index === 0 && <NoteItemAdds index={-1} />}
      <div className="border-gray-600 pt-0">
        {editting && <NoteItemBar />}
        <NoteItemContent />
      </div>
      {editting && <NoteItemAdds index={index} />}
    </div>
  )
})
