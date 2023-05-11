import { FC } from 'react'
import Label from '../../consts/labels'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectTab } from '../../slices/editSlice'
import { EditPanel } from './EditPanel'
import { TermNotePanel } from './TermNotePanel'

export const EditorTab: FC = () => {
  const tabs = Label.tabs
  const params = useParams()
  const nowTab = useAppSelector(selectTab)
  const isQuizEdit = () => {
    return nowTab !== tabs[0] && params.quest_id
  }
  const isTermNote = () => {
    return nowTab === tabs[2] && !params.quest_id
  }
  return (
    <>
      {isQuizEdit() && <EditPanel />}
      {isTermNote() && <TermNotePanel />}
    </>
  )
}
