import { FC, memo, useContext } from 'react'
import { EditElemTextarea } from './EditElemTextarea'
import { EditElemImage } from './EditElemImage'
import { DocumentAddIcon, PhotographIcon } from '@heroicons/react/solid'
import { ColorContext } from '../../../App'
import log from 'loglevel'
import { useEditElemContext } from './EditElemProvider'
import {
  useEditElemsContext,
  useEnableEditContext,
  useShowCheckboxContext,
} from './EditElemsProvider'

interface Props {
  lang: number
}
export const EditElemOption: FC<Props> = memo(({ lang }) => {
  log.setLevel('info')
  const color = useContext(ColorContext)
  const { showCheckbox } = useShowCheckboxContext()
  const { add, changeCheck } = useEditElemsContext()
  const { enableEdit } = useEnableEditContext()
  const { editElem, index } = useEditElemContext()
  const textareaToggle = 'text' in editElem
  const imageToggle = 'image_path' in editElem
  const getBgColor = () => {
    return `h-5 w-5 mx-4 ${color.iconColor} cursor-pointer hover:text-blue-500`
  }
  return (
    <>
      <div className="flex">
        {showCheckbox && (
          <div
            className={`flex w-14 ${enableEdit ? '-mt-3' : 'pt-2'} space-x-1`}
          >
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
        <div className="w-full">
          {textareaToggle && <EditElemTextarea lang={lang} />}
          {imageToggle && <EditElemImage />}
        </div>
      </div>
      {enableEdit && (
        <div className="flex flex-row-reverse pr-8 py-2 space-x-8 ">
          <PhotographIcon
            className={getBgColor()}
            onClick={() => add(index, 'image')}
          />
          <DocumentAddIcon
            className={getBgColor()}
            onClick={() => add(index, 'textarea')}
          />
        </div>
      )}
    </>
  )
})
