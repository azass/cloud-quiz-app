import { FC } from 'react'
import { useAppDispatch } from '../../../../app/hooks'
import { useQueryTerms } from '../../../../hooks/useQueryTerms'
import { setSuggestTerms } from '../../../../slices/editSlice'
import { TermSuggest } from './TermSuggest'
import { useRefTagContext } from './TermProvider'

export const TermRefTerms: FC = () => {
  const dispatch = useAppDispatch()
  const { refTag } = useRefTagContext()
  const { status, data } = useQueryTerms(refTag)

  if (status === 'loading')
    return <div className="pl-8 pt-8">{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>

  if (data) {
    dispatch(setSuggestTerms(data))
  }

  return <TermSuggest />
}
