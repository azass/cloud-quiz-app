import { FC, memo } from 'react'
import { Tag } from '../../../types/types'
import log from 'loglevel'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  selectEditContext,
  selectTab,
  setEditContext,
  setShowContent,
  setTab,
} from '../../../slices/editSlice'
import Label from '../../../consts/labels'
import { searchKeyOff, searchKeyOn } from '../../../styles/util'

interface Props {
  tag: Tag
  selected: boolean
  onClickTag: any
}
export const TagTile: FC<Props> = memo(({ tag, selected, onClickTag }) => {
  log.setLevel('info')
  const bgcolor = selected ? searchKeyOn : searchKeyOff
  const dispatch = useAppDispatch()
  const editContext = useAppSelector(selectEditContext)
  const tab = useAppSelector(selectTab)
  const openNote = () => {
    if (tab === Label.tabs[2]) {
      dispatch(setShowContent('TermEdit'))
      dispatch(
        setEditContext({
          ...editContext,
          chosenTag: tag,
          forQuestion: false,
        })
      )
      dispatch(setTab(Label.tabs[2]))
    }
  }
  return (
    <div
      key={tag.tag_no}
      className={
        `place-items-center flex justify-between rounded-md border` +
        ` my-1 py-1 mx-1 px-3 font-extrabold text-sm cursor-pointer ${bgcolor}`
      }
      onClick={() => onClickTag(tag, !selected)}
      onDoubleClick={() => openNote()}
    >
      <span className="flex">{tag.tag_name}</span>
      <span
        className={
          `rounded-full bg-blue-500 h-6 w-6 text-xs` +
          ` flex items-center justify-center font-bold text-gray-300`
        }
      >
        {tag.count}
      </span>
    </div>
  )
})
