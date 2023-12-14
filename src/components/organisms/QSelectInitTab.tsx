import { memo, FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectExam, setExamTags } from '../../slices/editSlice'
import { useQueryExamTags } from '../../hooks/useQueryExamTags'
import { QListQuery } from '../molecules/list/QListQuery'

export const QSelectInitTab: FC = memo(() => {
  const dispatch = useAppDispatch()
  const exam = useAppSelector(selectExam)
  const { status, data } = useQueryExamTags(exam)
  if (status === 'loading')
    return <div className="pl-8 pt-8">{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>
  if (data) {
    dispatch(setExamTags(data))
  }
  return <QListQuery />
})
