import { FC } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { useQueryTerms } from '../../hooks/useQueryTerms'
import { setSuggestTerms } from '../../slices/editSlice'
import { Tag, Term } from '../../types/types'
import { EditTermSuggest } from './EditTermSuggest'

interface Props {
  refTag: Tag
  refTerm?: Term
  setRefTerm: any
}

export const EditTermRefTerms: FC<Props> = ({
  refTag,
  refTerm,
  setRefTerm,
}) => {
  const dispatch = useAppDispatch()
  const { status, data } = useQueryTerms(refTag)

  if (status === 'loading')
    return <div className="pl-8 pt-8">{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>

  if (data) {
    dispatch(setSuggestTerms(data))
  }

  return <EditTermSuggest refTerm={refTerm} setRefTerm={setRefTerm} />
}
