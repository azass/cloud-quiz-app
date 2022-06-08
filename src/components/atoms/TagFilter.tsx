import { FilterIcon } from '@heroicons/react/solid'
import { memo, useContext, VFC } from 'react'
import { ColorContext } from '../../App'
interface Props {
  setSearchWord: any
}
export const TagFilter: VFC<Props> = memo(({ setSearchWord }) => {
  const color = useContext(ColorContext)
  return (
    <div className="flex flex-row items-center pt-4" title="TagFilter">
      <div className="bg-gray-100 border-gray-300">
        <FilterIcon className={`w-5 h-5 mx-1 text-gray-400`} />
      </div>
      <form className="bg-opacity-0 pr-10">
        <input
          type="text"
          className="px-2"
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </form>
    </div>
  )
})
