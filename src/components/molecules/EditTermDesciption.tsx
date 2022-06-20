import { VFC, memo, useContext } from 'react'
import { EditBlockContent } from './EditBlockContent'
import { Term } from '../../types/types'
import { SaveButton } from '../atoms/SaveButton'
import { EditElemAdds } from '../atoms/EditElemAdds'
import { useEditElem } from '../../hooks/useEditElem'
import { ColorContext } from '../../App'
// import { useQueryClient } from 'react-query'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectEditContext,
  // selectEdittingTerms,
  selectUpdateTerm,
  // setEditContext,
  // setEdittingTerms,
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
    // const queryClient = useQueryClient()
    const editContext = useAppSelector(selectEditContext)
    // const terms = useAppSelector(selectEdittingTerms)
    const updateTem = useAppSelector(selectUpdateTerm)
    const {
      editElemsState,
      saveButtonToggle,
      add,
      del,
      changeText,
      save,
      setEditElemsState,
      setSaveButtonToggle,
    } = useEditElem(term.description || [])

    const onClickSave = () => {
      const requestData: Term = { ...term, description: editElemsState }
      save(requestData, 'term', updateCacheTerm(requestData))
      if (!updateTem) dispatch(setUpdateTerm(true))
    }
    // const updateCacheTerm = (term: Term) => {
    //   const newTerms = [...terms]
    //   const selectedTerms = newTerms
    //     .filter((term) => term.selected)
    //     .map((term) => ({
    //       term_id: term.term_id,
    //       word: term.word,
    //       level: term.level,
    //       sort: term.sort,
    //       description: term.description,
    //     }))
    //   const keywords = JSON.parse(editContext.keywordsJson)
    //   keywords[editContext.chosenTag.tag_name] = selectedTerms
    //   const newEditContext = {
    //     ...editContext,
    //     keywordsJson: JSON.stringify(keywords),
    //   }
    //   dispatch(setEditContext(newEditContext))

    //   newTerms.map((newTerm, index) => {
    //     if (newTerm.term_id === term.term_id) {
    //       newTerms.splice(index, 1, { ...term, })
    //     }
    //   })
    //   dispatch(setEdittingTerms(newTerms))

    //   queryClient.setQueryData<Term[]>(
    //     editContext.chosenTag.provider + '_' + editContext.chosenTag.tag_no,
    //     newTerms.map((term) => ({
    //       term_id: term.term_id,
    //       word: term.word,
    //       level: term.level,
    //       sort: term.sort,
    //       provider: term.provider,
    //       tag_no: term.tag_no,
    //       description: term.description,
    //     }))
    //   )
    // }
    const changeCheck = (index: number) => {
      const newEditElems = [...editElemsState]
      if (!newEditElems[index].quest_ids) {
        const newEditElem = { ...newEditElems[index], quest_ids: [editContext.quest_id] }
        newEditElems[index] = newEditElem
      } else {
        const quest_ids = editElemsState[index].quest_ids
        if (quest_ids) {
          if (quest_ids.includes(editContext.quest_id)) {
            const newEditElem = {
              ...newEditElems[index], quest_ids: quest_ids.filter((quest_id) => {
                return quest_id !== editContext.quest_id
              })
            }
            newEditElems[index] = newEditElem
          } else {
            const newEditElem = { ...newEditElems[index], quest_ids: [...quest_ids, editContext.quest_id] }
            newEditElems[index] = newEditElem
          }
        }
      }
      setEditElemsState(newEditElems)
      setSaveButtonToggle(true)
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
                onChangeCheck={changeCheck}
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
