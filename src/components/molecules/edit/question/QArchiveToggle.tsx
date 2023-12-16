import { memo, FC, useState } from 'react'
import { useQuestionContext } from './QuestionProvider'
import { useMutateQuestion } from '../../../../hooks/useMutateQuestion'
import {
  useIsOldContext,
  useQuestionHeaderContext,
} from './QuestionHeaderProvider'
import { Question } from '../../../../types/types'

export const QArchiveToggle: FC = memo(() => {
  const { question } = useQuestionContext()
  const { isOld } = useIsOldContext()
  const { postPutQuestion } = useQuestionHeaderContext()
  const { putQuestionSync } = useMutateQuestion()
  const [saving, setSaving] = useState(false)

  const bgcolor = () => {
    return isOld ? 'bg-rose-700' : ''
  }
  const updateOld = () => {
    setSaving(true)
    putQuestionSync(
      {
        quest_id: question.quest_id,
        is_old: !isOld,
      },
      question,
      postSave
    )
  }
  const postSave = (newQuestion: Question) => {
    setSaving(false)
    postPutQuestion(newQuestion)
  }
  return (
    <div className="flex items-center w-20">
      <button
        type="button"
        className={`flex-shrink-0 w-20 border p-1 text-white ${bgcolor()}`}
      >
        {saving ? (
          <svg
            className={
              `animate-spin h-5 w-5 mx-6 border-4` +
              ` border-blue-500 rounded-full border-t-transparent`
            }
          ></svg>
        ) : (
          <span onClick={() => updateOld()}>アーカイブ</span>
        )}
      </button>
    </div>
  )
})
