import { SearchCircleIcon, ServerIcon } from '@heroicons/react/solid'
import { memo, FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useMaintenance } from '../../hooks/useMaintenance'
import { selectExam, setShowContent } from '../../slices/editSlice'
import { iconBase, strongText } from '../../styles/util'

export const QSelectHeader: FC = memo(() => {
  const dispatch = useAppDispatch()
  const { setupReportItem, doing } = useMaintenance()
  const exam = useAppSelector(selectExam)
  return (
    <div className="flex justify-between items-center" title="QListHeader">
      <div className="flex items-center">
        <p className={`pt-8 pb-4 pl-8 text-lg ${strongText}`}>
          {exam.exam_name}
        </p>
        <div className="mt-3 pl-8">
          <SearchCircleIcon
            className={`h-8 w-8 ${iconBase}`}
            onClick={() => dispatch(setShowContent('Search'))}
          />
        </div>
      </div>
      {doing ? (
        <div
          className={
            `animate-spin h-7 w-7 mr-8 border-4` +
            ` border-blue-500 rounded-full border-t-transparent`
          }
        ></div>
      ) : (
        <div className="mt-4 pl-8 pr-8">
          <ServerIcon
            className={`h-8 w-8 ${iconBase}`}
            onClick={() => setupReportItem(exam)}
          />
        </div>
      )}
    </div>
  )
})
