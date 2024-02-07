import log from 'loglevel'
import { memo, FC } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../../app/hooks'
import { useQueryQuestions } from '../../../hooks/useQueryQuestions'
import { setQuestions } from '../../../slices/editSlice'
import { QSelectTab } from '../../organisms/QSelectTab'

export const QListQuery: FC = memo(() => {
  log.setLevel('debug')
  const dispatch = useAppDispatch()
  const params = useParams()
  const scArgs = {
    exam_ids: [],
    category_ids: [],
    execute_times: [],
    mistake_times: [],
    correct_times: [],
    no_of_questions: -1,
    other_options: [],
    priorities: [],
    exclusives: [],
    scorings: [],
    target_days_agos: [],
    order: 0,
  }
  const args = { ...scArgs, exam_ids: [params.exam_id], except_old: false }
  const { status, data } = useQueryQuestions(args)
  if (status === 'loading')
    return <div className="pl-8 pt-8">{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>
  if (data) {
    dispatch(setQuestions(data))
  }

  return <QSelectTab />
})
