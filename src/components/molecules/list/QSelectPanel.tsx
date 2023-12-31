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
      <div className="pl-6 pb-2">
        <QInputItem examId={params.exam_id || ''} />
      </div>
      <QListProvider>
        <FilterWordProvider>
          <div
            id="navWrapper"
            className={`${Colors.baseBg} pb-4`}
            title="QList"
          >
            <div className="flex justify-between">
              <div className="ml-5">
                <QListSort />
              </div>
              <div className="-mt-4">
                <QListFilter />
              </div>
            </div>
            <div className="px-6 pb-60">
              <QList />
            </div>
          </div>
        </FilterWordProvider>
      </QListProvider>
    </>
  )
})
