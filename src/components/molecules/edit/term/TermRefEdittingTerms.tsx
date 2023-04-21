import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { selectEdittingTerms, setSuggestTerms } from '../../../../slices/editSlice'
import { TermSuggest } from './TermSuggest'

export const TermRefEdittingTerms: FC = () => {
  const dispatch = useAppDispatch()
  const terms = useAppSelector(selectEdittingTerms)

  dispatch(setSuggestTerms(terms))

  return <TermSuggest />
}
