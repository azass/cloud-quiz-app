import { memo, VFC } from 'react'
import { useParams } from 'react-router-dom'
import { QInputItem } from '../molecules/QInputItem'
import { QuizListFrame } from './QuizListFrame'

export const QuizSelectFrame: VFC = memo(() => {
  console.log('QuizSelectFrame start')
  const params = useParams()
  return (
    <>
      <QInputItem examId={params.exam_id || ''} />
      <QuizListFrame />
    </>
  )
})
