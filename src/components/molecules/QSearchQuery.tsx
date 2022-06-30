import { memo, VFC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useQueryExamTags } from "../../hooks/useQueryExamTags";
import { useSearch } from "../../hooks/useSearch";
import { selectExam, setExamTags } from "../../slices/editSlice";
import { TagSelectPanel } from "../organisms/TagSelectPanel";
import { QSearchButtonSet } from "./QSearchButtonSet";

export const QSearchQuery: VFC = memo(() => {
  const dispatch = useAppDispatch()
  const exam = useAppSelector(selectExam)
  const { selectSearchTags, setSelectSearchTags, onClickSearchTag } = useSearch()
  const { status, data } = useQueryExamTags(exam)
  if (status === 'loading')
    return <div className="pl-8 pt-8">{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>
  if (data) {
    dispatch(setExamTags(data))
  }
  return (
    <>
      <div className="pb-2 px-6">
        <QSearchButtonSet
          examId={exam.exam_id}
          selectTags={selectSearchTags}
          setSelectSearchTags={setSelectSearchTags}
        />
      </div>

      <TagSelectPanel
        useExamTags={true}
        selectTags={selectSearchTags}
        onClickTag={onClickSearchTag}
        setSelectSearchTags={setSelectSearchTags}
      />
    </>
  )
})