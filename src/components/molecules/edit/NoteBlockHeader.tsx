import { EyeIcon } from '@heroicons/react/outline'
import { CheckCircleIcon, PencilAltIcon } from '@heroicons/react/solid'
import { memo, FC } from 'react'
import {
  useNoteItemsContext,
  useEdittingContext,
  useShowAllQuestionCaseContext,
  useShowCheckboxContext,
} from './NoteItemsProvider'
import {
  iconBase,
  iconHover,
  iconShine,
  strongText,
} from '../../../styles/util'
interface Props {
  title: string
}
export const NoteBlockHeader: FC<Props> = memo(({ title }) => {
  const { name } = useNoteItemsContext()
  const { editting, setEditting } = useEdittingContext()
  const { showCheckbox, setShowCheckbox } = useShowCheckboxContext()
  const { showAllQuestionCase, setShowAllQuestionCase } =
    useShowAllQuestionCaseContext()

  const onClickEye = () => {
    if (name === 'options') {
      setShowCheckbox(!showCheckbox)
    } else if (name === 'case_items') {
      setShowAllQuestionCase(!showAllQuestionCase)
    }
  }
  return (
    <div className={`flex items-center gap-2 my-4 ${strongText}`}>
      {title}
      {(name === 'options' || name === 'case_items') && (
        <EyeIcon
          className={`w-4 h-4 ml-4 ${iconHover}`}
          onClick={() => onClickEye()}
        />
      )}
      <div>
        {editting ? (
          <CheckCircleIcon
            className={`h-6 w-6 ml-8 ${iconShine}`}
            onClick={() => setEditting(!editting)}
          />
        ) : (
          <PencilAltIcon
            className={`h-5 w-5 ml-8 ${iconBase}`}
            onClick={() => setEditting(!editting)}
          />
        )}
      </div>
    </div>
  )
})
