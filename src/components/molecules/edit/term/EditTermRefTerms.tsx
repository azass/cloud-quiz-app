import { FC, useContext } from 'react'
import { useAppDispatch } from '../../../../app/hooks'
import { useQueryTerms } from '../../../../hooks/useQueryTerms'
import { setSuggestTerms } from '../../../../slices/editSlice'
import { EditTermSuggest } from './EditTermSuggest'
import { EditTermContext } from './EditTermContext'

export const EditTermRefTerms: FC = () => {
  const dispatch = useAppDispatch()
  const { refTag } = useContext(EditTermContext)
  const { status, data } = useQueryTerms(refTag)

  if (status === 'loading')
    return <div className="pl-8 pt-8">{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>

  if (data) {
    dispatch(setSuggestTerms(data))
  }

  return <EditTermSuggest />
}
