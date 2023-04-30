import { memo, FC } from 'react'
import { useParams } from 'react-router-dom'
import { QInputItem } from '../molecules/list/QInputItem'
import { QuizListFrame } from './QuizListFrame'
import { QListProvider } from '../molecules/list/QListProvider'

export const QuizSelectFrame: FC = memo(() => {
  const params = useParams()
  return (
    <>
      <QInputItem examId={params.exam_id || ''} />
      <QListProvider>
        <QuizListFrame />
      </QListProvider>
    </>
  )
})
