import { FC, memo, useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectExamTags, selectProviderTags } from '../../../slices/editSlice'
import { TagTile } from './TagTile'
import { TagFilter } from '../../atoms/TagFilter'
import log from 'loglevel'
import { Tag } from '../../../types/types'
import Colors from '../../../consts/colors'

interface Props {
  useExamTags: boolean
  selectTags: string[]
  onClickTag: any
  setSelectSearchTags?: any
}
export const TagSelectPanel: FC<Props> = memo(
  ({ useExamTags, selectTags, onClickTag }) => {
    log.setLevel('info')
    const tags = useAppSelector(
      useExamTags ? selectExamTags : selectProviderTags
    )
    const [searchWord, setSearchWord] = useState('')
    const filter = (tag: Tag) => {
      if ('tag_no' in tag) {
        if (tag.tag_name.match(/^[^\x01-\x7E\uFF61-\uFF9F]+$/)) {
          return tag.tag_name.includes(searchWord)
        } else {
          return tag.tag_name.toLowerCase().includes(searchWord.toLowerCase())
        }
      } else {
        return false
      }
    }
    const selected = (tag: Tag) => {
      if (tag) {
        if ('tag_no' in tag) {
          return (
            selectTags.includes(tag.tag_name) ||
            selectTags.includes(tag.tag_no.toString())
          )
        } else {
          return false
        }
      } else {
        return false
      }
    }
    return (
      <div className="mx-0" title="TagSelectPanel">
        <div className="flex justify-end pb-4">
          <TagFilter setSearchWord={setSearchWord} />
        </div>
        <div id="navWrapper" className={Colors.baseBg}>
          <nav className="px-6 overflow-y-auto text-base h-screen pb-60">
            <div className="grid grid-cols-3 gap-1 pb-32">
              {tags
                .filter((tag) => {
                  return filter(tag)
                })
                .map((tag) => (
                  <TagTile
                    tag={tag}
                    selected={selected(tag)}
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