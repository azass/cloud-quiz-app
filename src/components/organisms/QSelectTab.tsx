import { memo, FC } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectShowContent } from '../../slices/editSlice'
import { QSelectHeader } from './QSelectHeader'
import { QSearchPanel } from '../molecules/search/QSearchPanel'
import { QSelectPanel } from '../molecules/list/QSelectPanel'

export const QSelectTab: FC = memo(() => {
  const editedContent = useAppSelector(selectShowContent)

  return (
    <div className={``} title="QuizSelectTab">
      <QSelectHeader />
      <div
        className={`${editedContent === 'QuizList' ? '' : 'hidden'}`}
        title="QSelectPanel"
      >
        <QSelectPanel />
      </div>
      {editedContent === 'Search' && <QSearchPanel />}
    </div>
  )
})
