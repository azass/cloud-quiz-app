import { PauseIcon, RssIcon } from '@heroicons/react/solid'
import { memo, FC, useState } from 'react'
import { useQuestionContext } from './QuestionProvider'
import { iconShine } from '../../../../styles/util'
import { useMutateQuestion } from '../../../../hooks/useMutateQuestion'
import { Question } from '../../../../types/types'
import {
  useIsOldContext,
  useNotReadyContext,
  useQuestionHeaderContext,
} from './QuestionHeaderProvider'

export const QReadyButton: FC = memo(() => {
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
          <span onClick={() => onClickReady(!notReady)}>{title()}</span>
        )}
      </button>
    </div>
  )
})
