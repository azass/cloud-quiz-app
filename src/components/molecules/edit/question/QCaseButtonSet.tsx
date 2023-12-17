import { FC, memo } from 'react'
import { CloudUploadIcon, DocumentTextIcon } from '@heroicons/react/outline'
import { useQueryClient } from 'react-query'
import { useQuestionContext } from './QuestionProvider'
import {
  useChangeCaseNoContext,
  useEditCaseNoContext,
} from './QuestionCaseProvider'
import { iconHover, iconShine } from '../../../../styles/util'
import { useMutateQuestion } from '../../../../hooks/useMutateQuestion'
import { useQuestionHeaderContext } from './QuestionHeaderProvider'

export const QCaseButtonSet: FC = memo(() => {
  const { question } = useQuestionContext()
  const { editCaseNo, setEditCaseNo } = useEditCaseNoContext()
  const { changeCaseNo } = useChangeCaseNoContext()
  const { postPutQuestion } = useQuestionHeaderContext()
  const { putQuestionSync } = useMutateQuestion()
  const queryClient = useQueryClient()
  const onClickCaseNo = () => {
    setEditCaseNo(false)
    queryClient.resetQueries([question.quest_id])
    putQuestionSync(
      {
        quest_id: question.quest_id,
        case_id: question.case_id,
      },
      question,
      postPutQuestion
    )
  }
  return (
    <>
      <DocumentTextIcon
        className={`w-5 h-5 ${iconHover}`}
        onClick={() => setEditCaseNo(!editCaseNo)}
      />
      {changeCaseNo && (
        <CloudUploadIcon
          className={`h-5 w-5 ${iconShine}`}
          onClick={() => onClickCaseNo()}
        />
      )}
    </>
  )
})
