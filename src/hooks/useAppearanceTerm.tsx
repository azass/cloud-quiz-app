import { useState } from "react"
import { useAppSelector } from "../app/hooks"
import { selectExam, selectQuestions } from "../slices/editSlice"

export const useAppearanceTerm = () => {
  const exam = useAppSelector(selectExam)
  const questions = useAppSelector(selectQuestions)

  const show = (selfie: boolean, questIds: string[]) => {
    return selfie || questIds.filter((id) => id.startsWith(exam.exam_id)).length > 0
  }
  const isWeak = (questIds: string[]) => {
    return questions.filter((q) => questIds.filter((id) => id === q.quest_id).length > 0 && q.is_weak).length > 0
  }
  const borderColor = (questIds: string[]) => {
    if (isWeak(questIds)) {
      return 'border-pink-900'
    } else {
      return 'border-green-900'
    }
  }
  const textColor = (questIds: string[]) => {
    if (isWeak(questIds)) {
      return 'text-pink-400'
    } else {
      return 'text-green-400'
    }
  }
  return {
    show,
    borderColor,
    textColor
  }
}