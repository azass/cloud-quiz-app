import { memo, VFC } from 'react'
import { CloudUploadIcon, DocumentTextIcon } from '@heroicons/react/outline'
import { useQueryClient } from 'react-query'
import { useQuestionContext } from './QuestionProvider'
import {
  useChangeCaseNoContext,
  useEditCaseNoContext,
} from './QuestionCaseProvider'
import { iconHover, iconShine } from '../../../../styles/util'
import { useEditQuestionContext } from './EditQuestionHeader'
import { useMutateQuestion } from '../../../../hooks/useMutateQuestion'

export const QCaseButtonSet: VFC = memo(() => {
  const { question } = useQuestionContext()
  const { editCaseNo, setEditCaseNo } = useEditCaseNoContext()
  const { changeCaseNo } = useChangeCaseNoContext()
  const { postPut } = useEditQuestionContext()
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
      postPut
    )
  }
  return (
    <div>
      <DocumentTextIcon
        className={`w-5 h-5 mt-1 ml-8 ${iconHover}`}
        onClick={() => setEditCaseNo(!editCaseNo)}
      />
      {changeCaseNo && (
        <CloudUploadIcon
          className={`h-5 w-5 ml-4 ${iconShine}`}
          onClick={() => onClickCaseNo()}
        />
      )}
    </div>
  )
})
