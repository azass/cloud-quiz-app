import { FC, memo } from 'react'
import { useSortContext } from './QListProvider'
import { ArrowCircleDownIcon, ArrowCircleUpIcon } from '@heroicons/react/solid'

export const QListSort: FC = memo(() => {
  const { asc, setAsc } = useSortContext()

  return (
    <div className="flex flex-row items-center">
      <div className="mb-1 text-sky-500">sort</div>
      {asc ? (
        <ArrowCircleUpIcon
          className="h-5 w-5 mx-1 text-sky-500 cursor-pointer"
          onClick={() => setAsc(false)}
        />
      ) : (
        <ArrowCircleDownIcon
          className="h-5 w-5 mx-1 text-sky-500 cursor-pointer"
          onClick={() => setAsc(true)}
        />
      )}
    </div>
  )
})
