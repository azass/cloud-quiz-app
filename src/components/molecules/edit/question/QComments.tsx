import { FC } from 'react'
import { useQueryComments } from '../../../../hooks/useQueryComments'
import { QComment } from '../../../atoms/QComment'
import { EditBlockContent } from '../EditBlockContent'
import { useQuestionContext } from './QuestionProvider'
import { EditElemProvider } from '../EditElemProvider'

export const QComments: FC = () => {
  const { question } = useQuestionContext()
  const { status, data } = useQueryComments(question.quest_id)
  if (status === 'loading') return <div>{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>
  return (
    <>
      {data && data.answer_items && (
        <>
          {data.answer_items.map((editElem, index) => (
            <div className="pl-2">
              <EditElemProvider editElem={editElem} index={index}>
                <EditBlockContent />
              </EditElemProvider>
            </div>
          ))}
        </>
      )}
      {data &&
        data.comment_items.map((comment) => <QComment comment={comment} />)}
    </>
  )
}
