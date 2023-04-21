import { FC, memo } from 'react'
import { useAppSelector, useAppDispatch } from '../../../../app/hooks'
import { selectEditContext, setEdittingTerms } from '../../../../slices/editSlice'
import { useQueryTerms } from '../../../../hooks/useQueryTerms'
import { Term } from '../../../../types/types'
import { TermsEditor } from './TermsEditor'

export const TermsLoader: FC = memo(() => {
  const dispatch = useAppDispatch()
  const editedContext = useAppSelector(selectEditContext)
  const { status, data } = useQueryTerms(editedContext.chosenTag)
  if (status === 'loading')
    return <div className="pl-8 pt-8">{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>

  if (data) {
    if (editedContext.forQuestion) {
      const keywords = JSON.parse(editedContext.keywordsJson || '{}')
      const selectedTerms: Term[] =
        editedContext.chosenTag.tag_name in keywords
          ? keywords[editedContext.chosenTag.tag_name]
          : keywords[editedContext.chosenTag.tag_no.toString()]
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
    <div className="mx-6 my-6" title="TermEditFrame">
      <TermsEditor />
    </div>
  )
})
