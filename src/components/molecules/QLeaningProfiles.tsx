/* eslint-disable no-useless-concat */
import { memo, useState, VFC } from "react";
import { useMutateQuestion } from "../../hooks/useMutateQuestion";
import { Question } from "../../types/types";

interface Props {
  question: Question
}
export const QLeaningProfiles: VFC<Props> = memo(({ question }) => {
  const [lastQuestId, setLastQuestId] = useState(question.quest_id)
  const [moreStudy, setMoreStudy] = useState(question.more_study || false)
  const [isDifficult, setIsDifficult] = useState(question.is_difficult || false)
  const [isWeak, setIsWeak] = useState(question.is_weak || false)
  const [isMandatory, setIsMandatory] = useState(question.is_mandatory || false)
  const { putQuestion } = useMutateQuestion()

  if (lastQuestId !== question.quest_id) {
    setLastQuestId(question.quest_id)
    setMoreStudy(question.more_study || false)
    setIsDifficult(question.is_difficult || false)
    setIsWeak(question.is_weak || false)
    setIsMandatory(question.is_mandatory || false)
  }
  return (
    <div className="flex items-center py-4">
      <button type="button"
        className={'flex-shrink-0 border p-1 text-white' + `${moreStudy && ` bg-purple-600`}`}
        onClick={() => {
          setMoreStudy(!moreStudy)
          question.more_study = !moreStudy
          putQuestion({
            quest_id: question.quest_id,
            more_study: question.more_study
          }, question)
        }}>
        復習
      </button>
      <button type="button"
        className={'flex-shrink-0 border p-1 text-white' + `${isDifficult && ` bg-red-600`}`}
        onClick={() => {
          setIsDifficult(!isDifficult)
          question.is_difficult = !isDifficult
          putQuestion({
            quest_id: question.quest_id,
            is_difficult: question.is_difficult
          }, question)
        }}>
        難問
      </button>
      <button type="button"
        className={'flex-shrink-0 border p-1 text-white' + `${isWeak && ` bg-pink-500`}`}
        onClick={() => {
          setIsWeak(!isWeak)
          question.is_weak = !isWeak
          putQuestion({
            quest_id: question.quest_id,
            is_weak: question.is_weak
          }, question)
        }}>
        弱点
      </button>
      <button type="button"
        className={'flex-shrink-0 border-t border-r border-b p-1 text-white' + `${isMandatory && ` bg-teal-600`}`}
        onClick={() => {
          setIsMandatory(!isMandatory)
          question.is_mandatory = !isMandatory
          putQuestion({
            quest_id: question.quest_id,
            is_mandatory: question.is_mandatory
          }, question)
        }}>
        必須
      </button>
    </div>
  )
})