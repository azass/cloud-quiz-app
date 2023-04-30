import { CloudUploadIcon } from '@heroicons/react/outline'
import { memo, FC } from 'react'
import { useMutateQuestion } from '../../../../hooks/useMutateQuestion'
import log from 'loglevel'
import { useIsNewContext, useQuestionContext } from './QuestionProvider'
import { iconShine } from '../../../../styles/util'

export const QNewRegister: FC = memo(() => {
  log.setLevel('debug')
  const { question } = useQuestionContext()
  const { createQuestion } = useMutateQuestion()
  const { setIsNew } = useIsNewContext()
  const onClickRegister = () => {
    createQuestion(question)
    setIsNew(false)
  }
  return (
    <>
      <span className="px-4 italic text-red-500">New!!</span>
      <CloudUploadIcon
        className={`h-5 w-5 ${iconShine}`}
        onClick={() => onClickRegister()}
      />
    </>
  )
})
