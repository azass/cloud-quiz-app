import axios from 'axios'
import { useQueryClient } from 'react-query'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  resetUpdateTerm,
  selectEditContext,
  selectEdittingTerms,
  selectExamTags,
  setEditContext,
} from '../slices/editSlice'
import { Term, voidTag } from '../types/types'

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const useMutateTerms = () => {
  const terms = useAppSelector(selectEdittingTerms)
  const editContext = useAppSelector(selectEditContext)
  const examTags = useAppSelector(selectExamTags)
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const save = () => {
    const tag =
      examTags.find((t) => t.tag_name === editContext.chosenTag.tag_name) ||
      voidTag
    console.log(terms)
    const newTerms = [...terms]
    newTerms.map((term, index) => {
      if (term.sort !== index + 1) {
        newTerms.splice(index, 1, {
          ...term,
          sort: index + 1,
          changed: term.changed === 'new' ? 'new' : 'update',
        })
      }
    })
    console.log(newTerms)

    const newTerms2 = newTerms.filter(
      (term) => term.changed === 'new' || term.changed === 'update'
    )
    console.log(newTerms2)
    const selectedTerms = newTerms
      .filter((term) => term.selected)
      .map((term) => ({
        term_id: term.term_id,
        word: term.word,
        level: term.level,
        sort: term.sort,
      }))
    const keywords = JSON.parse(editContext.keywordsJson)
    keywords[editContext.chosenTag.tag_name] = selectedTerms
    const newEditContext = {
      ...editContext,
      keywordsJson: JSON.stringify(keywords),
    }
    console.log(keywords)
    const requestData = {
      provider: tag.provider,
      tag_no: tag.tag_no,
      tag_keywords: JSON.stringify(newTerms2),
      quest_id: editContext.quest_id,
      quest_keywords: JSON.stringify(keywords),
    }
    axios
      .post(`${process.env.REACT_APP_REST_URL}/keywords`, requestData, config)
      .then((response) => {
        let result = response.data
        console.log(result)
        queryClient.setQueryData<Term[]>(
          tag?.provider + '_' + tag?.tag_no,
          newTerms.map((term) => ({
            term_id: term.term_id,
            word: term.word,
            level: term.level,
            sort: term.sort,
            provider: term.provider,
            tag_no: term.tag_no
          }))
        )
        dispatch(setEditContext(newEditContext))
        dispatch(resetUpdateTerm())
      })
      .catch((error) => console.log(error))
  }
  return {
    save,
  }
}
