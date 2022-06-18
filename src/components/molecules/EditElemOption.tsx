import { VFC, memo, useContext } from 'react'
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
  lang: number
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
    lang
  }) => {
    log.setLevel("info")
    log.debug('<EditElemOption>')
    const textareaToggle = ('text' in editElem)
    const imageToggle = ('image_path' in editElem)
    log.debug(`${editElem.correct}`)
    const color = useContext(ColorContext)
    const getBgColor = () => {
      return `h-5 w-5 mx-4 ${color.iconColor} cursor-pointer hover:text-blue-500`
    }
    return (
      <>
        {showCheckbox && (
          <div className={`flex px-4 ${editting ? '-mt-3' : 'pt-2'} space-x-1`}>
            <input
              type="checkbox"
              checked={editElem.correct}
              onChange={(e) => onChangeCheck(index)}
              className={`mt-2`}
            />
            <input
              type="text"
              value={editElem.mark}
              disabled={editElem.mark !== undefined}
              className={`w-12 px-3 text-lg ${color.bgColor} ${color.baseText}`}
            />
          </div>
        )}
        {textareaToggle && (
          <EditElemTextarea
            editElem={editElem}
            index={index}
            onChangeText={onChangeText}
            lang={lang}
            editable={true}
            editting={editting}
            on={false}
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
        )}
      </>
    )
  }
)
