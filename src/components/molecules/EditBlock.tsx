import { VFC, memo, useState, useContext } from 'react'
import { EditBlockContent } from './EditBlockContent'
import { Question, EditElem } from '../../types/types'
import { SaveButton } from '../atoms/SaveButton'
import { EditElemAdds } from '../atoms/EditElemAdds'
import { useEditElem } from '../../hooks/useEditElem'
import { ColorContext } from '../../App'
import { EyeIcon } from '@heroicons/react/outline'
import { CheckCircleIcon, PencilAltIcon } from '@heroicons/react/solid'
import log, { setLevel } from 'loglevel'

interface Props {
  questId: string
  editElems: EditElem[]
  title: string
  name: string
  editable: boolean
}

export const EditBlock: VFC<Props> = memo(
  ({ questId, editElems, title, name, editable }) => {
    setLevel("info")
    log.debug('EditBlock start!!')
    const color = useContext(ColorContext)
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
      save,
    } = useEditElem(editElems)

    const [questIdState, setQuestIdState] = useState(questId)
    log.debug(`questIdState=${questIdState}`)
    log.debug(editElemsState)
    if (questIdState !== questId) {
      log.debug(`${questIdState} => ${questId}`)
      setQuestIdState(questId)
      setEditElemsState(editElems)
      setSaveButtonToggle(false)
    }
    const [enableEdit, setEnableEdit] = useState(false)
    /**
     * for scraping
     * if no content; set new content
     */
    if (editElemsState.length === 0 && editElemsState !== editElems && name !== 'explanation') {
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
      }
      save(requestData, 'question')
    }

    return (
      <div className={`pb-2  ${color.bgColor}`} title="EditBlock">
        <div className={`flex items-center gap-2 my-4 font-bold ${color.baseText}`}>
          {title}
          {name === 'options' && (
            <EyeIcon
              className="w-4 h-4 ml-4 cursor-pointer hover:text-blue-500"
              onClick={() => setShowCheckbox(!showCheckbox)}
            />
          )}
          <div>
            {enableEdit ? (
              <CheckCircleIcon
                className={`h-6 w-6 ml-8 ${color.iconColor} cursor-pointer text-blue-500`}
                onClick={() => setEnableEdit(!enableEdit)}
              />
            ) : (
              <PencilAltIcon
                className={`h-5 w-5 ml-8 ${color.iconColor} cursor-pointer hover:text-blue-500`}
                onClick={() => setEnableEdit(!enableEdit)}
              />)}
          </div>
        </div>
        {enableEdit && editElemsState.length === 0 ? (
          <EditElemAdds index={-1} name={name} onClickAdd={add} />
        ) : (
          editElemsState.map((editElem, index) => (
            <EditBlockContent
              editElem={editElem}
              name={name}
              index={index}
              onClickAdd={add}
              onClickDelete={del}
              onChangeText={changeText}
              onChangeCheck={changeCheck}
              showCheckbox={showCheckbox}
              editable={editable}
              enableEdit={enableEdit}
            />
          )))}
        <div className="flex justify-center mx-auto">
          {saveButtonToggle && <SaveButton onClick={onClickSave} />}
        </div>
      </div>
    )
  }
)
