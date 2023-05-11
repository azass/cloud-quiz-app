import { memo, FC } from 'react'
import { useParams } from 'react-router-dom'
import { QInputItem } from './QInputItem'
import { QList } from './QList'
import { QListProvider } from './QListProvider'
import { FilterWordProvider } from '../../atoms/FilterWordProvider'

export const QSelectPanel: FC = memo(() => {
  const params = useParams()
  return (
    <>
      <QInputItem examId={params.exam_id || ''} />
      <QListProvider>
        <FilterWordProvider>
          <QList />
        </FilterWordProvider>
      </QListProvider>
    </>
  )
})
