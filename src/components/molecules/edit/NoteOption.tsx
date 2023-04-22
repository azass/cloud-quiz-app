import { FC, memo } from 'react'
import { NoteTextarea } from './NoteTextarea'
import { NoteImage } from './NoteImage'
import { DocumentAddIcon, PhotographIcon } from '@heroicons/react/solid'
import log from 'loglevel'
import { useNoteItemContext } from './NoteItemProvider'
import {
  useNoteItemsContext,
  useEdittingContext,
  useShowCheckboxContext,
} from './NoteItemsProvider'
import Colors from '../../../consts/colors'
import { iconBase } from '../../../styles/util'

interface Props {
  lang: number
}
export const NoteOption: FC<Props> = memo(({ lang }) => {
  log.setLevel('info')
  const { showCheckbox } = useShowCheckboxContext()
  const { add, changeCheck } = useNoteItemsContext()
  const { editting } = useEdittingContext()
  const { editElem, index } = useNoteItemContext()
  const textareaToggle = 'text' in editElem
  const imageToggle = 'image_path' in editElem
  const iconStyle = `h-5 w-5 mx-4 ${iconBase}`
  return (
    <>
      <div className="flex">
        {showCheckbox && (
          <div
            className={`flex w-14 ${editting ? '-mt-3' : 'pt-2'} space-x-1`}
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
              className={`w-12 px-3 text-lg ${Colors.baseBg} ${Colors.strong}`}
            />
          </div>
        )}
        <div className="w-full">
          {textareaToggle && <NoteTextarea lang={lang} />}
          {imageToggle && <NoteImage />}
        </div>
      </div>
      {editting && (
        <div className="flex flex-row-reverse pr-8 py-2 space-x-8 ">
          <PhotographIcon
            className={iconStyle}
            onClick={() => add(index, 'image')}
          />
          <DocumentAddIcon
            className={iconStyle}
            onClick={() => add(index, 'textarea')}
          />
        </div>
      )}
    </>
  )
})
