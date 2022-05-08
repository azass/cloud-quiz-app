import { VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import { useEditElem } from "../../hooks/useEditElem";
import { selectEditedContent, selectExam } from "../../slices/editSlice";
import { SelectLang } from "../atoms/SelectLang";
import { QuizSelectFrame } from "./QuizSelectFrame";
import { TagSelectTab } from "./TagSelectTab";
import { TermEditFrame } from "./TermEditFrame";

export const QuizSelectTab: VFC = (() => {
  const editedContent = useAppSelector(selectEditedContent)
  const { keywords, onClickTag } = useEditElem([])
  const exam = useAppSelector(selectExam)

  return (
    <div className={``}>
      <div className="flex justify-between">
        <div>
          <p className="pt-8 pb-4 pl-8 text-white">{exam.examName}</p>
        </div>
        <div className="mt-4 mr-8">
          <SelectLang />
        </div>
    </div>
    {(() => {
      if (editedContent === 'QuizList') {
        return (
          <QuizSelectFrame />
        )
      } else if (editedContent === 'TagSelect') {
        return (
          <TagSelectTab
            selectTags={Object.keys(keywords)}
            onClickTag={onClickTag}
          />
        )
      } else if (editedContent === 'TermEdit') {
        return <TermEditFrame />
      }
    })()}
  </div>
  )
})