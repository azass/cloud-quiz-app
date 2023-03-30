import { memo, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import { useEditElem } from "../../hooks/useEditElem";
import { selectEditedContent } from "../../slices/editSlice";
import { QListHeader } from "../molecules/list/QListHeader";
import { QSearchQuery } from "../molecules/search/QSearchQuery";
import { QuizSelectFrame } from "./QuizSelectFrame";
import { TagSelectPanel } from "./TagSelectPanel";
import { TermEditFrame } from "./TermEditFrame";

export const QuizSelectTab: VFC = memo(() => {
  console.log('QuizSelectTab start')
  const editedContent = useAppSelector(selectEditedContent)
  const { keywords, onClickTag } = useEditElem([])

  return (
    <div className={``} title="QuizSelectTab">
      <QListHeader />
      <div className={`${editedContent === 'QuizList' ? '' : 'hidden'}`}>
        <QuizSelectFrame />
      </div>
      <div className={`${editedContent === 'TagSelect' ? '' : 'hidden'}`}>
        <TagSelectPanel
          useExamTags={false}
          selectTags={Object.keys(keywords)}
          onClickTag={onClickTag}
        />
      </div>
      <div className={`${editedContent === 'TermEdit' ? '' : 'hidden'}`}>
        <TermEditFrame />
      </div>
      {editedContent === 'Search' &&
        <div className={`${editedContent === 'Search' ? '' : 'hidden'}`}>
          <QSearchQuery />
        </div>}
    </div>
  )
})