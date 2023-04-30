import { memo, FC } from 'react'
import { useAppSelector } from '../../app/hooks'
import { useEditElem } from '../../hooks/useEditElem'
import { selectShowContent } from '../../slices/editSlice'
import { QListHeader } from '../molecules/list/QListHeader'
import { QSearchQuery } from '../molecules/search/QSearchQuery'
import { QuizSelectFrame } from './QuizSelectFrame'
import { TagSelectPanel } from './TagSelectPanel'
import { SearchProvider } from '../molecules/search/SearchProvider'
import { TermsProvider } from '../molecules/edit/term/TermsProvider'

export const QuizSelectTab: FC = memo(() => {
  const editedContent = useAppSelector(selectShowContent)
  const { keywords, onClickTag } = useEditElem()

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
        <TermsProvider />
      </div>
      {editedContent === 'Search' && (
        <div className={`${editedContent === 'Search' ? '' : 'hidden'}`}>
          <SearchProvider>
            <QSearchQuery />
          </SearchProvider>
        </div>
      )}
    </div>
  )
})
