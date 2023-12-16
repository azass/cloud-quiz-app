import { FC, memo, useState } from 'react'
import { useQueryProviders } from '../../hooks/useQueryProviders'
import { Provider } from '../../types/types'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  resetShowContent,
  selectScArgs,
  setExam,
  setProviderTags,
  setScArgs,
  setTab,
} from '../../slices/editSlice'
import log from 'loglevel'
import Label from '../../consts/labels'

export const ExamSelectTab: FC = memo(() => {
  log.setLevel('debug')
  const [nowProviderName, setNowProviderName] = useState('')
  const { status, data } = useQueryProviders()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const srcArgs = useAppSelector(selectScArgs)
  if (status === 'loading')
    return <div className="pl-8 pt-8">{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>
  const voidProvider: Provider = {
    name: '',
    display_name: '',
    exams: [],
    tags: [],
  }
  const list: Provider[] = [voidProvider].concat(data ? data : [])

  const providerOptions = list.map((provider) => (
    <option key={provider.name} value={provider.name}>
      {provider.display_name}
    </option>
  ))
  const nowProvider = list.find((provider) => provider.name === nowProviderName)
  return (
    <>
      <select
        className="mb-3 px-3 py-2 border border-gray-300"
        value={nowProviderName}
        onChange={(e) => setNowProviderName(e.target.value)}
      >
        {providerOptions}
      </select>
      <div>
        <div>
          {nowProvider?.exams.map((exam) => (
            <div className="pb-1">
              <button
                className={
                  'inline-flex items-center w-full ' +
                  'space-x-2 px-4 py-1 border border-transparent ' +
                  'text-base font-medium rounded text-blue-100 text-left ' +
                  'bg-gradient-to-r from-blue-500 from-10% via-blue-900 via-20% to-black to-90% ' +
                  'hover:text-sky-100 hover:bg-sky-500 ' +
                  'bg-blue-600 transition-colors'
                }
                onClick={() => {
                  dispatch(resetShowContent())
                  dispatch(setProviderTags(nowProvider.tags))
                  dispatch(setTab(Label.tabs[1]))
                  dispatch(setExam(exam))
                  setScArgs({
                    ...srcArgs,
                    exam_ids: [exam.exam_id],
                  })
                  navigate('/editor/' + exam.exam_id)
                }}
              >
                {exam.exam_name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
})
