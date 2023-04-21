import { FC, memo, useState } from 'react'
import { EditBlock } from '../EditBlock'
import {
  useChangeCaseNoContext,
  useEditCaseNoContext,
} from './QuestionCaseProvider'
import { useQuestionContext } from './QuestionProvider'
import { EditElemsProvider } from '../EditElemsProvider'

export const EditQuestionCase: FC = memo(() => {
  const { question } = useQuestionContext()
  const { editCaseNo } = useEditCaseNoContext()
  const { setChangeCaseNo } = useChangeCaseNoContext()
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
                onChange={(e) => onChangeCaseNo(e.target.value)}
              ></input>
            ) : (
              <span>{caseNo}</span>
            )}
          </div>
          <EditElemsProvider
            name="case_items"
            editElems={question.case_items || []}
            editable={true}
          >
            <EditBlock title={'与件'} />
          </EditElemsProvider>
        </>
      )}
    </>
  )
})
