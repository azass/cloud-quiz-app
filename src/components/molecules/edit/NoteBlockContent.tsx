import log from 'loglevel'
import { FC, memo } from 'react'
import { NoteBlockContentBar } from './NoteBlockContentBar'
import { NoteBlockContentBody } from './NoteBlockContentBody'
import { NoteItemAdds } from './NoteItemAdds'
import { useNoteItemContext } from './NoteItemProvider'
import { useNoteItemsContext, useEdittingContext } from './NoteItemsProvider'
import Colors from '../../../consts/colors'
import Prop from '../../../consts/props'

export const NoteBlockContent: FC = memo(() => {
  log.setLevel('debug')
  const { name, editable } = useNoteItemsContext()
  const { editting, setEditting } = useEdittingContext()
  const { editElem, index } = useNoteItemContext()
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
  // const [editting, setEditting] = useState(shouldEdit())
  const id = name + '_' + index
  if (!editElem.type || editElem.type === '') {
    if (name === 'options') {
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
    // } else {
    //   if (editting !== editting) {
    //     setEditting(editting)
    //   }
    }
  }
  return (
    <div key={id} className={Colors.baseBg} title="EditBlockContent">
      {editable && editting && index === 0 && <NoteItemAdds index={-1} />}
      <div className="border-gray-600 pt-2">
        {editting && <NoteBlockContentBar />}
        <NoteBlockContentBody />
      </div>
      {editable && editting && <NoteItemAdds index={index} />}
    </div>
  )
})
