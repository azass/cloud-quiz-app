import { VFC, memo, useContext } from 'react'
import { EditElemTextarea } from './EditElemTextarea'
import { EditElemImage } from './EditElemImage'
import { DocumentAddIcon, PhotographIcon } from '@heroicons/react/solid'
import { ColorContext } from '../../../App'
import log from 'loglevel'
import { EditContext } from './EditContext'
import { EditElemContext } from './EditElemContext'

interface Props {
  lang: number
}
export const EditElemOption: VFC<Props> = memo(({ lang }) => {
  log.setLevel("info")
  log.debug('<EditElemOption>')
  const color = useContext(ColorContext)
  const { add, changeCheck, showCheckbox } = useContext(EditContext)
  const { editElem, index, editting } = useContext(EditElemContext)
  const textareaToggle = ('text' in editElem)
  const imageToggle = ('image_path' in editElem)
  log.debug(`${editElem.correct}`)
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
            onChange={(e) => changeCheck(index)}
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
        <EditElemTextarea lang={lang} />
      )}
      {imageToggle && (
        <EditElemImage />
      )}
      {editting && (
        <div className="flex flex-row-reverse pr-8 py-2 space-x-8 ">
          <PhotographIcon
            className={getBgColor()}
            onClick={() => {
              add(index, 'image')
            }}
          />
          <DocumentAddIcon
            className={getBgColor()}
            onClick={() => {
              add(index, 'textarea')
            }}
          />
        </div>
      )}
    </>
  )
}
)
