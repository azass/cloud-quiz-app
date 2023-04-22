import { CloudUploadIcon } from '@heroicons/react/outline'
import { memo, FC } from 'react'
import { useMutateQuestion } from '../../../../hooks/useMutateQuestion'
import log from 'loglevel'
import { useQuestionContext } from './QuestionProvider'
import { iconShine } from '../../../../styles/util'

interface Props {
  setRegisterToggle: any
}
export const QNewRegister: FC<Props> = memo(({ setRegisterToggle }) => {
  log.setLevel('debug')
  const { question } = useQuestionContext()
  const { createQuestion } = useMutateQuestion()
  const onClickRegister = () => {
    createQuestion(question)
    setRegisterToggle(false)
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
