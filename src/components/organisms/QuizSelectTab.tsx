import { memo, FC } from 'react'
import { useAppSelector } from '../../app/hooks'
import { useTagSelect } from '../../hooks/useTagSelect'
import { selectShowContent } from '../../slices/editSlice'
import { QuizSelectHeader } from './QuizSelectHeader'
import { QSearchQuery } from '../molecules/search/QSearchQuery'
import { QSelectPanel } from '../molecules/list/QSelectPanel'
import { TagSelectPanel } from '../molecules/tag/TagSelectPanel'
import { SearchProvider } from '../molecules/search/SearchProvider'
import { TermsProvider } from '../molecules/edit/term/TermsProvider'
import { TermsEditor } from '../molecules/edit/term/TermsEditor'

export const QuizSelectTab: FC = memo(() => {
  const editedContent = useAppSelector(selectShowContent)
  const { getSelectTags, onClickTag } = useTagSelect()

  return (
    <div className={``} title="QuizSelectTab">
      <QuizSelectHeader />
      <div className={`${editedContent === 'QuizList' ? '' : 'hidden'}`}>
        <QSelectPanel />
      </div>
      {editedContent === 'TagSelect' && (
        <TagSelectPanel
          useExamTags={false}
          selectTags={getSelectTags()}
          onClickTag={onClickTag}
        />
      )}
      {editedContent === 'TermEdit' && (
        <TermsProvider>
          <TermsEditor />
        </TermsProvider>
      )}
      {editedContent === 'Search' && (
        <SearchProvider>
          <QSearchQuery />
        </SearchProvider>
      )}
    </div>
  )
})
