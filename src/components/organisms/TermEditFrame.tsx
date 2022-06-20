import { VFC, memo } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  selectEditContext,
  setEdittingTerms,
} from '../../slices/editSlice'
import { useQueryTerms } from '../../hooks/useQueryTerms'
import { Term } from '../../types/types'
import { EditTerms } from '../molecules/EditTerms'

export const TermEditFrame: VFC = memo(() => {
  const dispatch = useAppDispatch()
  const editedContext = useAppSelector(selectEditContext)
  const { status, data } = useQueryTerms(editedContext.chosenTag)
  if (status === 'loading')
    return <div className="pl-8 pt-8">{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>

  if (data) {
    if (editedContext.forQuestion) {
      const selectedTerms: Term[] = JSON.parse(editedContext.keywordsJson)[
        editedContext.chosenTag.tag_name
      ]
      const selectedTermIds = selectedTerms?.map((term) => term.term_id)
      const newTerms: Term[] = []
      for (var term of data) {
        newTerms.push({
          ...term,
          selected: selectedTermIds.includes(term.term_id),
        })
      }
      dispatch(setEdittingTerms(newTerms))
    } else {
      dispatch(setEdittingTerms(data))
    }
  }
  return (
    <div className="mx-6 my-6">
      <div className="flex justify-between px-8 pb-8">
        <span>Term Editor</span>
      </div>
      <EditTerms />
    </div>
  )
})
