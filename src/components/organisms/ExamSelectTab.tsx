import { VFC, memo, useState } from 'react'
import { useQueryProviders } from '../../hooks/useQueryProviders'
import { Provider } from '../../types/types'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import {
  resetEditedContent,
  setExam,
  setExamTags,
  setTab,
  tabs,
} from '../../slices/editSlice'
import log from 'loglevel'

export const ExamSelectTab: VFC = memo(() => {
  log.setLevel("info")
  const [nowProviderName, setNowProviderName] = useState('')
  const { status, data } = useQueryProviders()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
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
  const nowProvider = data?.find(
    (provider) => provider.name === nowProviderName
  )
  log.debug(nowProvider)
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
        <ul>
          {nowProvider?.exams.map((exam) => (
            <li>
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
                  dispatch(setExamTags(nowProvider.tags))
                  dispatch(setTab(tabs[1]))
                  dispatch(
                    setExam({
                      examId: exam.exam_id,
                      examName: exam.exam_name,
                    })
                  )
                  navigate('/editor/' + exam.exam_id)
                }}
              >
                {exam.exam_name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
})
