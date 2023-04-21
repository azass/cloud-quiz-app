import { memo, VFC } from 'react'
import { CloudUploadIcon, DocumentTextIcon } from '@heroicons/react/outline'
import { useQueryClient } from 'react-query'
import { useQuestionContext } from './QuestionProvider'
import {
  useChangeCaseNoContext,
  useEditCaseNoContext,
} from './QuestionCaseProvider'

interface Props {
  putQuestion: any
}
export const QCaseButtonSet: VFC<Props> = memo(({ putQuestion }) => {
  const { question } = useQuestionContext()
  const { editCaseNo, setEditCaseNo } = useEditCaseNoContext()
  const { changeCaseNo } = useChangeCaseNoContext()
  const queryClient = useQueryClient()
  const onClickCaseNo = () => {
    setEditCaseNo(false)
    queryClient.resetQueries([question.quest_id])
    putQuestion(
      {
        quest_id: question.quest_id,
        case_id: question.case_id,
      },
      question
    )
  }
  return (
    <div>
      <DocumentTextIcon
        className="w-5 h-5 mt-1 ml-8 cursor-pointer hover:text-blue-500"
        onClick={() => setEditCaseNo(!editCaseNo)}
      />
      {changeCaseNo && (
        <CloudUploadIcon
          className="h-5 w-5 ml-4 text-blue-400 cursor-pointer "
          onClick={() => onClickCaseNo()}
        />
      )}
    </div>
  )
})
