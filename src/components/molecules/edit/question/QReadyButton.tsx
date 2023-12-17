import { memo, FC, useState } from 'react'
import { useQuestionContext } from './QuestionProvider'
import { useMutateQuestion } from '../../../../hooks/useMutateQuestion'
import { Question } from '../../../../types/types'
import {
  useIsOldContext,
  useNotReadyContext,
  useQuestionHeaderContext,
} from './QuestionHeaderProvider'

interface Props {
  w: string
  text_size: string
}
export const QReadyButton: FC<Props> = memo(({ w, text_size }) => {
  const { question } = useQuestionContext()
  const { notReady } = useNotReadyContext()
  const { postPutQuestion } = useQuestionHeaderContext()
  const { putQuestionSync } = useMutateQuestion()
  const [saving, setSaving] = useState(false)
  const { isOld } = useIsOldContext()

  const bgcolor = () => {
    return notReady ? 'bg-pink-500' : isOld ? '' : 'bg-green-500'
  }
  const title = () => {
    return notReady ? '準備中' : 'アクティブ'
  }
  const onClickReady = (_notReady: boolean) => {
    if (isOld) return
    setSaving(true)
    putQuestionSync(
      {
        quest_id: question.quest_id,
        not_ready: _notReady,
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
    <div className="flex items-center">
      <button
        type="button"
        className={
          `flex-shrink-0 border p-1 text-white` +
          ` ${w} ${text_size} ${bgcolor()}`
        }
      >
        {saving ? (
          <svg
            className={
              `animate-spin h-5 w-5 mx-6 border-4` +
              ` border-blue-500 rounded-full border-t-transparent`
            }
          ></svg>
        ) : (
          <span onClick={() => onClickReady(!notReady)}>{title()}</span>
        )}
      </button>
    </div>
  )
})
