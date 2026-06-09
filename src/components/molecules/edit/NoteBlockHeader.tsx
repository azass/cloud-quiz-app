import { EyeIcon } from '@heroicons/react/outline'
import { CheckCircleIcon, PencilAltIcon } from '@heroicons/react/solid'
import { memo, FC } from 'react'
import { useShowCheckboxContext } from './question/QuestionProvider'
import { useShowAllQuestionCaseContext } from './question/QuestionCaseProvider'
import { useNoteItemsContext, useEdittingContext } from './NoteItemsProvider'
import {
  iconBase,
  iconHover,
  iconShine,
  strongText,
} from '../../../styles/util'
import { QAnswer } from './question/QAnswer'
import { useQuestionContext } from './question/QuestionProvider'

interface Props {
  title: string
}

const AI_OPTIONS = [
  { value: 'bedrock', label: 'Bedrock' },
  { value: 'openai', label: 'OpenAI' },
  { value: 'gemini', label: 'Gemini' },
]
export const NoteBlockHeader: FC<Props> = memo(({ title }) => {
  const { name } = useNoteItemsContext()
  const { editting, setEditting } = useEdittingContext()
  const { showCheckbox, setShowCheckbox } = useShowCheckboxContext()
  const { showAllQuestionCase, setShowAllQuestionCase } =
    useShowAllQuestionCaseContext()
  const { setExplanation } = useQuestionContext()
  const clickEye = () => {
    if (name === 'options') {
      setShowCheckbox(!showCheckbox)
    } else if (name === 'case_items') {
      setShowAllQuestionCase(!showAllQuestionCase)
    }
  }
  return (
    <div className={`flex items-center gap-2 mt-2 mb-1 ${strongText}`}>
      {title}
      {['options', 'case_items'].includes(name) && (
        <EyeIcon
          className={`w-4 h-4 ml-4 ${iconHover}`}
          onClick={() => clickEye()}
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
      {name === 'explanation' && (
        <div className="pl-12" title="AIに説明を生成させる機能">
          <QAnswer
            options={AI_OPTIONS}
            buttonLabel="実行"
            onSuccess={(explanation, selected) => {
              setExplanation(explanation ?? [])
            }}
          />
        </div>
      )}
    </div>
  )
})
