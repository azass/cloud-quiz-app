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
  resetScArgs,
  resetProviderTags,
  resetExamTags,
} from '../../slices/editSlice'
import Label from '../../consts/labels'
import Colors from '../../consts/colors'
import { useOpenBookContext } from '../pages/QuizEditor'

export const QuizTabs: FC = memo(() => {
  const editContext = useAppSelector(selectEditContext)
  const exam = useAppSelector(selectExam)
  const nowTab = useAppSelector(selectTab)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { open } = useOpenBookContext()

  const onCllickTab = (index: number) => {
    if (nowTab !== Label.tabs[index]) {
      dispatch(setTab(Label.tabs[index]))
    }
    if (index === 0) {
      dispatch(resetScArgs())
      dispatch(resetShowContent())
      dispatch(resetUpdateTerm())
      dispatch(resetEdittingTerms())
      dispatch(resetProviderTags())
      dispatch(resetExamTags())
      navigate('/editor')
    } else if (index === 1) {
      dispatch(resetShowContent())
      dispatch(resetUpdateTerm())
      dispatch(resetEdittingTerms())
      if (editContext.quest_id) {
        // navigate(`/editor/${exam.examId}/${editedContext.quest_id}`)
      } else {
        navigate(`/editor/${exam.exam_id}`)
      }
    } else if (index === 2) {
      if (editContext.chosenTag.tag_name === '') {
        dispatch(setShowContent('TaermNoteSelect'))
      } else {
        dispatch(setShowContent('TermEdit'))
      }
    }
  }

  return (
    <nav className="flex flex-row sm:flex-row">
      {Label.tabs.map((tab, index) => (
        <>
          {(!open || index < 3) && (
            <button
              className={
                `flex-1 pt-4 pb-2 px-6 block hover:${Colors.shining} focus:outline-none` +
                `${
                  nowTab === tab
                    ? ` ${Colors.shining} border-b-2 font-medium border-blue-500`
                    : ' text-gray-500'
                }`
              }
              onClick={() => onCllickTab(index)}
            >
              {Label.tabs[index]}
            </button>
          )}
        </>
      ))}
    </nav>
  )
})
