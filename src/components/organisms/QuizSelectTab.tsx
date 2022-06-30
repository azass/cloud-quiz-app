import { SearchCircleIcon } from "@heroicons/react/outline";
import { memo, VFC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEditElem } from "../../hooks/useEditElem";
import { selectEditedContent, selectExam, setEditedContent } from "../../slices/editSlice";
import { SelectLang } from "../atoms/SelectLang";
import { QSearchQuery } from "../molecules/QSearchQuery";
import { QuizSelectFrame } from "./QuizSelectFrame";
import { TagSelectPanel } from "./TagSelectPanel";
import { TermEditFrame } from "./TermEditFrame";

export const QuizSelectTab: VFC = memo(() => {
  const dispatch = useAppDispatch()
  const editedContent = useAppSelector(selectEditedContent)
  const { keywords, onClickTag } = useEditElem([])
  const exam = useAppSelector(selectExam)

  return (
    <div className={``} title="QuizSelectTab">
      <div className="flex justify-between pb-2">
        <div className="flex items-center">
          <p className="pt-8 pb-4 pl-8 text-white text-lg font-bold">{exam.examName}</p>
          <div className="mt-3 pl-8">
            <SearchCircleIcon
              className="h-8 w-8 text-gray-400 cursor-pointer"
              onClick={() => dispatch(setEditedContent('Search'))} />
          </div>
        </div>
        <div className="mt-4 mr-8">
          <SelectLang />
        </div>
      </div>
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