import { memo, FC } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectShowContent } from '../../slices/editSlice'
import { QSelectHeader } from './QSelectHeader'
import { QSearchQuery } from '../molecules/search/QSearchQuery'
import { QSelectPanel } from '../molecules/list/QSelectPanel'
import { SearchProvider } from '../molecules/search/SearchProvider'
import { TermsProvider } from '../molecules/edit/term/TermsProvider'
import { TermsEditor } from '../molecules/edit/term/TermsEditor'

export const QSelectTab: FC = memo(() => {
  const editedContent = useAppSelector(selectShowContent)

  return (
    <div className={``} title="QuizSelectTab">
      <QSelectHeader />
      <div className={`${editedContent === 'QuizList' ? '' : 'hidden'}`}>
        <QSelectPanel />
      </div>
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
