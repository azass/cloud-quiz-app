import { memo, useContext, VFC } from "react";
import { ColorContext } from "../../../../App";
import { Question } from "../../../../types/types";
import { TrashIcon } from '@heroicons/react/solid'
import { useMutateQuestion } from "../../../../hooks/useMutateQuestion";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectQuestions, setQuestions } from "../../../../slices/editSlice";

interface Props {
  question: Question
  setQuestion: any
}

export const QBug: VFC<Props> = memo(({ question, setQuestion }) => {
  const color = useContext(ColorContext)
  const dispatch = useAppDispatch()
  const { deleteBug } = useMutateQuestion()
  const questions = useAppSelector(selectQuestions)
  const bug = question.bug_points
  const onClickDeleteBug = () => {
    if (question) {
      const newQuestion = { ...question, is_bug: false }
      deleteBug(newQuestion)
      setQuestion(newQuestion)
      dispatch(setQuestions(questions.map((quest) =>
        quest.quest_id === question.quest_id ? { ...quest, is_bug: false } : quest
      )))
    }
  }
  return (
    <>
      <div className="flex items-center py-4">
        <div className={`flex gap-2 my-2 mr-2 font-bold ${color.baseText}`}>
          バグ
        </div>
        <TrashIcon
          className={`h-5 w-5 ${color.iconColor} cursor-pointer hover:text-blue-500 mr-4`}
          onClick={() => onClickDeleteBug()}
        />
        {(bug && "more_study" in bug && bug.more_study) && (
          <div className={`flex-shrink-0  w-20 border p-1 text-center ${color.baseText}`}>要復習</div>
        )}
        {(bug && "in_question" in bug && bug.in_question) && (
          <div className={`flex-shrink-0  w-20 border p-1 text-center ${color.baseText}`}>問題</div>
        )}
        {(bug && "in_option" in bug && bug.in_option) && (
          <div className={`flex-shrink-0  w-20 border p-1 text-center ${color.baseText}`}>選択肢</div>
        )}
        {(bug && "in_tag" in bug && bug.in_tag) && (
          <div className={`flex-shrink-0  w-20 border p-1 text-center ${color.baseText}`}>タグ</div>
        )}
        {(bug && "in_explanation" in bug && bug.in_explanation) && (
          <div className={`flex-shrink-0  w-20 border p-1 text-center ${color.baseText}`}>解説</div>
        )}
      </div>
      {(bug && "memo" in bug) && (
        <div className={`flex-shrink-0 border p-1 pl-2 ml-14 ${color.baseText}`}>{bug.memo}</div>
      )}
    </>
  )
})