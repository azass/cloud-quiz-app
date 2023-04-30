import log from 'loglevel'
import { memo, FC } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectTab } from '../../slices/editSlice'
import { ExamSelectTab } from '../organisms/ExamSelectTab'
import { QTabs } from '../atoms/QTabs'
import { QuizHeader } from '../organisms/QuizHeader'
import { QuizSelectTab } from '../organisms/QuizSelectTab'
import { TermNoteTab } from '../organisms/TermNoteTab'
import { QListQuery } from '../molecules/list/QListQuery'
import { TermNotePanel } from '../organisms/TermNotePanel'
import { EditPanel } from '../organisms/EditPanel'
import Label from '../../consts/labels'
import Colors from '../../consts/colors'
export const QuizEditor: FC = memo(() => {
  log.setLevel('info')
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
      <QuizHeader />
      <div className="mt-30 h-full z-0">
        <div
          id="sidebar"
          className={`fixed inset-0 w-1/2 z-0 border-b -mb-16 pt-12 ${Colors.baseBg}`}
        >
          <div className={`pl-8 ${Colors.baseBg}`}>
            <QTabs />
          </div>
          {nowTab === tabs[0] && (
            <div className="pt-4 pl-8">
              <ExamSelectTab />
            </div>
          )}
          {nowTab === tabs[1] && (
            <>{params.quest_id ? <QuizSelectTab /> : <QListQuery />}</>
          )}
          {nowTab === tabs[2] && <TermNoteTab />}
        </div>
        <div id="content-wrapper" className={`flex min-h-screen w-1/2`}>
          <div className={`flex w-full `}>
            <div className={`px-8 absolute pt-12 pb-12 w-1/2 ${Colors.baseBg}`}>
              {isQuizEdit() && <EditPanel />}
              {isTermNote() && <TermNotePanel />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
})
