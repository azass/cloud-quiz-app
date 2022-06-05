import { memo, useState, VFC } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  selectUpdateTerm,
  selectEditContext,
  setEditContext,
  selectEdittingTerms,
  resetUpdateTerm,
} from '../../slices/editSlice'
import { ArrowCircleUpIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { useQueryClient } from 'react-query'
import { Tag, Term } from '../../types/types'
import { useTags } from '../../hooks/useTags'
import log from 'loglevel'

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

interface Props {
  chosenTag: Tag
}
export const TermSaveButton: VFC<Props> = memo(({ chosenTag }) => {
  log.setLevel("info")
  log.debug("TermSaveButton start")
  const update = useAppSelector(selectUpdateTerm)
  const terms = useAppSelector(selectEdittingTerms)
  const editContext = useAppSelector(selectEditContext)
  // const chosenTag = useAppSelector(selectChosenTag)
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const { getTag } = useTags()
  const [saving, setSaving] = useState(false)
  const saveTerms = () => {
    const tag = getTag(chosenTag.tag_name)
    setSaving(true)
    log.debug(terms)
    const newTerms = [...terms]
    newTerms.map((term, index) => {
      if (term.sort !== index + 1) {
        newTerms.splice(index, 1, {
          ...term,
          sort: index + 1,
          changed: (term.changed === 'new' || term.changed === 'delete') ? term.changed : 'update',
        })
      }
    })
    log.debug(newTerms)

    const newTerms2 = newTerms.filter(
      (term) => term.changed === 'new' || term.changed === 'update' || term.changed === 'delete'
    )
    log.debug(newTerms2)
    const selectedTerms = newTerms
      .filter((term) => term.selected)
      .map((term) => ({
        term_id: term.term_id,
        word: term.word,
        level: term.level,
        sort: term.sort,
        description: term.description,
      }))
    const keywords = JSON.parse(editContext.keywordsJson)
    keywords[editContext.chosenTag.tag_name] = selectedTerms
    const newEditContext = {
      ...editContext,
      keywordsJson: JSON.stringify(keywords),
    }
    log.debug(keywords)
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
        log.debug(result)
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
      .catch((error) => {
        log.error(error)
        setSaving(false)
      })
  }
  return (
    <>
      {update && (!saving ? (
        <ArrowCircleUpIcon
          className="w-16 h-16 pl-8 pb-8 text-pink-300 cursor-pointer"
          onClick={() => saveTerms()}
        />
      ) : (
        <div className="flex justify-center pl-8">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      ))}
    </>
  )
})
