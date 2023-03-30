import log from 'loglevel'
import { VFC, memo, useContext, useState } from 'react'
import { EditElem, EditElemType } from '../../../types/types'
import { ColorContext } from '../../../App'
import { useAppSelector } from '../../../app/hooks'
import { selectEditContext } from '../../../slices/editSlice'
import { EditBlockContentBar } from './EditBlockContentBar'
import { EditBlockContentBody } from './EditBlockContentBody'
import { EditElemAdds } from './EditElemAdds'
import { EditContext } from './EditContext'
import { EditElemContext } from './EditElemContext'

interface Props {
  editElem: EditElem
  name: string
  index: number
  editable: boolean
  enableEdit: boolean
}

export const EditBlockContent: VFC<Props> = memo(
  ({
    editElem,
    name,
    index,
    editable,
    enableEdit,
  }) => {
    log.setLevel('debug')
    const color = useContext(ColorContext)
    const editContext = useAppSelector(selectEditContext)
    const { add } = useContext(EditContext)
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
    const value = {
      editElem, name, index, editable, editting, on
    }
    return (
      <EditElemContext.Provider value={value}>
        <div key={id} className={color.bgColor} title="EditBlockContent">
          {editable && editting && index === 0 && (
            <EditElemAdds index={-1} name={name} onClickAdd={add} />
          )}
          <div className="border-gray-600 pt-2">
            {enableEdit && (
              <EditBlockContentBar />
            )}
            <EditBlockContentBody />
          </div>
          {editable && editting && (
            <EditElemAdds index={index} name={name} onClickAdd={add} />
          )}
        </div>
      </EditElemContext.Provider>
    )
  }
)
