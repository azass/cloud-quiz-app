import { VFC, memo } from 'react'
import { Tag } from '../../types/types'
import log from 'loglevel'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectEditContext, selectTab, setEditContext, setEditedContent, setTab, tabs } from '../../slices/editSlice'

interface Props {
  tag: Tag
  selected: boolean
  onClickTag: any
}
export const SelectableTag: VFC<Props> = memo(({ tag, selected, onClickTag }) => {
  log.setLevel("info")
  const bgcolor = selected
    ? 'text-white bg-pink-600'
    : 'text-gray-500 bg-gray-300'
  const dispatch = useAppDispatch()
  const editContext = useAppSelector(selectEditContext)
  const tab = useAppSelector(selectTab)
  return (
    <span
    // <span title={'count' in tag ? String(tag.count) : ''}
      key={tag.tag_no}
      className={
        'rounded-md border my-1 py-1 mx-1 px-3 font-extrabold text-sm cursor-pointer ' +
        `${bgcolor}`
      }
      onClick={() => onClickTag(tag, !selected)}
      onDoubleClick={() => {
        if (tab === tabs[2]) {
          dispatch(setEditedContent('TermEdit'))
          dispatch(setEditContext({ ...editContext, chosenTag: tag, forQuestion: false }))
          dispatch(setTab(tabs[2]))
        }
      }}
    >
      {tag.tag_name}
    </span>
  )
}
)
