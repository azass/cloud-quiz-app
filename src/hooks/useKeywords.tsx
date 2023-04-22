import { useAppSelector } from '../app/hooks'
import Colors from '../consts/colors'
import { selectEditContext } from '../slices/editSlice'
import { Question, TagTerms } from '../types/types'

export const useKeywords = (question: Question) => {
  const editContext = useAppSelector(selectEditContext)
  const getKeywordsJson = () => {
    if (question && editContext.quest_id === question.quest_id) {
      if (!editContext.keywordsJson || editContext.keywordsJson === '') {
        return {} as TagTerms
      } else {
        return JSON.parse(editContext.keywordsJson || '{}') as TagTerms
      }
    } else {
      if (question && question.keywords) {
        const keywordsJson: Object = JSON.parse(question.keywords || '{}')
        return keywordsJson as TagTerms
      } else {
        return {} as TagTerms
      }
    }
  }
  const getBgColor = (selected: boolean, lv: number) => {
    return `${
      selected ? Colors.selectedBgcolors[lv - 1] : Colors.bgcolors[lv - 1]
    }`
  }

  return { getKeywordsJson, getBgColor }
}
