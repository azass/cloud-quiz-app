import { memo, FC } from 'react'
import { useAppSelector } from '../../app/hooks'
import { useSearch } from '../../hooks/useSearch'
import { useTagSelect } from '../../hooks/useTagSelect'
import { selectShowContent } from '../../slices/editSlice'
import { TagSelectPanel } from '../molecules/tag/TagSelectPanel'
import { TermsProvider } from '../molecules/edit/term/TermsProvider'
import { TermsEditor } from '../molecules/edit/term/TermsEditor'

export const TermNoteTab: FC = memo(() => {
  const editedContent = useAppSelector(selectShowContent)
  const { getSelectTags, onClickTag } = useTagSelect()
  const { selectSearchTags, setSelectSearchTags, onClickSearchTag } =
    useSearch()
  return (
    <>
      {editedContent === 'questTagSelect' && (
        <TagSelectPanel
          useExamTags={false}
          selectTags={getSelectTags()}
          onClickTag={onClickTag}
        />
      )}
      {editedContent === 'TaermNoteSelect' && (
        <TagSelectPanel
          useExamTags={false}
          selectTags={selectSearchTags}
          onClickTag={onClickSearchTag}
          setSelectSearchTags={setSelectSearchTags}
        />
      )}
      {editedContent === 'TermEdit' && (
        <TermsProvider>
          <TermsEditor />
        </TermsProvider>
      )}
    </>
  )
})
