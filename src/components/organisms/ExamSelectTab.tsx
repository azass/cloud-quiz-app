import { VFC, memo, useState } from 'react'
import { useQueryProviders } from '../../hooks/useQueryProviders'
import { Provider } from '../../types/types'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  resetEditedContent,
  selectScArgs,
  setExam,
  setProviderTags,
  setScArgs,
  setTab,
  tabs,
} from '../../slices/editSlice'
import log from 'loglevel'

export const ExamSelectTab: VFC = memo(() => {
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
  const nowProvider = list.find(
    (provider) => provider.name === nowProviderName
  )
  log.debug('nowProvider=', nowProvider)
  return (
    <>
      <select
        className="mb-3 px-3 py-2 border border-gray-300"
        value={nowProviderName}
        onChange={(e) => {
          setNowProviderName(e.target.value)
        }}
      >
        {providerOptions}
      </select>
      <div>
        <div>
          {nowProvider?.exams.map((exam) => (
            <div>
              <button
                className={
                  'inline-flex items-center justify-center ' +
                  'space-x-2 py-3 px-4 border border-transparent ' +
                  'text-sm font-medium rounded text-green-600 ' +
                  'hover:text-green-700 hover:bg-green-100 ' +
                  'bg-green-50 transition-colors'
                }
                onClick={() => {
                  dispatch(resetEditedContent())
                  dispatch(setProviderTags(nowProvider.tags))
                  dispatch(setTab(tabs[1]))
                  dispatch(
                    setExam(exam)
                  )
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
