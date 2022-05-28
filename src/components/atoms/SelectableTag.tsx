import { VFC, memo } from 'react'
import { Tag } from '../../types/types'
import log from 'loglevel'
import { useAppDispatch } from '../../app/hooks'
import { setCallTermEdit, setEdittingTag, setEditedContent, setTab, tabs } from '../../slices/editSlice'

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
    const dispatch = useAppDispatch()

    return (
      <span
        key={tag.tag_no}
        className={
          'rounded-md border my-1 py-1 mx-1 px-3 font-extrabold text-sm cursor-pointer ' +
          `${bgcolor}`
        }
        onClick={() => onClickTag(tag, !selected)}
        onDoubleClick={() => {
          dispatch(setEditedContent('TermEdit'))
          dispatch(setEdittingTag(tag))
          dispatch(setCallTermEdit(true))
          dispatch(setTab(tabs[1]))
        }}
      >
        {tag.tag_name}
      </span>
    )
  }
)
