import { memo, FC } from 'react'
import { useQuestionContext } from './QuestionProvider'
import { useEditQuestionContext, useIsOldContext } from './EditQuestionHeader'
import { useMutateQuestion } from '../../../../hooks/useMutateQuestion'

export const QArchiveToggle: FC = memo(() => {
  const { question } = useQuestionContext()
  const { isOld } = useIsOldContext()
  const { postPutQuestion } = useEditQuestionContext()
  const { putQuestionSync } = useMutateQuestion()

  const updateOld = () => {
    putQuestionSync(
      {
        quest_id: question.quest_id,
        is_old: !isOld,
      },
      question,
      postPutQuestion
    )
  }
  return (
    <label className="inline-flex relative items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={!isOld}
        readOnly
      />
      <div
        onClick={() => {
          updateOld()
        }}
        className={
          `w-7 h-4 bg-gray-200 rounded-full` +
          ` peer peer-focus:ring-green-300 peer-checked:after:translate-x-full` +
          ` peer-checked:after:border-white after:content-[''] after:absolute` +
          ` after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300` +
          ` after:border after:rounded-full after:h-3 after:w-3` +
          ` after:transition-all peer-checked:bg-green-600`
        }
      ></div>
    </label>
  )
})
