import { VFC, memo, useContext, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectExamTags, selectProviderTags } from '../../slices/editSlice'
import { SelectableTag } from '../atoms/SelectableTag'
import { ColorContext } from '../../App'
import { TagFilter } from '../atoms/TagFilter'
import log from 'loglevel'

interface Props {
  useExamTags: boolean
  selectTags: string[]
  onClickTag: any
  setSelectSearchTags?: any
}
export const TagSelectPanel: VFC<Props> = memo(
  ({ useExamTags, selectTags, onClickTag }) => {
    log.setLevel("info")
    const color = useContext(ColorContext)
    const tags = useAppSelector(useExamTags ? selectExamTags : selectProviderTags)
    const [searchWord, setSearchWord] = useState('')
    return (
      <div className="mx-0" title="TagSelectPanel">
        <div className="flex justify-end pb-4">
          <TagFilter setSearchWord={setSearchWord} />
        </div>
        <div id="navWrapper" className={color.bgColor}>
          <nav className="px-6 overflow-y-auto text-base h-screen pb-60">
            <div className="grid grid-cols-3 gap-1 pb-32">
              {tags
                .filter((tag) => {
                  return tag.tag_name
                    .toLowerCase()
                    .includes(searchWord.toLowerCase())
                })
                .map((tag) => (
                  <SelectableTag
                    tag={tag}
                    selected={selectTags.includes(tag.tag_name)}
                    onClickTag={onClickTag}
                  />
                ))}
            </div>
          </nav>
        </div>
      </div>
    )
  }
)
