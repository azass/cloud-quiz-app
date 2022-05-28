import { VFC, memo, useContext, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectExamTags } from '../../slices/editSlice'
import { SelectableTag } from '../atoms/SelectableTag'
import { ColorContext } from '../../App'
import { useParams } from 'react-router-dom'
import { TagSelectHeader } from '../molecules/TagSelectHeader'
import log from 'loglevel'

interface Props {
  selectTags: string[]
  onClickTag: any
  setSelectSearchTags?: any
}
export const TagSelectTab: VFC<Props> = memo(
  ({ selectTags, onClickTag, setSelectSearchTags }) => {
    log.setLevel("info")
    log.debug('<TagSelectFrame>')
    const params = useParams()
    const color = useContext(ColorContext)
    const tags = useAppSelector(selectExamTags)
    const [searchWord, setSearchWord] = useState('')
    return (
      <div className="mx-6 my-6" title="TagSelectTab">
        <TagSelectHeader
          examId={params.exam_id || ''}
          selectTags={selectTags}
          setSelectSearchTags={setSelectSearchTags}
          setSearchWord={setSearchWord}
        />
        <div id="navWrapper" className={color.bgColor}>
          <nav
            id="nav"
            className="px-6 overflow-y-auto text-base h-screen pb-60"
          >
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
