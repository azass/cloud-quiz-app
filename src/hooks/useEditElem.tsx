/* eslint-disable array-callback-return */

import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  resetExamTags,
  selectEditContext,
  selectProviderTags,
  selectQuestions,
  setEditContext,
  setQuestions,
} from '../slices/editSlice'
import { Question, Tag } from '../types/types'
import axios from 'axios'
import log from 'loglevel'

export const useEditElem = () => {
  log.setLevel('debug')
  log.debug('useEditElem start!')
  const questions = useAppSelector<Question[]>(selectQuestions)

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const editedContext = useAppSelector(selectEditContext)
  const tags = useAppSelector(selectProviderTags)
  const dispatch = useAppDispatch()

  const keywords =
    !editedContext.keywordsJson || editedContext.keywordsJson === ''
      ? {}
      : JSON.parse(editedContext.keywordsJson || '{}')

  const onClickTag = (tag: Tag, include: boolean) => {
    if (include) {
      keywords[tag.tag_no] = []
    } else {
      if (tag.tag_name in keywords) {
        if (keywords[tag.tag_name].length !== 0) {
          var res = window.confirm('用語も削除されます')
          if (!res) return
        }
        delete keywords[tag.tag_name] // 連想配列の要素（キー）を削除
      } else {
        if (keywords[tag.tag_no].length !== 0) {
          var res2 = window.confirm('用語も削除されます')
          if (!res2) return
        }
        delete keywords[tag.tag_no] // 連想配列の要素（キー）を削除
      }
    }
    log.debug('keys')
    log.debug(Object.keys(keywords))
    const requestData: Question = {
      quest_id: editedContext.quest_id,
      tags: tags
        .filter(
          (tag) =>
            Object.keys(keywords).includes(tag.tag_name) ||
            Object.keys(keywords).includes(tag.tag_no.toString())
        )
        .map((tag) => tag.tag_no.toString()),
      keywords: JSON.stringify(keywords),
    }
    log.debug(requestData)
    axios
      .put<Question>(
        `${process.env.REACT_APP_REST_URL}/question`,
        requestData,
        config
      )
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            setEditContext({
              ...editedContext,
              keywordsJson: JSON.stringify(keywords),
            })
          )
          dispatch(resetExamTags())
          dispatch(
            setQuestions(
              questions.map((quest) =>
                quest.quest_id === editedContext.quest_id
                  ? {
                      ...quest,
                      keywords: JSON.stringify(keywords),
                    }
                  : quest
              )
            )
          )
        }
      })
      .catch((error) => log.debug(error))
  }

  return {
    keywords,
    onClickTag,
  }
}
