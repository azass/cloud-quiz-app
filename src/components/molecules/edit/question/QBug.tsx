import { FC, memo } from 'react'
import { TrashIcon } from '@heroicons/react/solid'
import { useMutateQuestion } from '../../../../hooks/useMutateQuestion'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { selectQuestions, setQuestions } from '../../../../slices/editSlice'
import { useQuestionContext } from './QuestionProvider'
import Colors from '../../../../consts/colors'
import { iconBase, strongText } from '../../../../styles/util'

export const QBug: FC = memo(() => {
  const dispatch = useAppDispatch()
  const { question, setQuestion } = useQuestionContext()
  const { deleteBug } = useMutateQuestion()
  const questions = useAppSelector(selectQuestions)
  const bug = question.bug_points
  const clickDeleteBug = () => {
    if (question) {
      const newQuestion = { ...question, is_bug: false }
      deleteBug(newQuestion)
      setQuestion(newQuestion)
      dispatch(
        setQuestions(
          questions.map((quest) =>
            quest.quest_id === question.quest_id
              ? { ...quest, is_bug: false }
              : quest
          )
        )
      )
    }
  }
  return (
    <>
      <div className="flex items-center py-4">
        <div className={`flex gap-2 my-2 mr-2 ${strongText}`}>バグ</div>
        <TrashIcon
          className={`h-5 w-5 mr-4 ${iconBase}`}
          onClick={() => clickDeleteBug()}
        />
        {bug && 'more_study' in bug && bug.more_study && (
          <div
            className={`flex-shrink-0  w-20 border p-1 text-center ${Colors.strong}`}
          >
            要復習
          </div>
        )}
        {bug && 'in_question' in bug && bug.in_question && (
          <div
            className={`flex-shrink-0  w-20 border p-1 text-center ${Colors.strong}`}
          >
            問題
          </div>
        )}
        {bug && 'in_option' in bug && bug.in_option && (
          <div
            className={`flex-shrink-0  w-20 border p-1 text-center ${Colors.strong}`}
          >
            選択肢
          </div>
        )}
        {bug && 'in_tag' in bug && bug.in_tag && (
          <div
            className={`flex-shrink-0  w-20 border p-1 text-center ${Colors.strong}`}
          >
            タグ
          </div>
        )}
        {bug && 'in_explanation' in bug && bug.in_explanation && (
          <div
            className={`flex-shrink-0  w-20 border p-1 text-center ${Colors.strong}`}
          >
            解説
          </div>
        )}
      </div>
      {bug && 'memo' in bug && (
        <div className={`flex-shrink-0 border p-1 pl-2 ml-14 ${Colors.strong}`}>
          {bug.memo}
        </div>
      )}
    </>
  )
})
