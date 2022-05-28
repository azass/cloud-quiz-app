import { memo, useContext, VFC } from 'react'
import { useParams } from 'react-router-dom'
import { QuizEditPanel } from '../organisms/QuizEditPanel'
import { TagSelectTab } from '../organisms/TagSelectTab'
import { useAppSelector } from '../../app/hooks'
import {
  selectTab,
  tabs,
} from '../../slices/editSlice'
import { ExamSelectTab } from '../organisms/ExamSelectTab'
import { ColorContext } from '../../App'
import { QTabs } from '../atoms/QTabs'
import { useSearch } from '../../hooks/useSearch'
import log from 'loglevel'
import { Header } from '../molecules/Header'
import { QuizSelectTab } from '../organisms/QuizSelectTab'

export const QuizEditor: VFC = memo(() => {
  log.setLevel("info")
  const params = useParams()
  const nowTab = useAppSelector(selectTab)
  const color = useContext(ColorContext)
  const { selectSearchTags, setSelectSearchTags, onClickSearchTag } =
    useSearch()

  return (
    <>
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
          {nowTab === tabs[1] && (
            <QuizSelectTab />
          )}
          {nowTab === tabs[2] && (
            <TagSelectTab
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
                <QuizEditPanel />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
)