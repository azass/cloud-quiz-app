import { SearchCircleIcon, ServerIcon } from '@heroicons/react/solid'
import { memo, FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { useMaintenance } from '../../../hooks/useMaintenance'
import { selectExam, setShowContent } from '../../../slices/editSlice'

export const QListHeader: FC = memo(() => {
  const dispatch = useAppDispatch()
  const { onClick } = useMaintenance()
  const exam = useAppSelector(selectExam)
  return (
    <div className="flex justify-between items-center" title="QListHeader">
      <div className="flex items-center">
        <p className="pt-8 pb-4 pl-8 text-white text-lg font-bold">
          {exam.exam_name}
        </p>
        <div className="mt-3 pl-8">
          <SearchCircleIcon
            className="h-8 w-8 text-gray-400 cursor-pointer"
            onClick={() => dispatch(setShowContent('Search'))}
          />
        </div>
      </div>
      <div className="mt-4 pl-8 pr-8">
        <ServerIcon
          className="h-8 w-8 text-gray-400 cursor-pointer"
          onClick={() => onClick(exam)}
        />
      </div>
    </div>
  )
})
