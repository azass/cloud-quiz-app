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

interface Props {
  title: string
}

export const NoteBlock: FC<Props> = ({ title }) => {
  const { noteItems: editElems, name, editable } = useNoteItemsContext()
  const { question } = useQuestionContext()
  const { editItems: editElemsState, setEditItems: setEditElemsState } = useEditItemsContext()
  const { editting } = useEdittingContext()
  const { showAllQuestionCase } = useShowAllQuestionCaseContext()
  const { saveButtonToggle, setSaveButtonToggle } = useSaveButtonToggleContext()
  const { save, star } = useNoteItemsContext()
  const exam = useAppSelector(selectExam)
  const questId = question.quest_id

  const [questIdState, setQuestIdState] = useState(questId)
  if (questIdState !== questId) {
    log.debug(`${questIdState} => ${questId}`)
    setQuestIdState(questId)
    setEditElemsState(editElems)
    setSaveButtonToggle(false)
  }
  /**
   * for scraping
   * if no content; set new content
   */
  if (
    editElemsState.length === 0 &&
    editElemsState !== editElems &&
    name !== 'explanation'
  ) {
    log.debug('EditBlock new!!!')
    setEditElemsState(editElems)
  }

  const onClickSave = () => {
    const requestData: Question = {
      quest_id: questId,
    }
    if (name === 'question_items') {
      requestData.question_items = editElemsState
    } else if (name === 'options') {
      requestData.options = editElemsState
      requestData.correct_answer = []
      editElemsState.forEach((option) => {
        if (option.correct) requestData.correct_answer?.push(option.mark || '')
      })
    } else if (name === 'explanation') {
      requestData.explanation = editElemsState
    } else if (name === 'case_items') {
      requestData.case_id = question.case_id
      requestData.case_items = editElemsState
    }
    save(requestData, 'question')
  }

  const isShow = (editElem: NoteItem) => {
    if (name === 'case_items') {
      if (showAllQuestionCase) {
        return true
      } else {
        return editElem.quest_ids?.includes(questId)
      }
    } else if (name === 'description') {
      return editElem.quest_ids?.includes(questId)
    } else if (name === 'description_for_question') {
      return (
        !star ||
        (editElem.quest_ids || []).filter((id) => id.startsWith(exam.exam_id))
          .length > 0
      )
    } else {
      return true
    }
  }
  return (
    <div className={`pb-2  ${Colors.baseBg}`} title="EditBlock">
      {editable && <NoteBlockHeader title={title} />}
      {editting && editElemsState.length === 0 ? (
        <NoteItemAdds index={-1} />
      ) : (
        editElemsState.map((editElem, index) => (
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