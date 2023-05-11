import { FC } from 'react'
import { useQueryComments } from '../../../../hooks/useQueryComments'
import { QComment } from './QComment'
import { NoteItemTile } from '../NoteItemTile'
import { useQuestionContext } from './QuestionProvider'
import { NoteItemProvider } from '../NoteItemProvider'

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
              <NoteItemProvider noteItem={editElem} index={index}>
                <NoteItemTile />
              </NoteItemProvider>
            </div>
          ))}
        </>
      )}
      {data &&
        data.comment_items.map((comment) => <QComment comment={comment} />)}
    </>
  )
}
