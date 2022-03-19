import { VFC, memo, useState, useContext } from 'react'
import { EditBlock } from './EditBlock'
import { Question, EditElem } from '../../types/types'
import { SaveButton } from '../atoms/SaveButton'
import { EditElemAdds } from '../atoms/EditElemAdds'
import { useEditElem } from '../../hooks/useEditElem'
import { ColorContext } from '../../App'
import { EyeIcon } from '@heroicons/react/outline'

interface Props {
  questId: string
  editElems: EditElem[]
  title: string
  name: string
  editable: boolean
}

export const EditArea: VFC<Props> = memo(
  ({ questId, editElems, title, name, editable }) => {
    console.log('EditArea start!!')
    console.log(questId)
    console.log(title)
    console.log(editElems)
    const color = useContext(ColorContext)
    const {
      editElemsState,
      setEditElemsState,
      saveButtonToggle,
      setSaveButtonToggle,
      hiddenCheckbox,
      setHiddenCheckbox,
      add,
      del,
      changeText,
      changeCheck,
      save,
    } = useEditElem(editElems)

    const [questIdState, setQuestIdState] = useState(questId)
    console.log(`questIdState=${questIdState}`)
    console.log(editElemsState)
    if (questIdState !== questId) {
      console.log(`${questIdState} => ${questId}`)
      setQuestIdState(questId)
      console.log('EditArea change !!!')
      setEditElemsState(editElems)
      setSaveButtonToggle(false)
    }
    // if (questId === 'new' && editElemsState !== editElems) {
    //   console.log('EditArea new!!!')
    //   setEditElemsState(editElems)
    // }

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
        console.log(requestData)
      } else if (name === 'explanation') {
        requestData.explanation = editElemsState
      }
      save(requestData, 'question')
    }
    return (
      <div className={`pb-2  ${color.bgColor}`}>
        <div className={`flex gap-2 my-4 font-bold ${color.baseText}`}>
          {title}
          {name === 'options' && (
            <EyeIcon
              className="w-4 h-4 cursor-pointer"
              onClick={() => {
                setHiddenCheckbox(!hiddenCheckbox)
              }}
            />
          )}
        </div>
        {editElemsState.length === 0 ? (
          <EditElemAdds index={0} name={name} onClickAdd={add} />
        ) : (
          editElemsState.map((editElem, index) => (
            <EditBlock
              editElem={editElem}
              name={name}
              index={index}
              onClickAdd={add}
              onClickDelete={del}
              onChangeText={changeText}
              onChangeCheck={changeCheck}
              hiddenCheckbox={hiddenCheckbox}
              editable={editable}
            />
          ))
        )}
        <div className="flex justify-center mx-auto">
          {saveButtonToggle && <SaveButton onClick={onClickSave} />}
        </div>
      </div>
    )
  }
)
