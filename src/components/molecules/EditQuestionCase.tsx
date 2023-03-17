import { CloudUploadIcon } from "@heroicons/react/outline";
import { memo, useState, VFC } from "react"
import { useQueryClient } from "react-query";
import { Question } from "../../types/types"
import { QNewRegister } from "../atoms/QNewRegister";

interface Props {
  question: Question
  setQuestion: any
  registerToggle: boolean
  setRegisterToggle: any
  putQuestion: any
  editCaseNo: boolean
}
export const EditQuestionCase: VFC<Props> = memo(({ question, setQuestion, registerToggle, setRegisterToggle, putQuestion, editCaseNo }) => {
  const queryClient = useQueryClient()
  const [edittingCaseNo, setEdittingCaseNo] = useState(false)
  const [caseNo, setCaseNo] = useState(
    question.case_id && question.exam_id
      ? question.case_id.slice(question.exam_id.length + 1)
      : ''
  )
  const onChangeCaseNo = (val: string) => {
    if (Number.isInteger(val)) {
      alert('')
    } else {
      setCaseNo(('0000' + val).slice(-4))
      question.case_id = question.exam_id + '-' + caseNo
      // question.case_items = []
      setEdittingCaseNo(true)
    }
  }
  const onClickRegister = () => {
    setEdittingCaseNo(false)
    queryClient.resetQueries([question.quest_id])
    putQuestion(
      {
        quest_id: question.quest_id,
        case_id: question.exam_id + '-' + caseNo,
      },
      question
    )
  }
  return (
    <>
      {(editCaseNo || question.case_id) && (
        <>
          <div className="pl-4 text-white">ケース問題</div>
          <div className="pl-4 text-white">
            <i>{question.exam_id}-</i>
          </div>
          {editCaseNo ? (
            <input
              type="text"
              className="w-20 ml-1 px-1 text-black"
              value={caseNo}
              onChange={(e) => {
                onChangeCaseNo(e.target.value)
              }}
            ></input>
          ) : (
            <span>{caseNo}</span>
          )}
          {edittingCaseNo && (
            <CloudUploadIcon
              className="h-5 w-5 ml-4 text-blue-400 cursor-pointer "
              onClick={() => onClickRegister()}
            />
          )}
        </>
      )}

      {registerToggle && question && (
        <QNewRegister
          question={question}
          setRegisterToggle={setRegisterToggle}
        />
      )}
    </>
  )
})
