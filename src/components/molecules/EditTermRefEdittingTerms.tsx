import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectEdittingTerms, setSuggestTerms } from '../../slices/editSlice'
import { Tag, Term } from '../../types/types'
import { EditTermSuggest } from './EditTermSuggest'

interface Props {
  refTag: Tag
  refTerm?: Term
  setRefTerm: any
}

export const EditTermRefEdittingTerms: FC<Props> = ({
  refTag,
  refTerm,
  setRefTerm,
}) => {
  const dispatch = useAppDispatch()
  const terms = useAppSelector(selectEdittingTerms)

  dispatch(setSuggestTerms(terms))

  return <EditTermSuggest refTerm={refTerm} setRefTerm={setRefTerm} />
}
