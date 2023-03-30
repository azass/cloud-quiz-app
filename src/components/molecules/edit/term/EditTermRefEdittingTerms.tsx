import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { selectEdittingTerms, setSuggestTerms } from '../../../../slices/editSlice'
import { EditTermSuggest } from './EditTermSuggest'

export const EditTermRefEdittingTerms: FC = () => {
  const dispatch = useAppDispatch()
  const terms = useAppSelector(selectEdittingTerms)

  dispatch(setSuggestTerms(terms))

  return <EditTermSuggest />
}
