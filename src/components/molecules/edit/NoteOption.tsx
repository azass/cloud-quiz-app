import log from 'loglevel'
import { FC, memo } from 'react'
import { NoteTextarea } from './NoteTextarea'
import { NoteImage } from './NoteImage'
import { useNoteItemContext } from './NoteItemProvider'
import { useNoteItemsContext, useEdittingContext } from './NoteItemsProvider'
import { useShowCheckboxContext } from './question/QuestionProvider'
import Colors from '../../../consts/colors'

export const NoteOption: FC = memo(() => {
  log.setLevel('info')
  const { showCheckbox } = useShowCheckboxContext()
  const { changeCheck } = useNoteItemsContext()
  const { editting } = useEdittingContext()
  const { noteItem, index } = useNoteItemContext()
  const textareaToggle = 'text' in noteItem
  const imageToggle = 'image_path' in noteItem
  return (
    <div className="flex pl-2">
      {showCheckbox && (
        <div className={`flex w-14 ${editting ? '-mt-3' : 'pt-2'} space-x-1`}>
          <input
            type="checkbox"
            checked={noteItem.correct}
            onChange={(e) => changeCheck(index)}
            className={`mt-2 ${Colors.shining} bg-sky-500`}
          />
          <input
            type="text"
            value={noteItem.mark}
            disabled={noteItem.mark !== undefined}
            className={`w-12 px-3 text-lg ${Colors.baseBg} ${Colors.strong}`}
          />
        </div>
      )}
      <div className="w-full">
        {textareaToggle && <NoteTextarea />}
        {imageToggle && <NoteImage />}
      </div>
    </div>
  )
})
