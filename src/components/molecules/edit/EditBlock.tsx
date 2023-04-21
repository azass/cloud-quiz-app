import log from 'loglevel'
import { useState, useContext, FC } from 'react'
import { EditBlockContent } from './EditBlockContent'
import { Question, EditElem } from '../../../types/types'
import { SaveButton } from '../../atoms/SaveButton'
import { EditElemAdds } from './EditElemAdds'
import { ColorContext } from '../../../App'
import { EditBlockHeader } from './EditBlockHeader'
import { useQuestionContext } from './question/QuestionProvider'
import { EditElemProvider } from './EditElemProvider'
import {
  useEditElemsContext,
  useEditElemsStateContext,
  useEnableEditContext,
  useSaveButtonToggleContext,
  useShowAllQuestionCaseContext,
} from './EditElemsProvider'
import { useAppSelector } from '../../../app/hooks'
import { selectExam } from '../../../slices/editSlice'

interface Props {
  title: string
}

export const EditBlock: FC<Props> = ({ title }) => {
  const { editElems, name, editable } = useEditElemsContext()
  const { question } = useQuestionContext()
  const { editElemsState, setEditElemsState } = useEditElemsStateContext()
  const { enableEdit } = useEnableEditContext()
  const { showAllQuestionCase } = useShowAllQuestionCaseContext()
  const { saveButtonToggle, setSaveButtonToggle } = useSaveButtonToggleContext()
  const { save, star } = useEditElemsContext()
  const color = useContext(ColorContext)
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

  const isShow = (editElem: EditElem) => {
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
    <div className={`pb-2  ${color.bgColor}`} title="EditBlock">
      {editable && <EditBlockHeader title={title} />}
      {enableEdit && editElemsState.length === 0 ? (
        <EditElemAdds index={-1} />
      ) : (
        editElemsState.map((editElem, index) => (
          <>
            {isShow(editElem) && (
              <EditElemProvider editElem={editElem} index={index}>
                <EditBlockContent />
              </EditElemProvider>
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
