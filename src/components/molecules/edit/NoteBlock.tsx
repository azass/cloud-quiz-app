import log from 'loglevel'
import { useState, FC } from 'react'
import { NoteBlockContent } from './NoteBlockContent'
import { Question, NoteItem } from '../../../types/types'
import { SaveButton } from '../../atoms/SaveButton'
import { NoteItemAdds } from './NoteItemAdds'
import { NoteBlockHeader } from './NoteBlockHeader'
import { useQuestionContext } from './question/QuestionProvider'
import { NoteItemProvider } from './NoteItemProvider'
import {
  useNoteItemsContext,
  useEditItemsContext,
  useEdittingContext,
  useSaveButtonToggleContext,
  useShowAllQuestionCaseContext,
} from './NoteItemsProvider'
import { useAppSelector } from '../../../app/hooks'
import { selectExam } from '../../../slices/editSlice'
import Colors from '../../../consts/colors'
import { useStarContext } from './term/TermsProvider'

interface Props {
  title: string
}

export const NoteBlock: FC<Props> = ({ title }) => {
  const { noteItems: editElems, name, editable } = useNoteItemsContext()
  const { question } = useQuestionContext()
  const { editItems, setEditItems } = useEditItemsContext()
  const { editting } = useEdittingContext()
  const { showAllQuestionCase } = useShowAllQuestionCaseContext()
  const { saveButtonToggle, setSaveButtonToggle } = useSaveButtonToggleContext()
  const { save } = useNoteItemsContext()
  const { star } = useStarContext()
  const exam = useAppSelector(selectExam)
  const questId = question.quest_id

  const [questIdState, setQuestIdState] = useState(questId)
  if (questIdState !== questId) {
    log.debug(`${questIdState} => ${questId}`)
    setQuestIdState(questId)
    setEditItems(editElems)
    setSaveButtonToggle(false)
  }
  /**
   * for scraping
   * if no content; set new content
   */
  if (
    editItems.length === 0 &&
    editItems !== editElems &&
    name !== 'explanation'
  ) {
    log.debug('EditBlock new!!!')
    setEditItems(editElems)
  }

  const onClickSave = () => {
    const requestData: Question = {
      quest_id: questId,
    }
    if (name === 'question_items') {
      requestData.question_items = editItems
    } else if (name === 'options') {
      requestData.options = editItems
      requestData.correct_answer = []
      editItems.forEach((option) => {
        if (option.correct) requestData.correct_answer?.push(option.mark || '')
      })
    } else if (name === 'explanation') {
      requestData.explanation = editItems
    } else if (name === 'case_items') {
      requestData.case_id = question.case_id
      requestData.case_items = editItems
    }
    save(requestData, 'question')
  }

  const isShow = (editElem: NoteItem) => {
    const questIds = editElem.quest_ids || []
    if (name === 'case_items') {
      if (showAllQuestionCase) {
        return true
      } else {
        return questIds.includes(questId)
      }
    } else if (name === 'description') {
      return questIds.includes(questId)
    } else if (name === 'description_for_question') {
      return (
        !star || questIds.filter((id) => id.startsWith(exam.exam_id)).length > 0
      )
    } else {
      return true
    }
  }
  return (
    <div className={`pb-2  ${Colors.baseBg}`} title="EditBlock">
      {editable && <NoteBlockHeader title={title} />}
      {editting && editItems.length === 0 ? (
        <NoteItemAdds index={-1} />
      ) : (
        editItems.map((editElem, index) => (
          <>
            {isShow(editElem) && (
              <NoteItemProvider editElem={editElem} index={index}>
                <NoteBlockContent />
              </NoteItemProvider>
            )}
          </>
        ))
      )}
      <div className="flex justify-center mx-auto">
        {saveButtonToggle && <SaveButton onClick={onClickSave} />}
      </div>
    </div>
  )
}
