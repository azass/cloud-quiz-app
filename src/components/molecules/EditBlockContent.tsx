import { VFC, memo, useContext, useState } from 'react'
import { TrashIcon } from '@heroicons/react/outline'
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
    const on = () => {
      return editElem.quest_ids?.includes(editContext.quest_id) || false
    }
    return (
      <div key={id} className={color.bgColor} title="EditBlockContent">
        {editable && editting && index === 0 && (
          <EditElemAdds index={-1} name={name} onClickAdd={onClickAdd} />
        )}
        {/* <ul className="transform transition-transform border-gray-600 my-4"> */}
        <div className="border-gray-600 pt-2">
          {enableEdit && (
            <div className="flex justify-between items-center">
              <div className="flex">
                <div className="flex">
                  {name === 'description_for_question' && (
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      checked={on()}
                      onChange={(e) => onChangeCheck(index)}
                    />
                  )}
                  {name !== 'explanation' && name !== 'options' && (
                    <select
                      className={`ml-8 w-10 h-5`}
                      onChange={(e) => onChangeText(index, 'lv', e.target.value)}
                      value={editElem.lv}
                      title={name}
                    >
                      {["1", "2", "3", "4"].map((i) => (
                        <option value={`${i}`}>{`${i}`}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
              <div className="flex flex-row pr-3 gap-4">
                <TrashIcon
                  className={`h-6 w-6 ${color.iconColor} cursor-pointer hover:text-blue-500`}
                  onClick={() => onClickDelete(index)}
                />
              </div>
            </div>
          )}
          <div className={`${editElem.lv && `pl-${(Number(editElem.lv) - 1) * 4}`} `}>
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
                editable={editable}
                editting={editting}
                on={on()}
              />
            )}
            {editElem.type === EditElemType.LINK && (
              <EditElemLinkMemo
                editElem={editElem}
                index={index}
                onChangeText={onChangeText}
                editable={editable}
                editting={editting}
                on={on()}
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
          </div>
        </div>
        {editable && editting && (
          <EditElemAdds index={index} name={name} onClickAdd={onClickAdd} />
        )}
      </div>
    )
  }
)
