import { useAppDispatch, useAppSelector } from '../app/hooks'
import Colors from '../consts/colors'
import {
  resetExamTags,
  selectEditContext,
  selectProviderTags,
  selectQuestions,
  setEditContext,
  setQuestions,
} from '../slices/editSlice'
import { Question, TagTerms } from '../types/types'
import Prop from '../consts/props'
import axios from 'axios'
import log from 'loglevel'
import { useQueryClient } from 'react-query'

export const useKeywords = () => {
  const dispatch = useAppDispatch()
  const editContext = useAppSelector(selectEditContext)
  const questions = useAppSelector<Question[]>(selectQuestions)
  const tags = useAppSelector(selectProviderTags)
  const queryClient = useQueryClient()

  const getEditContextKeywords = () => {
    if (!editContext.keywordsJson || editContext.keywordsJson === '') {
      return {} as TagTerms
    } else {
      return JSON.parse(editContext.keywordsJson || '{}') as TagTerms
    }
  }
  const getKeywordsJson = (question: Question) => {
    if (question && editContext.quest_id === question.quest_id) {
      return getEditContextKeywords()
    } else {
      if (question && question.keywords) {
        const keywordsJson: Object = JSON.parse(question.keywords || '{}')
        return keywordsJson as TagTerms
      } else {
        return {} as TagTerms
      }
    }
  }
  const getTags = (keywords: TagTerms) => {
    return tags
      .filter(
        (tag) =>
          Object.keys(keywords).includes(tag.tag_name) ||
          Object.keys(keywords).includes(tag.tag_no.toString())
      )
      .map((tag) => tag.tag_no.toString())
  }
  const getBgColor = (selected: boolean, lv: number) => {
    return `${
      selected
        ? Colors.termNodeBgcolorsSelected[lv - 1]
        : Colors.termNodeBgcolors[lv - 1]
    }`
  }

  const putKeywords = (tags: string[], tagTerms: TagTerms) => {
    const questId = editContext.quest_id
    const keywords = JSON.stringify(tagTerms)
    const requestData: Question = {
      quest_id: questId,
      tags: tags,
      keywords: keywords,
    }
    axios
      .put<Question>(
        `${process.env.REACT_APP_REST_URL}/question`,
        requestData,
        Prop.config
      )
      .then((response) => {
        if (response.status === 200) {
          dispatch(setEditContext({ ...editContext, keywordsJson: keywords }))
          dispatch(resetExamTags())
          dispatch(
            setQuestions(
              questions.map((quest) =>
                quest.quest_id === questId
                  ? { ...quest, keywords: keywords }
                  : quest
              )
            )
          )
          const question = queryClient.getQueryData<Question>(questId)
          if (question) {
            queryClient.setQueryData<Question>(questId, {
              ...question,
              keywords: keywords,
              tags: tags,
            })
          }
        }
      })
      .catch((error) => log.debug(error))
  }
  return {
    getEditContextKeywords,
    getKeywordsJson,
    getTags,
    getBgColor,
    putKeywords,
  }
}
