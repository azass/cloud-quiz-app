import { VFC, memo, useContext, useState } from 'react'
import { TrashIcon } from '@heroicons/react/solid'
import { EditElem, EditElemType } from '../../types/types'
import { EditElemTextarea } from './EditElemTextarea'
import { EditElemLinkMemo } from './EditElemLink'
import { EditElemImage } from './EditElemImage'
import { EditElemAdds } from '../atoms/EditElemAdds'
import { EditElemOption } from './EditElemOption'
import { ColorContext } from '../../App'
import { PencilAltIcon } from '@heroicons/react/outline'

interface Props {
  editElem: EditElem
  name: string
  index: number
  onClickAdd: any
  onClickDelete: any
  onChangeText: any
  onChangeCheck: any
  hiddenCheckbox?: boolean
  editable: boolean
}

export const EditBlock: VFC<Props> = memo(
  ({
    editElem,
    name,
    index,
    onClickAdd,
    onClickDelete,
    onChangeText,
    onChangeCheck,
    hiddenCheckbox,
    editable,
  }) => {
    console.log('EditBlock start!')
    console.log(index)
    console.log(editElem)
    const color = useContext(ColorContext)
    const [editting, setEditting] = useState(false)
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
    return (
      <div key={id} className={color.bgColor}>
        <ul className="transform transition-transform border-gray-600 pt-4">
          {editable && (
            <li className="flex flex-row-reverse pr-3">
              <div className="flex flex-row gap-4">
                <PencilAltIcon
                  className="h-5 w-5 text-gray-700 cursor-pointer hover:text-blue-500"
                  onClick={() => setEditting(!editting)}
                />
                <TrashIcon
                  className="h-5 w-5 text-gray-700 cursor-pointer hover:text-blue-500"
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
              hiddenCheckbox={hiddenCheckbox}
              editting={editting}
            />
          )}
          {editElem.type === EditElemType.TEXTAREA && (
            <EditElemTextarea
              editElem={editElem}
              index={index}
              onChangeText={onChangeText}
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