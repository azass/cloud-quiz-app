import { memo, FC } from 'react'
import { useAppSelector } from '../../app/hooks'
import { useSearch } from '../../hooks/useSearch'
import { selectShowContent } from '../../slices/editSlice'
import { TagSelectPanel } from './TagSelectPanel'
import { TermsLoader } from '../molecules/edit/term/TermsLoader'

export const TermNoteTab: FC = memo(() => {
  const editedContent = useAppSelector(selectShowContent)
  const { selectSearchTags, setSelectSearchTags, onClickSearchTag } =
    useSearch()
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
      {editedContent === 'TermEdit' && <TermsLoader />}
    </>
  )
})
