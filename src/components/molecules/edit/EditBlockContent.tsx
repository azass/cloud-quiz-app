import log from 'loglevel'
import { FC, memo, useContext, useState } from 'react'
import { EditElemType } from '../../../types/types'
import { ColorContext } from '../../../App'
import { EditBlockContentBar } from './EditBlockContentBar'
import { EditBlockContentBody } from './EditBlockContentBody'
import { EditElemAdds } from './EditElemAdds'
import { useEditElemContext } from './EditElemProvider'
import { useEditElemsContext, useEnableEditContext } from './EditElemsProvider'

export const EditBlockContent: FC = memo(() => {
  log.setLevel('debug')
  const { name, editable } = useEditElemsContext()
  const { enableEdit } = useEnableEditContext()
  const { editElem, index } = useEditElemContext()
  const color = useContext(ColorContext)
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
  if (editable) {
    if (!editting && shouldEdit()) {
      setEditting(true)
    } else {
      if (editting !== enableEdit) {
        setEditting(enableEdit)
      }
    }
  }
  return (
    <div key={id} className={color.bgColor} title="EditBlockContent">
      {editable && editting && index === 0 && <EditElemAdds index={-1} />}
      <div className="border-gray-600 pt-2">
        {enableEdit && <EditBlockContentBar />}
        <EditBlockContentBody />
      </div>
      {editable && editting && <EditElemAdds index={index} />}
    </div>
  )
})
