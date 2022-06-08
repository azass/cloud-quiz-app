import { memo, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import { useSearch } from "../../hooks/useSearch";
import { selectEditedContent } from "../../slices/editSlice";
import { TagSelectTab } from "./TagSelectTab";
import { TermEditFrame } from "./TermEditFrame";

export const TermNoteTab: VFC = memo(() => {
  const editedContent = useAppSelector(selectEditedContent)
  const { selectSearchTags, setSelectSearchTags, onClickSearchTag } = useSearch()
  return (
    <>
      {editedContent === 'TagSelect' && (
        <TagSelectTab
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