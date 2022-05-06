import { VFC, memo } from 'react'
import { Tag } from '../../types/types'
import log from 'loglevel'

interface Props {
  tag: Tag
  selected: boolean
  onClickTag: any
}
export const SelectableTag: VFC<Props> = memo(
  ({ tag, selected, onClickTag }) => {
    log.setLevel("info")
    log.debug('<SelectableTag>')
    const bgcolor = selected
      ? 'text-white bg-pink-600'
      : 'text-gray-500 bg-gray-300'
    return (
      <span
        key={tag.tag_no}
        className={
          'rounded-md border my-1 py-1 mx-1 px-3 font-extrabold text-sm cursor-pointer ' +
          `${bgcolor}`
        }
        onClick={() => onClickTag(tag, !selected)}
      >
        {tag.tag_name}
      </span>
    )
  }
)
