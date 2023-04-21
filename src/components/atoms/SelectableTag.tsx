import { FC, memo } from 'react'
import { Tag } from '../../types/types'
import log from 'loglevel'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectEditContext,
  selectTab,
  setEditContext,
  setShowContent,
  setTab,
  tabs,
} from '../../slices/editSlice'

interface Props {
  tag: Tag
  selected: boolean
  onClickTag: any
}
export const SelectableTag: FC<Props> = memo(
  ({ tag, selected, onClickTag }) => {
    log.setLevel('info')
    const bgcolor = selected
      ? 'text-white bg-pink-600'
      : 'text-gray-500 bg-gray-300'
    const dispatch = useAppDispatch()
    const editContext = useAppSelector(selectEditContext)
    const tab = useAppSelector(selectTab)
    return (
      <div
        key={tag.tag_no}
        className={
          'place-items-center flex justify-between rounded-md border my-1 py-1 mx-1 px-3 font-extrabold text-sm cursor-pointer ' +
          `${bgcolor}`
        }
        onClick={() => onClickTag(tag, !selected)}
        onDoubleClick={() => {
          if (tab === tabs[2]) {
            dispatch(setShowContent('TermEdit'))
            dispatch(
              setEditContext({
                ...editContext,
                chosenTag: tag,
                forQuestion: false,
              })
            )
            dispatch(setTab(tabs[2]))
          }
        }}
      >
        <span className="flex">{tag.tag_name}</span>
        <span className="rounded-full bg-blue-500 h-6 w-6 text-xs flex items-center justify-center font-bold text-gray-300">
          {tag.count}
        </span>
      </div>
    )
  }
)
