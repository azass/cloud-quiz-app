import { VFC, memo } from 'react'
import { Tag } from '../../types/types'
import log from 'loglevel'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectEditContext, setCallTermEdit, setEditContext, setEditedContent, setTab, tabs } from '../../slices/editSlice'

interface Props {
  tag: Tag
  selected: boolean
  onClickTag: any
}
export const SelectableTag: VFC<Props> = memo(({ tag, selected, onClickTag }) => {
  log.setLevel("info")
  log.debug('<SelectableTag>')
  const bgcolor = selected
    ? 'text-white bg-pink-600'
    : 'text-gray-500 bg-gray-300'
  const dispatch = useAppDispatch()
  const editContext = useAppSelector(selectEditContext)
  return (
    <span title="SelectableTag"
      key={tag.tag_no}
      className={
        'rounded-md border my-1 py-1 mx-1 px-3 font-extrabold text-sm cursor-pointer ' +
        `${bgcolor}`
      }
      onClick={() => onClickTag(tag, !selected)}
      onDoubleClick={() => {
        dispatch(setEditedContent('TermEdit'))
        dispatch(setEditContext({ ...editContext, chosenTag: tag, forQuestion: false }))
        dispatch(setCallTermEdit(true))
        dispatch(setTab(tabs[2]))
      }}
    >
      {tag.tag_name}
    </span>
  )
}
)
