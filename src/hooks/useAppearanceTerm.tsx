import { useAppSelector } from '../app/hooks'
import Colors from '../consts/colors'
import { selectExam, selectQuestions } from '../slices/editSlice'
import { normalDocument, weaknessDocument } from '../styles/util'

export const useAppearanceTerm = () => {
  const exam = useAppSelector(selectExam)
  const questions = useAppSelector(selectQuestions)

  const show = (selfie: boolean, questIds: string[]) => {
    return (
      selfie || questIds.filter((id) => id.startsWith(exam.exam_id)).length > 0
    )
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
      return Colors.document
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
    show,
    borderColor,
    textColor,
    boadBgcolor,
  }
}
