import { VFC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  resetEditedContent,
  resetEdittingTerms,
  resetUpdateTerm,
  selectEditContext,
  selectExam,
  selectTab,
  setTab,
  tabs,
} from '../../slices/editSlice'

export const QTabs: VFC = () => {
  const editedContext = useAppSelector(selectEditContext)
  const exam = useAppSelector(selectExam)
  const nowTab = useAppSelector(selectTab)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const onCllickTab = (index: number) => {
    dispatch(setTab(tabs[index]))
    if (index === 0) {
      navigate('/editor')
    } else if (index === 1) {
      dispatch(resetEditedContent())
      dispatch(resetUpdateTerm())
      dispatch(resetEdittingTerms())
      if (editedContext.quest_id) {
        navigate(`/editor/${exam.examId}/${editedContext.quest_id}`)
      } else {
        navigate(`/editor/${exam.examId}`)
      }
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
}