import log from 'loglevel'
import { memo, useContext, VFC } from 'react'
import { useParams } from 'react-router-dom'
import { QuizEditPanel } from '../organisms/QuizEditPanel'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectTab,
  setTab,
  tabs,
} from '../../slices/editSlice'
import { ExamSelectTab } from '../organisms/ExamSelectTab'
import { ColorContext } from '../../App'
import { QTabs } from '../atoms/QTabs'
import { Header } from '../molecules/Header'
import { QuizSelectTab } from '../organisms/QuizSelectTab'
import { TermNoteTab } from '../organisms/TermNoteTab'
import { CognitoUserPool } from 'amazon-cognito-identity-js'

export const QuizEditor: VFC = memo(() => {
  log.setLevel("info")
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

  return (
    <>
      <Header logout={logout} />
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
          {nowTab === tabs[1] && (
            <QuizSelectTab />
          )}
          {nowTab === tabs[2] && (
            <TermNoteTab />
          )}
        </div>
        <div id="content-wrapper" className={`flex min-h-screen w-1/2`}>
          {nowTab !== tabs[0] && params.quest_id && (
            <div className={`flex w-full `}>
              <div
                className={`px-8 absolute pt-12 pb-12 w-1/2  ${color.bgColor}`}
              >
                <QuizEditPanel logout={logout} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
)