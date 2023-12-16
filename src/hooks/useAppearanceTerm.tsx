import { useAppSelector } from '../app/hooks'
import Colors from '../consts/colors'
import {
  selectEditContext,
  selectExam,
  selectQuestions,
} from '../slices/editSlice'

export const useAppearanceTerm = () => {
  const exam = useAppSelector(selectExam)
  const questions = useAppSelector(selectQuestions)
  const editContext = useAppSelector(selectEditContext)

  const isVisibleTag = (
    onlySelfowned: boolean,
    onlyWeaknesses: boolean,
    questIds: string[]
  ) => {
    if (onlyWeaknesses) {
      return isWeak(questIds)
    } else if (onlySelfowned) {
      return questIds.filter((id) => id.startsWith(exam.exam_id)).length > 0
    } else {
      return true
    }
  }
  const isWeak = (questIds: string[]) => {
    return (
      questions.filter(
        (q) =>
          questIds.filter((id) => id === q.quest_id).length > 0 && q.is_weak
      ).length > 0
    )
  }
  const borderColor = (questIds: string[]) => {
    if (isWeak(questIds)) {
      return Colors.weaknessBorder
    } else {
      return Colors.documentBorder
    }
  }
  const textColor = (questIds: string[]) => {
    if (isWeak(questIds)) {
      return Colors.weakness
    } else {
      if (questIds.includes(editContext.quest_id)) {
        return Colors.strong
      } else {
        return Colors.document
      }
    }
  }
  const boadBgcolor = (questIds: string[]) => {
    if (isWeak(questIds)) {
      return Colors.weaknessBgcolor
    } else {
      return Colors.documentBgcolor
    }
  }
  return {
    isVisibleTag,
    borderColor,
    textColor,
    boadBgcolor,
  }
}
