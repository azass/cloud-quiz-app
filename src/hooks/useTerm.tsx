/* eslint-disable array-callback-return */
import { useQueryClient } from 'react-query'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  selectEditContext,
  selectEdittingTerms,
  selectUpdateTerm,
  setEditContext,
  setEdittingTerms,
  setUpdateTerm,
} from '../slices/editSlice'
import { Term } from '../types/types'
import Colors from '../consts/colors'

export const useTerm = (term: Term, index: number) => {
  const terms = useAppSelector(selectEdittingTerms)
  const updateTem = useAppSelector(selectUpdateTerm)
  const editContext = useAppSelector(selectEditContext)
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  const enter = (word: string, level: number, explain?: string, ref?: Term) => {
    if (word !== term.word || level !== term.level || explain !== term.explain) {
      const newTerms = [...terms]
      const term = {
        ...newTerms[index],
        word: word,
        level: level,
        explain: explain,
        changed: newTerms[index].changed || 'update',
      }
      if (ref) {
        term.ref = ref
      }
      newTerms[index] = term
      dispatch(setEdittingTerms(newTerms))
      if (!updateTem) dispatch(setUpdateTerm(true))
    }
  }

  const remove = () => {
    const newTerms =
      terms[index].changed === 'new'
        ? terms.filter((term, i) => i !== index)
        : terms.map((term, i) =>
            i === index ? { ...term, changed: 'delete', selected: false } : term
          )
    dispatch(setEdittingTerms(newTerms))
    if (!updateTem) dispatch(setUpdateTerm(true))
  }

  const select = () => {
    if (editContext.forQuestion) {
      const newTerms = [...terms]
      const newTerm = { ...newTerms[index] }
      newTerm.selected = !term.selected
      newTerms[index] = newTerm
      dispatch(setEdittingTerms(newTerms))
      if (!updateTem) dispatch(setUpdateTerm(true))
    }
  }

  const updateCacheTerm = (requestData: Term) => {
    const newTerms = [...terms]
    const selectedTerms = newTerms
      .filter((term) => term.selected)
      .map((term) => ({
        term_id: term.term_id,
        word: term.word,
        level: term.level,
        explain: term.explain,
        sort: term.sort,
        description: term.description,
      }))
    const keywords = JSON.parse(editContext.keywordsJson || '{}')
    keywords[editContext.chosenTag.tag_name] = selectedTerms
    const newEditContext = {
      ...editContext,
      keywordsJson: JSON.stringify(keywords),
    }
    dispatch(setEditContext(newEditContext))

    newTerms.map((newTerm, index) => {
      if (newTerm.term_id === requestData.term_id) {
        newTerms.splice(index, 1, { ...requestData })
      }
    })
    dispatch(setEdittingTerms(newTerms))

    queryClient.setQueryData<Term[]>(
      editContext.chosenTag.provider + '_' + editContext.chosenTag.tag_no,
      newTerms.map((term) => ({
        term_id: term.term_id,
        word: term.word,
        level: term.level,
        explain: term.explain,
        sort: term.sort,
        provider: term.provider,
        tag_no: term.tag_no,
        description: term.description,
      }))
    )
  }

  const getBgColor = (lv: number) => {
    return `${
      term.selected
        ? Colors.termNodeBgcolorsSelected[lv - 1]
        : Colors.termNodeBgcolors[lv - 1]
    }`
  }

  return {
    enter,
    remove,
    select,
    getBgColor,
    updateCacheTerm,
  }
}
