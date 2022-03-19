import { memo, VFC } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  selectUpdateTerm,
  selectEditContext,
  setEditContext,
  selectEdittingTerms,
  resetUpdateTerm,
  selectExamTags,
} from '../../slices/editSlice'
import { ArrowCircleUpIcon } from '@heroicons/react/solid'
import { voidTag } from '../../types/types'
import axios from 'axios'
import { useQueryClient } from 'react-query'
import { Term } from '../../types/types'
import { useTags } from '../../hooks/useTags'
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const TermSaveButton: VFC = memo(() => {
  const update = useAppSelector(selectUpdateTerm)
  const terms = useAppSelector(selectEdittingTerms)
  const editContext = useAppSelector(selectEditContext)
  const examTags = useAppSelector(selectExamTags)
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const { getTag } = useTags()
  return (
    <>
      {update && (
        <ArrowCircleUpIcon
          className="w-16 h-16 pl-8 pb-8 text-pink-300 cursor-pointer"
          onClick={() => {
            const tag = getTag(editContext.chosenTag.tag_name)
            // examTags.find((t) => t.tag_name === editContext.chosenTagName) ||
            // voidTag
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
                description: term.description,
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
              .post(
                `${process.env.REACT_APP_REST_URL}/keywords`,
                requestData,
                config
              )
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
                    description: term.description,
                  }))
                )
                dispatch(setEditContext(newEditContext))
                dispatch(resetUpdateTerm())
              })
              .catch((error) => console.log(error))
          }}
        />
      )}
    </>
  )
})
