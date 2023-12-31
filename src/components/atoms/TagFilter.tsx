import { FilterIcon, XIcon } from '@heroicons/react/solid'
import { memo, FC } from 'react'
interface Props {
  filterWord: string
  setSearchWord: any
}
export const TagFilter: FC<Props> = memo(({ filterWord, setSearchWord }) => {
  return (
    <div className="flex items-center" title="TagFilter">
      <div className="bg-gray-100 border-gray-300">
        <FilterIcon className={`w-5 h-5 mx-1 text-gray-400`} />
      </div>
      <form className="bg-opacity-0">
        <input
          type="text"
          className="px-2"
          onChange={(e) => setSearchWord(e.target.value)}
          value={filterWord}
        />
      </form>
      <div className="bg-gray-100 border-gray-300 cursor-pointer">
        <XIcon
          className={`w-5 h-5 mx-1 text-gray-400`}
          onClick={() => setSearchWord('')}
        />
      </div>
    </div>
  )
})
