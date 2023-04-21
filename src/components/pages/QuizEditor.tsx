import log from 'loglevel'
import { createContext, memo, useContext, FC } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectTab, setTab, tabs } from '../../slices/editSlice'
import { ExamSelectTab } from '../organisms/ExamSelectTab'
import { ColorContext } from '../../App'
import { QTabs } from '../atoms/QTabs'
import { Header } from '../organisms/Header'
import { QuizSelectTab } from '../organisms/QuizSelectTab'
import { TermNoteTab } from '../organisms/TermNoteTab'
import { CognitoUserPool } from 'amazon-cognito-identity-js'
import { QListQuery } from '../molecules/list/QListQuery'
import { TermNotePanel } from '../organisms/TermNotePanel'
import { EditPanel } from '../organisms/EditPanel'

interface EditorContextValues {
  logout?: any
}
export const EditorContext = createContext<EditorContextValues>({})
export const QuizEditor: FC = memo(() => {
  log.setLevel('info')
  const params = useParams()
  const nowTab = useAppSelector(selectTab)
  const color = useContext(ColorContext)
  const dispatch = useAppDispatch()
  const userPool = new CognitoUserPool({
    UserPoolId: process.env.REACT_APP_AUTH_USER_POOL_ID || '',
    ClientId: process.env.REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID || '',
  })
  const logout = () => {
    const cognitoUser = userPool.getCurrentUser()
    if (cognitoUser) {
      cognitoUser.signOut()
      localStorage.clear()
      dispatch(setTab(tabs[0]))
      log.debug('signed out')
    } else {
      localStorage.clear()
      log.debug('no user signing in')
    }
  }
  const isQuizEdit = () => {
    return nowTab !== tabs[0] && params.quest_id
  }
  const isTermNote = () => {
    return nowTab === tabs[2] && !params.quest_id
  }
  return (
    <EditorContext.Provider value={{ logout }}>
      <Header />
      <div className="mt-30 h-full z-0">
        <div
          id="sidebar"
          className={`fixed inset-0 w-1/2 z-0 border-b -mb-16 pt-12 ${color.bgColor}`}
        >
          <div className={`pl-8 ${color.bgColor}`}>
            <QTabs />
          </div>
          {nowTab === tabs[0] && (
            <div className="pt-4 pl-8">
              <ExamSelectTab />
            </div>
          )}
          {nowTab === tabs[1] && params.quest_id && <QuizSelectTab />}
          {nowTab === tabs[1] && !params.quest_id && <QListQuery />}
          {nowTab === tabs[2] && <TermNoteTab />}
        </div>
        <div id="content-wrapper" className={`flex min-h-screen w-1/2`}>
          <div className={`flex w-full `}>
            <div className={`px-8 absolute pt-12 pb-12 w-1/2 ${color.bgColor}`}>
              {isQuizEdit() && <EditPanel />}
              {isTermNote() && <TermNotePanel />}
            </div>
          </div>
        </div>
      </div>
    </EditorContext.Provider>
  )
})
