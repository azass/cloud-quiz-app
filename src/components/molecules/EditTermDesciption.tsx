import { VFC, memo, useContext } from 'react'
import { EditBlockContent } from './EditBlockContent'
import { Term } from '../../types/types'
import { SaveButton } from '../atoms/SaveButton'
import { EditElemAdds } from '../atoms/EditElemAdds'
import { useEditElem } from '../../hooks/useEditElem'
import { ColorContext } from '../../App'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectUpdateTerm,
  setUpdateTerm,
} from '../../slices/editSlice'

interface Props {
  term: Term
  editable: boolean
  forQuestion: boolean
  updateCacheTerm: any
}

export const EditTermDescription: VFC<Props> = memo(
  ({ term, editable, forQuestion, updateCacheTerm }) => {
    const dispatch = useAppDispatch()
    const name = forQuestion ? 'description_for_question' : 'description'
    const color = useContext(ColorContext)
    const updateTem = useAppSelector(selectUpdateTerm)
    const {
      editElemsState,
      saveButtonToggle,
      add,
      del,
      changeText,
      changeCheck2,
      save,
    } = useEditElem(term.description || [])

    const onClickSave = () => {
      const requestData: Term = { ...term, description: editElemsState }
      save(requestData, 'term', updateCacheTerm(requestData))
      if (!updateTem) dispatch(setUpdateTerm(true))
    }

    return (
      <div className={`px-2 pb-6  ${color.bgColor}`} title="EditTermDescription">
        {editElemsState.length === 0 && editable ?
          <EditElemAdds index={0} name={name} onClickAdd={add} />
          : (
            editElemsState.map((editElem, index) => (
              <EditBlockContent
                editElem={editElem}
                name={name}
                index={index}
                onClickAdd={add}
                onClickDelete={del}
                onChangeText={changeText}
                onChangeCheck={changeCheck2}
                editable={true}
                enableEdit={editable}
              />
            ))
          )}
        <div className="flex justify-center mx-auto">
          {saveButtonToggle && editable && <SaveButton onClick={onClickSave} />}
        </div>
      </div>
    )
  })
