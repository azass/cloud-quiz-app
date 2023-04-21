import { memo, FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  resetShowContent,
  resetEdittingTerms,
  resetUpdateTerm,
  selectEditContext,
  selectExam,
  selectTab,
  setShowContent,
  setTab,
  tabs,
} from '../../slices/editSlice'

export const QTabs: FC = memo(() => {
  const editedContext = useAppSelector(selectEditContext)
  const exam = useAppSelector(selectExam)
  const nowTab = useAppSelector(selectTab)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const onCllickTab = (index: number) => {
    if (nowTab !== tabs[index]) {
      dispatch(setTab(tabs[index]))
    }
    if (index === 0) {
      navigate('/editor')
    } else if (index === 1) {
      dispatch(resetShowContent())
      dispatch(resetUpdateTerm())
      dispatch(resetEdittingTerms())
      if (editedContext.quest_id) {
        // navigate(`/editor/${exam.examId}/${editedContext.quest_id}`)
      } else {
        navigate(`/editor/${exam.exam_id}`)
      }
    } else if (index === 2) {
      dispatch(setShowContent('TagSelect'))
    }
  }

  return (
    <nav className="flex flex-col sm:flex-row">
      {tabs.map((tab, index) => (
        <button
          className={
            'flex-1 pt-4 pb-2 px-6 block hover:text-blue-500 focus:outline-none' +
            `${
              nowTab === tab
                ? ' text-blue-500 border-b-2 font-medium border-blue-500'
                : ' text-gray-500'
            }`
          }
          onClick={() => onCllickTab(index)}
        >
          {tabs[index]}
        </button>
      ))}
    </nav>
  )
})
