import log from 'loglevel'
import { memo, FC, useState, useContext, createContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectTab } from '../../slices/editSlice'
import { ExamSelectTab } from '../organisms/ExamSelectTab'
import { QuizTabs } from '../organisms/QuizTabs'
import { QuizHeader } from './QuizHeader'
import { QSelectTab } from '../organisms/QSelectTab'
import { TermNoteTab } from '../organisms/TermNoteTab'
import Label from '../../consts/labels'
import Colors from '../../consts/colors'
import { EditorTab } from '../organisms/EditorTab'
import { QSelectInitTab } from '../organisms/QSelectInitTab'

const OpenBookContext = createContext(
  {} as {
    open: boolean
    setOpen: any
  }
)
export const useOpenBookContext = () => useContext(OpenBookContext)

export const QuizEditor: FC = memo(() => {
  log.setLevel('info')
  const tabs = Label.tabs
  const params = useParams()
  const nowTab = useAppSelector(selectTab)
  const [open, setOpen] = useState(window.innerWidth > window.innerHeight)
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height,
    }
  }
  // const [windowDimensions, setWindowDimensions] = useState(
  //   getWindowDimensions()
  // )
  useEffect(() => {
    const onResize = () => {
      const windowSize = getWindowDimensions()
      // setWindowDimensions(windowSize)
      setOpen(windowSize.width > windowSize.height)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return (
    <OpenBookContext.Provider value={{ open, setOpen }}>
      <QuizHeader />
      <div className="mt-30 h-full z-0">
        <div
          id="sidebar"
          className={`fixed inset-0 ${
            open ? 'w-1/2' : 'w-full'
          } z-0 border-b -mb-16 pt-12 ${Colors.baseBg}`}
        >
          <div className={`pl-8 ${Colors.baseBg}`}>
            <QuizTabs />
          </div>
          {nowTab === tabs[0] && (
            <div className="pt-4 pl-8">
              <ExamSelectTab />
            </div>
          )}
          <div className={`${nowTab === tabs[1] ? '' : 'hidden'}`}>
            {params.quest_id ? <QSelectTab /> : <QSelectInitTab />}
          </div>
          <div
            title="TermNoteTab"
            className={`${nowTab === tabs[2] ? '' : 'hidden'}`}
          >
            <TermNoteTab />
          </div>
          {nowTab === tabs[3] && (
            <div className="h-screen pb-24">
              <nav className="overflow-y-auto text-xs h-full w-full px-4">
                <EditorTab />
              </nav>
            </div>
          )}
        </div>
        {open && (
          <div id="content-wrapper" className={`flex min-h-screen w-1/2`}>
            <div className={`flex w-full `}>
              <div
                className={`px-4 absolute pt-12 pb-12 w-1/2 ${Colors.baseBg}`}
              >
                <EditorTab />
              </div>
            </div>
          </div>
        )}
      </div>
    </OpenBookContext.Provider>
  )
})
