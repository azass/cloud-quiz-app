import { SearchCircleIcon } from '@heroicons/react/solid'
import { VFC } from 'react'
interface Props {
  setSearchWord: any
}
export const TagFilter: VFC<Props> = ({ setSearchWord }) => {
  return (
    <div className="flex flex-row items-center pt-4">
      <SearchCircleIcon className="w-6 h-6 ml-4" />
      <form className="bg-opacity-0 pl-4 pr-12">
        <input
          type="text"
          className="px-2"
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </form>
    </div>
  )
}
