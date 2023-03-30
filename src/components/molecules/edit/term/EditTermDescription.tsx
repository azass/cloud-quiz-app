import { VFC, memo, useContext } from 'react'
import { EditBlockContent } from '../EditBlockContent'
import { Term } from '../../../../types/types'
import { SaveButton } from '../../../atoms/SaveButton'
import { EditElemAdds } from '../EditElemAdds'
import { useEditElem } from '../../../../hooks/useEditElem'
import { ColorContext } from '../../../../App'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import {
  selectUpdateTerm,
  setUpdateTerm,
} from '../../../../slices/editSlice'
import { useAppearanceTerm } from '../../../../hooks/useAppearanceTerm'
import { EditContext } from '../EditContext'
import { EditTermContext } from './EditTermContext'
import { TermContext } from './TermContext'

export const EditTermDescription: VFC = memo(() => {
  const dispatch = useAppDispatch()
  const { term, forQuestion, star } = useContext(TermContext)
  const { editting, updateCacheTerm } = useContext(EditTermContext)
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
  const { show } = useAppearanceTerm()
  const onClickSave = () => {
    if (term) {
      const requestData: Term = { ...term, description: editElemsState }
      save(requestData, 'term', updateCacheTerm(requestData))
      if (!updateTem) dispatch(setUpdateTerm(true))
    }
  }

  const onClickAdd = (index: number, type: string) => {
    if (!star) {
      add(index, type)
    }
  }
  const vals = {
    add: onClickAdd,
    del: del,
    changeText: changeText,
    changeCheck2: changeCheck2
  }
  return (
    <div className={`px-2 pb-6  ${color.bgColor}`} title="EditTermDescription">
      <EditContext.Provider value={vals}>
        {editElemsState.length === 0 && editting ?
          <EditElemAdds index={0} name={name} onClickAdd={onClickAdd} />
          : (
            editElemsState.map((editElem, index) => (
              <>
                {show(!star, editElem.quest_ids || []) &&
                  <EditBlockContent
                    editElem={editElem}
                    name={name}
                    index={index}
                    editable={true}
                    enableEdit={editting}
                  />
                }
              </>
            ))
          )}
      </EditContext.Provider>
      <div className="flex justify-center mx-auto">
        {saveButtonToggle && editting && <SaveButton onClick={onClickSave} />}
      </div>
    </div>
  )
})
