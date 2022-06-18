import { memo, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import { useEditElem } from "../../hooks/useEditElem";
import { useSearch } from "../../hooks/useSearch";
import { selectEditedContent, selectExam } from "../../slices/editSlice";
import { SelectLang } from "../atoms/SelectLang";
import { QuizSelectFrame } from "./QuizSelectFrame";
import { TagSelectTab } from "./TagSelectTab";
import { TermEditFrame } from "./TermEditFrame";

export const QuizSelectTab: VFC = memo(() => {
  const editedContent = useAppSelector(selectEditedContent)
  const { keywords, onClickTag } = useEditElem([])
  const exam = useAppSelector(selectExam)
  const { selectSearchTags, setSelectSearchTags, onClickSearchTag } = useSearch()

  return (
    <div className={``} title="QuizSelectTab">
      <div className="flex justify-between">
        <div>
          <p className="pt-8 pb-4 pl-8 text-white font-bold">{exam.examName}</p>
        </div>
        <div className="mt-4 mr-8">
          <SelectLang />
        </div>
      </div>
      <div className={`${editedContent === 'QuizList' ? '' : 'hidden'}`}>
        <QuizSelectFrame />
      </div>
      <div className={`${editedContent === 'TagSelect' ? '' : 'hidden'}`}>
        <TagSelectTab
          selectTags={Object.keys(keywords)}
          onClickTag={onClickTag}
        />
      </div>
      <div className={`${editedContent === 'TermEdit' ? '' : 'hidden'}`}>
        <TermEditFrame />
      </div>
      <div className={`${editedContent === 'Search' ? '' : 'hidden'}`}>
        <TagSelectTab
          selectTags={selectSearchTags}
          onClickTag={onClickSearchTag}
          setSelectSearchTags={setSelectSearchTags}
        />
      </div>
    </div>
  )
})