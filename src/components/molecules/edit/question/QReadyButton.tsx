import { PauseIcon, RssIcon } from '@heroicons/react/solid'
import { memo, FC } from 'react'
import { useQuestionContext } from './QuestionProvider'
import { iconShine } from '../../../../styles/util'
import { useEditQuestionContext, useNotReadyContext } from './EditQuestionHeader'
import { useMutateQuestion } from '../../../../hooks/useMutateQuestion'
export const QReadyButton: FC = memo(() => {
  const { question } = useQuestionContext()
  const { notReady } = useNotReadyContext()
  const { postPut } = useEditQuestionContext()
  const { putQuestionSync } = useMutateQuestion()
  const onClickReady = (_notReady: boolean) => {
    putQuestionSync(
      {
        quest_id: question.quest_id,
        not_ready: _notReady,
      },
      question,
      postPut
    )
  }
  return (
    <div>
      {notReady ? (
        <PauseIcon
          className={`h-7 w-8 mt-1 ml-5 cursor-pointer text-pink-500`}
          onClick={() => onClickReady(!notReady)}
        />
      ) : (
        <RssIcon
          className={`h-7 w-8 mt-1 ml-5 ${iconShine}`}
          onClick={() => onClickReady(!notReady)}
        />
      )}
    </div>
  )
})
