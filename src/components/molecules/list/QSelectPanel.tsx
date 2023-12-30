import { memo, FC } from 'react'
import { useParams } from 'react-router-dom'
import { QInputItem } from './QInputItem'
import { QList } from './QList'
import { QListProvider } from './QListProvider'
import { FilterWordProvider } from '../../atoms/FilterWordProvider'
import Colors from '../../../consts/colors'
import { QListFilter } from './QListFilter'
import { QListSort } from './QListSort'

export const QSelectPanel: FC = memo(() => {
  const params = useParams()
  return (
    <>
      <QInputItem examId={params.exam_id || ''} />
      <QListProvider>
        <FilterWordProvider>
          <div
            id="navWrapper"
            className={`${Colors.baseBg} pb-4`}
            title="QList"
          >
            <div className="flex justify-between">
              <QListSort />
              <QListFilter />
            </div>
            <QList />
          </div>
        </FilterWordProvider>
      </QListProvider>
    </>
  )
})
