import log from 'loglevel'
import { VFC, memo, useContext, useState } from 'react'
import { EditElem, EditElemType } from '../../types/types'
import { EditElemAdds } from '../atoms/EditElemAdds'
import { ColorContext } from '../../App'
import { useAppSelector } from '../../app/hooks'
import { selectEditContext } from '../../slices/editSlice'
import { EditBlockContentBar } from './EditBlockContentBar'
import { EditBlockContentBody } from './EditBlockContentBody'

interface Props {
  editElem: EditElem
  name: string
  index: number
  onClickAdd: any
  onClickDelete: any
  onChangeText: any
  onChangeCheck: any
  onSelectCase?: any
  showCheckbox?: boolean
  editable: boolean
  enableEdit: boolean
}

export const EditBlockContent: VFC<Props> = memo(
  ({
    editElem,
    name,
    index,
    onClickAdd,
    onClickDelete,
    onChangeText,
    onChangeCheck,
    onSelectCase,
    showCheckbox,
    editable,
    enableEdit,
  }) => {
    log.setLevel('debug')
    const color = useContext(ColorContext)
    const editContext = useAppSelector(selectEditContext)
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
    const [editting, setEditting] = useState(shouldEdit())
    const id = name + '_' + index
    if (!editElem.type || editElem.type === '') {
      if (name === 'options') {
        editElem.type = EditElemType.OPTION
      } else if ('text' in editElem) {
        editElem.type = EditElemType.TEXTAREA
      } else if ('link' in editElem) {
        editElem.type = EditElemType.LINK
      } else if ('image_path' in editElem) {
        editElem.type = EditElemType.IMAGE
      }
    }

    if (!editting && shouldEdit()) {
      setEditting(true)
    } else {
      if (editting !== enableEdit) {
        setEditting(enableEdit)
      }
    }
    const on = () => {
      return editElem.quest_ids?.includes(editContext.quest_id) || false
    }
    return (
      <div key={id} className={color.bgColor} title="EditBlockContent">
        {editable && editting && index === 0 && (
          <EditElemAdds index={-1} name={name} onClickAdd={onClickAdd} />
        )}
        <div className="border-gray-600 pt-2">
          {enableEdit && (
            <EditBlockContentBar
              editElem={editElem}
              name={name}
              index={index}
              onClickDelete={onClickDelete}
              onChangeText={onChangeText}
              onChangeCheck={onChangeCheck}
              onSelectCase={onSelectCase}
              on={on}
            />
          )}
          <EditBlockContentBody
            editElem={editElem}
            name={name}
            index={index}
            onClickAdd={onClickAdd}
            onChangeText={onChangeText}
            onChangeCheck={onChangeCheck}
            showCheckbox={showCheckbox}
            editable={editable}
            editting={editting}
            on={on}
          />
        </div>
        {editable && editting && (
          <EditElemAdds index={index} name={name} onClickAdd={onClickAdd} />
        )}
      </div>
    )
  }
)
