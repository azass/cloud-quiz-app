import { VFC, memo, useState, useContext } from 'react'
import { EditElem } from '../../types/types'
import { EditElemTextarea } from './EditElemTextarea'
import { EditElemImage } from './EditElemImage'
import { DocumentAddIcon, PhotographIcon } from '@heroicons/react/solid'
import { ColorContext } from '../../App'
import log from 'loglevel'

interface Props {
  editElem: EditElem
  index: number
  onClickAdd: any
  onChangeText: any
  onChangeCheck: any
  showCheckbox?: boolean
  editting: boolean
}
export const EditElemOption: VFC<Props> = memo(
  ({
    editElem,
    index,
    onClickAdd,
    onChangeText,
    onChangeCheck,
    showCheckbox,
    editting,
  }) => {
    log.setLevel("info")
    log.debug('<EditElemOption>')
    const [textareaToggle, setTextareaToggle] = useState('text' in editElem)
    const [imageToggle, setImageToggle] = useState('image_path' in editElem)
    log.debug(`${editElem.correct}`)
    const color = useContext(ColorContext)
    const getBgColor = () => {
      return 'h-5 w-5 mx-4 text-gray-700 cursor-pointer hover:text-blue-500'
    }
    return (
      <>
        <li>
          <div className="flex px-4 -mt-4 space-x-1">
            {showCheckbox && (
              <input
                type="checkbox"
                checked={editElem.correct}
                onChange={(e) => onChangeCheck(index)}
                className={`mt-2`}
              />
            )}
            <input
              type="text"
              value={editElem.mark}
              disabled={editElem.mark !== undefined}
              className={`w-12 px-3 text-lg ${color.bgColor} ${color.baseText}`}
            />
          </div>
        </li>
        {textareaToggle && (
          <EditElemTextarea
            editElem={editElem}
            index={index}
            onChangeText={onChangeText}
          />
        )}
        {imageToggle && (
          <EditElemImage
            editElem={editElem}
            index={index}
            onChangeText={onChangeText}
            editable={true}
            editting={editting}
          />
        )}
        {editting && (
          <li>
            <div className="flex flex-row-reverse pr-8 py-2 space-x-8 ">
              <PhotographIcon
                className={getBgColor()}
                onClick={() => {
                  onClickAdd(index, 'image')
                }}
              />
              <DocumentAddIcon
                className={getBgColor()}
                onClick={() => {
                  onClickAdd(index, 'textarea')
                }}
              />
            </div>
          </li>
        )}
      </>
    )
  }
)
