import { useAppSelector } from '../app/hooks'
import {
  useEditItemsContext,
  useNoteItemsContext,
  useShowSaveBtnContext,
} from '../components/molecules/edit/NoteItemsProvider'
import { useShowAllQuestionCaseContext } from '../components/molecules/edit/question/QuestionCaseProvider'
import { useQuestionContext } from '../components/molecules/edit/question/QuestionProvider'
import { useStarContext } from '../components/molecules/edit/term/TermsProvider'
import { selectExam } from '../slices/editSlice'
import { NoteItem, Question } from '../types/types'

export const useQuestion = () => {
  const { question } = useQuestionContext()
  const { name, save } = useNoteItemsContext()
  const { showAllQuestionCase } = useShowAllQuestionCaseContext()
  const { setShowSaveBtn } = useShowSaveBtnContext()
  const { star } = useStarContext()
  const exam = useAppSelector(selectExam)
  const { editItems } = useEditItemsContext()

  const isShow = (editItem: NoteItem) => {
    const questIds = editItem.quest_ids || []
    if (name === 'case_items') {
      if (showAllQuestionCase) {
        return true
      } else {
        return questIds.includes(question.quest_id)
      }
    } else if (name === 'description') {
      return questIds.includes(question.quest_id)
    } else if (name === 'description_for_question') {
      return (
        !star || questIds.filter((id) => id.startsWith(exam.exam_id)).length > 0
      )
    } else {
      return true
    }
  }

  const saveNote = () => {
    const requestData: Question = {
      quest_id: question.quest_id,
    }
    if (name === 'question_items') {
      requestData.question_items = editItems
    } else if (name === 'options') {
      requestData.options = editItems
      requestData.correct_answer = []
      editItems.forEach((option) => {
        if (option.correct) requestData.correct_answer?.push(option.mark || '')
        if (option.correctValue)
          requestData.correct_answer?.push(option.correctValue || '')
      })
    } else if (name === 'breakdown') {
      const learningNote = editItems.length === 0 ? '' : editItems[0].text
      requestData.learning_note = learningNote
    } else if (name === 'explanation') {
      requestData.explanation = editItems
    } else if (name === 'case_items') {
      requestData.case_id = question.case_id
      requestData.case_items = editItems
    }
    save(requestData, 'question', postSave)
  }

  const postSave = (requestData: Question) => {
    setShowSaveBtn(false)
  }
  return {
    isShow,
    saveNote,
  }
}
