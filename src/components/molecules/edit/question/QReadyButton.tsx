import { PauseIcon, RssIcon } from '@heroicons/react/solid'
import { memo, FC } from 'react'
import { useQuestionContext } from './QuestionProvider'
import { iconShine } from '../../../../styles/util'
interface Props {
  notReady: boolean
  putQuestion: any
}
export const QReadyButton: FC<Props> = memo(({ notReady, putQuestion }) => {
  const { question } = useQuestionContext()
  const onClickReady = (_notReady: boolean) => {
    putQuestion(
      {
        quest_id: question.quest_id,
        not_ready: _notReady,
      },
      question
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
