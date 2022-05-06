import { useContext, VFC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { QuizEditFrame } from '../organisms/QuizEditFrame'
import { TagSelectFrame } from '../organisms/TagSelectFrame'
import { TermEditFrame } from '../organisms/TermEditFrame'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectExam,
  selectEditedContent,
  selectTab,
  tabs,
  setTab,
} from '../../slices/editSlice'
import { ExamSelect } from '../organisms/ExamSelect'
import { ColorContext } from '../../App'
import { QTabs } from '../atoms/QTabs'
import { useEditElem } from '../../hooks/useEditElem'
import { useSearch } from '../../hooks/useSearch'
import { CognitoUserPool } from 'amazon-cognito-identity-js'
import { QuizSelectFrame } from '../organisms/QuizSelectFrame'
import log from 'loglevel'

export const QuizEditor: VFC = () => {
  log.setLevel("info")
  const dispatch = useAppDispatch()
  const params = useParams()
  const editedContent = useAppSelector(selectEditedContent)
  const nowTab = useAppSelector(selectTab)
  const color = useContext(ColorContext)
  const exam = useAppSelector(selectExam)
  const { keywords, onClickTag } = useEditElem([])
  const { selectSearchTags, setSelectSearchTags, onClickSearchTag } =
    useSearch()
  const navigate = useNavigate()
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
    navigate('/login')
  }

  return (
    <>
      <div className="flex top-0 inset-x-0 fixed z-50 h-16 items-center">
        <div className="flex justify-between w-screen z-50">
          <div className="z-50">
            <p className="z-50 w-auto pl-8 font-bold text-white text-xl">
              Quiz Editor
            </p>
          </div>
          <div className="pr-8">
            <button
              className={'rounded p-2 bg-blue-500 text-white font-bold'}
              onClick={() => logout()}
            >
              Log out
            </button>
          </div>
        </div>
      </div>

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
              <ExamSelect />
            </div>
          )}
          {nowTab === tabs[1] && (
            <div className={``}>
              <p className="pt-8 pb-4 pl-8 text-white">{exam.examName}</p>
              {(() => {
                if (editedContent === 'QuizList') {
                  return (
                    <QuizSelectFrame />
                  )
                } else if (editedContent === 'TagSelect') {
                  return (
                    <TagSelectFrame
                      selectTags={Object.keys(keywords)}
                      onClickTag={onClickTag}
                    />
                  )
                } else if (editedContent === 'TermEdit') {
                  return <TermEditFrame />
                }
              })()}
            </div>
          )}
          {nowTab === tabs[2] && (
            <TagSelectFrame
              selectTags={selectSearchTags}
              onClickTag={onClickSearchTag}
              setSelectSearchTags={setSelectSearchTags}
            />
          )}
        </div>
        <div id="content-wrapper" className={`flex min-h-screen w-1/2`}>
          {nowTab === tabs[1] && params.quest_id && (
            <div className={`flex w-full `}>
              <div
                className={`px-8 absolute pt-12 pb-12 w-1/2  ${color.bgColor}`}
              >
                <QuizEditFrame />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
