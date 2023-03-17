import { memo, VFC } from "react";
import { CloudUploadIcon, DocumentTextIcon } from "@heroicons/react/outline";
import { Question } from "../../../types/types";
import { useQueryClient } from "react-query";

interface Props {
  question: Question
  editCaseNo: boolean
  setEditCaseNo: any
  changeCaseNo: boolean
  putQuestion: any
}
export const QCaseButtonSet: VFC<Props> = memo(({ question, editCaseNo, setEditCaseNo, changeCaseNo, putQuestion }) => {
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
        className="w-6 h-6 ml-8 cursor-pointer hover:text-blue-500"
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