import { FC, memo, useState } from 'react'
import { QNoteBlock } from './QNoteBlock'
import {
  useChangeCaseNoContext,
  useEditCaseNoContext,
  useShowAllQuestionCaseContext,
} from './QuestionCaseProvider'
import { useQuestionContext } from './QuestionProvider'
import { NoteItemsProvider } from '../NoteItemsProvider'

export const QuestionCaseEdit: FC = memo(() => {
  const { question } = useQuestionContext()
  const { editCaseNo } = useEditCaseNoContext()
  const { setChangeCaseNo } = useChangeCaseNoContext()
  const { showAllQuestionCase, setShowAllQuestionCase } =
    useShowAllQuestionCaseContext()
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
  const clickEye = () => {
    setShowAllQuestionCase(!showAllQuestionCase)
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
          <NoteItemsProvider
            name="case_items"
            noteItems={question.case_items || []}
            editable={true}
            hasAddTextarea={true}
            hasAddImage={true}
            clickEye={clickEye}
          >
            <QNoteBlock title={'与件'} />
          </NoteItemsProvider>
        </>
      )}
    </>
  )
})
