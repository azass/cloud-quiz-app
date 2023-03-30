import log, { setLevel } from 'loglevel'
import { VFC, memo, useState, useContext } from 'react'
import { EditBlockContent } from './EditBlockContent'
import { Question, EditElem } from '../../../types/types'
import { SaveButton } from '../../atoms/SaveButton'
import { EditElemAdds } from './EditElemAdds'
import { useEditElem } from '../../../hooks/useEditElem'
import { ColorContext } from '../../../App'
import { EditBlockHeader } from './EditBlockHeader'
import { EditContext } from './EditContext'

interface Props {
  question: Question
  editElems: EditElem[]
  title: string
  name: string
  editable: boolean
}

export const EditBlock: VFC<Props> = memo(
  ({ question, editElems, title, name, editable }) => {
    setLevel('info')
    log.debug('EditBlock start!!')
    const color = useContext(ColorContext)
    const questId = question.quest_id
    const {
      editElemsState,
      setEditElemsState,
      saveButtonToggle,
      setSaveButtonToggle,
      showCheckbox,
      setShowCheckbox,
      add,
      del,
      changeText,
      changeCheck,
      changeCheck2,
      save,
    } = useEditElem(editElems)

    const [questIdState, setQuestIdState] = useState(questId)
    const [showAllQuestionCase, setShowAllQuestionCase] = useState(false)
    log.debug(`questIdState=${questIdState}`)
    log.debug(editElemsState)
    if (questIdState !== questId) {
      log.debug(`${questIdState} => ${questId}`)
      setQuestIdState(questId)
      setEditElemsState(editElems)
      setSaveButtonToggle(false)
    }
    const [enableEdit, setEnableEdit] = useState(false)
    const vals = {
      enableEdit,
      setEnableEdit,
      showCheckbox,
      setShowCheckbox,
      showAllQuestionCase,
      setShowAllQuestionCase,
      add,
      del,
      changeText,
      changeCheck,
      changeCheck2
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
          if (option.correct)
            requestData.correct_answer?.push(option.mark || '')
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
      } else {
        return true
      }
    }
    return (
      <div className={`pb-2  ${color.bgColor}`} title="EditBlock">
        <EditContext.Provider value={vals}>
          <EditBlockHeader
            name={name}
            title={title}
          />
          {enableEdit && editElemsState.length === 0 ? (
            <EditElemAdds index={-1} name={name} onClickAdd={add} />
          ) : (
            editElemsState.map((editElem, index) => (
              <>
                {isShow(editElem) && (
                  <EditBlockContent
                    editElem={editElem}
                    name={name}
                    index={index}
                    editable={editable}
                    enableEdit={enableEdit}
                  />
                )}
              </>
            ))
          )}
        </EditContext.Provider>
        <div className="flex justify-center mx-auto">
          {saveButtonToggle && <SaveButton onClick={onClickSave} />}
        </div>
      </div>
    )
  }
)
