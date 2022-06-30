import { memo, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import { useSearch } from "../../hooks/useSearch";
import { selectEditedContent } from "../../slices/editSlice";
import { TagSelectPanel } from "./TagSelectPanel";
import { TermEditFrame } from "./TermEditFrame";

export const TermNoteTab: VFC = memo(() => {
  const editedContent = useAppSelector(selectEditedContent)
  const { selectSearchTags, setSelectSearchTags, onClickSearchTag } = useSearch()
  return (
    <>
      {editedContent === 'TagSelect' && (
        <TagSelectPanel
          useExamTags={false}
          selectTags={selectSearchTags}
          onClickTag={onClickSearchTag}
          setSelectSearchTags={setSelectSearchTags}
        />
      )}
      {editedContent === 'TermEdit' && (
        <TermEditFrame />
      )}
    </>
  )
})