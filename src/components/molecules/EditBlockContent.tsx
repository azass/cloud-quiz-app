import { VFC, memo, useContext, useState } from 'react'
import { TrashIcon } from '@heroicons/react/solid'
import { EditElem, EditElemType } from '../../types/types'
import { EditElemTextarea } from './EditElemTextarea'
import { EditElemLinkMemo } from './EditElemLink'
import { EditElemImage } from './EditElemImage'
import { EditElemAdds } from '../atoms/EditElemAdds'
import { EditElemOption } from './EditElemOption'
import { ColorContext } from '../../App'
import { useAppSelector } from '../../app/hooks'
import { selectEditContext, selectLang } from '../../slices/editSlice'
import log from 'loglevel'

interface Props {
  editElem: EditElem
  name: string
  index: number
  onClickAdd: any
  onClickDelete: any
  onChangeText: any
  onChangeCheck: any
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
    showCheckbox,
    editable,
    enableEdit,
  }) => {
    log.setLevel('info')
    const color = useContext(ColorContext)
    const editContext = useAppSelector(selectEditContext)
    const nowLang = useAppSelector(selectLang)
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
    return (
      <div key={id} className={color.bgColor} title="EditBlockContent">
        {editable && editting && index === 0 && (
          <EditElemAdds index={-1} name={name} onClickAdd={onClickAdd} />
        )}
        <ul className="transform transition-transform border-gray-600 my-4">
          {editable && (
            <li className="flex justify-between items-center mb-2">
              <div className="flex">
                {name === 'description_for_question' && (
                  <input
                    type="checkbox"
                    checked={
                      editElem.quest_ids
                        ? editElem.quest_ids.includes(editContext.quest_id)
                        : false
                    }
                    onChange={(e) => onChangeCheck(index)}
                  />
                )}
              </div>
              <div className="flex flex-row pr-3 gap-4">
                <TrashIcon
                  className={`h-5 w-5 ${color.iconColor} cursor-pointer hover:text-blue-500`}
                  onClick={() => {
                    onClickDelete(index)
                  }}
                />
              </div>
            </li>
          )}
          {editElem.type === EditElemType.OPTION && (
            <EditElemOption
              editElem={editElem}
              index={index}
              onClickAdd={onClickAdd}
              onChangeText={onChangeText}
              onChangeCheck={onChangeCheck}
              showCheckbox={showCheckbox}
              editting={editting}
              lang={nowLang}
            />
          )}
          {editElem.type === EditElemType.TEXTAREA && (
            <EditElemTextarea
              editElem={editElem}
              index={index}
              onChangeText={onChangeText}
              lang={name === 'question_items' ? nowLang : 1}
            />
          )}
          {editElem.type === EditElemType.LINK && (
            <EditElemLinkMemo
              editElem={editElem}
              index={index}
              onChangeText={onChangeText}
              editable={editable}
              editting={editting}
            />
          )}
          {editElem.type === EditElemType.IMAGE && (
            <EditElemImage
              editElem={editElem}
              index={index}
              onChangeText={onChangeText}
              editable={editable}
              editting={editting}
            />
          )}
        </ul>
        {editable && editting && (
          <EditElemAdds index={index} name={name} onClickAdd={onClickAdd} />
        )}
      </div>
    )
  }
)
