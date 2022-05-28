import { memo, VFC } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectTab, tabs } from '../../slices/editSlice'
import { TagFilter } from '../atoms/TagFilter'
import { SearchButtonSet } from './SearchButtonSet'
interface Props {
  examId: string
  selectTags: string[]
  setSelectSearchTags: any
  setSearchWord: any
}
export const TagSelectHeader: VFC<Props> = memo(
  ({ examId, selectTags, setSelectSearchTags, setSearchWord }) => {
    const nowTab = useAppSelector(selectTab)
    return (
      <div title="TagSelectHeader">
        {nowTab === tabs[2] && (
          <div className="pb-2">
            <div className="pt-4 pl-8">
              <SearchButtonSet
                examId={examId}
                selectTags={selectTags}
                setSelectSearchTags={setSelectSearchTags}
              />
            </div>
          </div>
        )}
        <div className="flex justify-end pb-4">
          <TagFilter setSearchWord={setSearchWord} />
        </div>
      </div>
    )
  }
)
