import { VFC, memo, useContext } from 'react'
import { EditBlockContent } from './EditBlockContent'
import { Term } from '../../types/types'
import { SaveButton } from '../atoms/SaveButton'
import { EditElemAdds } from '../atoms/EditElemAdds'
import { useEditElem } from '../../hooks/useEditElem'
import { ColorContext } from '../../App'
import { useQueryClient } from 'react-query'
import {
  selectEditContext,
  selectEdittingTerms,
  setEdittingTerms,
} from '../../slices/editSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

interface Props {
  term: Term
  editable: boolean
}

export const EditTermDescription: VFC<Props> = memo(({ term, editable }) => {
  const name = 'description'
  const color = useContext(ColorContext)
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const editContext = useAppSelector(selectEditContext)
  const terms = useAppSelector(selectEdittingTerms)
  const {
    editElemsState,
    saveButtonToggle,
    add,
    del,
    changeText,
    changeCheck,
    save,
  } = useEditElem(term.description || [])
  const onClickSave = () => {
    const requestData: Term = { ...term, description: editElemsState }
    save(requestData, 'term', updateCacheTerm)
  }
  const updateCacheTerm = (term: Term) => {
    const newTerms = [...terms]
    newTerms.map((newTerm, index) => {
      if (newTerm.term_id === term.term_id) {
        newTerms.splice(index, 1, {
          ...term,
        })
      }
    })
    dispatch(setEdittingTerms(newTerms))
    queryClient.setQueryData<Term[]>(
      editContext.chosenTag.provider + '_' + editContext.chosenTag.tag_no,
      newTerms.map((term) => ({
        term_id: term.term_id,
        word: term.word,
        level: term.level,
        sort: term.sort,
        provider: term.provider,
        description: term.description,
      }))
    )
  }
  return (
    <div className={`px-6 pb-6  ${color.bgColor}`}>
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
            onChangeCheck={changeCheck}
            editable={editable}
          />
        ))
      )}
      <div className="flex justify-center mx-auto">
        {saveButtonToggle && editable && <SaveButton onClick={onClickSave} />}
      </div>
    </div>
  )
})
