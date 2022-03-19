import { VFC, memo, useContext } from 'react'
import { useQueryQuestions } from '../../hooks/useQueryQuestions'
import { QItem } from '../molecules/QItem'
import { useParams } from 'react-router-dom'
import { ColorContext } from '../../App'
import { useAppSelector } from '../../app/hooks'
import { selectScArgs } from '../../slices/editSlice'

export const QuizListFrame: VFC = memo(() => {
  console.log('<QuizListFrame>')
  const color = useContext(ColorContext)
  const params = useParams()
  const scArgs = useAppSelector(selectScArgs)
  const args = { ...scArgs, exam_ids: [params.exam_id] }
  console.log(args)
  const { status, data } = useQueryQuestions(args)
  if (status === 'loading')
    return <div className="pl-8 pt-8">{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>
  return (
    <div id="navWrapper" className={color.bgColor}>
      <nav
        id="nav"
        className="px-6 pt-2 overflow-y-auto text-xs h-screen pb-60"
      >
        {data?.map((question) => (
          <div key={question.quest_id}>
            <ul>
              <QItem question={question} />
            </ul>
          </div>
        ))}
      </nav>
    </div>
  )
})
