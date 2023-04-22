/* eslint-disable array-callback-return */
import axios from 'axios'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {
  selectEditContext,
  setEditContext,
  selectEdittingTerms,
  resetUpdateTerm,
  selectQuestions,
  setQuestions,
} from '../slices/editSlice'
import { useQueryClient } from 'react-query'
import { Term } from '../types/types'
import { useTags } from './useTags'
import Prop from '../consts/props'

export const useMutateTerms = () => {
  const terms = useAppSelector(selectEdittingTerms)
  const editContext = useAppSelector(selectEditContext)
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const { getTag } = useTags()
  const questions = useAppSelector(selectQuestions)

  const save = (setSaving: any) => {
    const tag = getTag(editContext.chosenTag.tag_name)

    const newTerms = [...terms]
    newTerms.map((term, index) => {
      if (term.sort !== index + 1) {
        newTerms.splice(index, 1, {
          ...term,
          sort: index + 1,
          changed:
            term.changed === 'new' || term.changed === 'delete'
              ? term.changed
              : 'update',
        })
      }
    })

    const newTerms2 = newTerms.filter(
      (term) =>
        term.changed === 'new' ||
        term.changed === 'update' ||
        term.changed === 'delete'
    )

    const selectedTerms = newTerms
      .filter((term) => term.selected)
      .map((term) => ({
        term_id: term.term_id,
        word: term.word,
        level: term.level,
        sort: term.sort,
        description: term.description,
      }))
    const keywords = JSON.parse(editContext.keywordsJson || '{}')
    keywords[editContext.chosenTag.tag_no] = selectedTerms
    if (editContext.chosenTag.tag_name in keywords) {
      delete keywords[editContext.chosenTag.tag_name]
    }

    const newEditContext = {
      ...editContext,
      keywordsJson: JSON.stringify(keywords),
    }

    const requestData = {
      provider: tag.provider,
      tag_no: tag.tag_no,
      tag_keywords: JSON.stringify(newTerms2),
      quest_id: editContext.quest_id,
      quest_keywords: JSON.stringify(keywords),
    }
    console.log(requestData)
    axios
      .post(
        `${process.env.REACT_APP_REST_URL}/keywords`,
        requestData,
        Prop.config
      )
      .then((response) => {
        let result = response.data
        console.log(result)
        const newTerms3 = newTerms.filter((term) => term.changed !== 'delete')
        queryClient.setQueryData<Term[]>(
          tag?.provider + '_' + tag?.tag_no,
          newTerms3.map((term) => ({
            term_id: term.term_id,
            word: term.word,
            level: term.level,
            sort: term.sort,
            provider: term.provider,
            tag_no: term.tag_no,
            description: term.description,
          }))
        )
        dispatch(
          setQuestions(
            questions.map((quest) =>
              quest.quest_id === requestData.quest_id
                ? {
                    ...quest,
                    keywords: requestData.quest_keywords,
                  }
                : quest
            )
          )
        )
        dispatch(setEditContext(newEditContext))
        dispatch(resetUpdateTerm())
        setSaving(false)
      })
      .catch((error) => {
        console.log(error)
        const newTerms3 = newTerms.filter((term) => term.changed !== 'delete')
        queryClient.setQueryData<Term[]>(
          tag?.provider + '_' + tag?.tag_no,
          newTerms3.map((term) => ({
            term_id: term.term_id,
            word: term.word,
            level: term.level,
            sort: term.sort,
            provider: term.provider,
            tag_no: term.tag_no,
            description: term.description,
          }))
        )
        dispatch(setEditContext(newEditContext))
        dispatch(resetUpdateTerm())
        setSaving(false)
      })
  }
  return {
    save,
  }
}
