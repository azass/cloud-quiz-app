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
    <div
      className="flex justify-between justify-items-stretch items-center"
      title="QSelectHeader"
    >
      <div className="flex items-center">
        <p className={`py-3 pl-8 text-lg ${strongText}`}>{exam.exam_name}</p>
      </div>
      <div className="flex items-center mt-8">
        <div className="mt-0">
          <SearchCircleIcon
            className={`h-8 w-8 ${iconBase}`}
            onClick={() => dispatch(setShowContent('Search'))}
          />
        </div>
        {doing ? (
          <div
            className={
              `animate-spin h-7 w-7 mr-4 border-4` +
              ` border-blue-500 rounded-full border-t-transparent`
            }
          ></div>
        ) : (
          <div className="mt-0 pl-4 pr-4">
            <ServerIcon
              className={`h-8 w-8 ${iconBase}`}
              onClick={() => setupReportItem(exam)}
            />
          </div>
        )}
      </div>
    </div>
  )
})
