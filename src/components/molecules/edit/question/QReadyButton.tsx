import { PauseIcon, RssIcon } from '@heroicons/react/solid'
import { memo, FC, useState } from 'react'
import { useQuestionContext } from './QuestionProvider'
import { iconShine } from '../../../../styles/util'
import {
  useEditQuestionContext,
  useNotReadyContext,
} from './EditQuestionHeader'
import { useMutateQuestion } from '../../../../hooks/useMutateQuestion'
import { Question } from '../../../../types/types'

export const QReadyButton: FC = memo(() => {
  const { question } = useQuestionContext()
  const { notReady } = useNotReadyContext()
  const { postPutQuestion } = useEditQuestionContext()
  const { putQuestionSync } = useMutateQuestion()
  const [saving, setSaving] = useState(false)

  const onClickReady = (_notReady: boolean) => {
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
    <>
      {saving ? (
        <div
          className={
            `animate-spin h-7 w-7 border-4` +
            ` border-blue-500 rounded-full border-t-transparent`
          }
        ></div>
      ) : (
        <>
          {notReady ? (
            <PauseIcon
              className={`h-7 w-8 mt-1 cursor-pointer text-pink-500`}
              onClick={() => onClickReady(!notReady)}
            />
          ) : (
            <RssIcon
              className={`h-7 w-8 mt-1 ${iconShine}`}
              onClick={() => onClickReady(!notReady)}
            />
          )}
        </>
      )}
    </>
  )
})
