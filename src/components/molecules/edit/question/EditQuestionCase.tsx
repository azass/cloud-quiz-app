import { memo, useState, VFC } from "react"
import { Question } from "../../../../types/types"
import { EditBlock } from "../EditBlock"

interface Props {
  question: Question
  editCaseNo: boolean
  setChangeCaseNo: any
}
export const EditQuestionCase: VFC<Props> = memo(({ question, editCaseNo, setChangeCaseNo }) => {
  const [caseNo, setCaseNo] = useState(
    question.case_id && question.exam_id
      ? question.case_id.slice(question.exam_id.length + 1)
      : ''
  )
  const onChangeCaseNo = (val: string) => {
    if (Number.isInteger(val)) {
      alert('')
    } else {
      var _caseNo = ('0000' + val).slice(-4)
      setCaseNo(_caseNo)
      question.case_id = question.exam_id + '-' + _caseNo
      setChangeCaseNo(true)
    }
  }
  return (
    <>
      {(editCaseNo || question.case_id) && (
        <>
          <div className="flex justify-start items-center pt-4 pb-4">
            <div className=" text-white">ケース問題</div>
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
          </div>
          <EditBlock
            question={question}
            title={'与件'}
            name="case_items"
            editElems={question.case_items || []}
            editable={true}
          />
        </>
      )}
    </>
  )
})
