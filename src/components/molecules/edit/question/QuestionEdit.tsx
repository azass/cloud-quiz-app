import { FC, memo, useState } from 'react'
import { ChatIcon } from '@heroicons/react/solid'
import { QNoteBlock } from './QNoteBlock'
import { QScraping } from './QScraping'
import { QBug } from './QBug'
import { QTermDescriptions } from './QTermDescriptions'
import { QLeaningProfiles } from './QLeaningProfiles'
import { QLabels } from './QLabels'
import { QuestionCaseEdit } from './QuestionCaseEdit'
import { QComments } from './QComments'
import {
  useIsNewContext,
  useQuestionContext,
  useShowCheckboxContext,
} from './QuestionProvider'
import { NoteItemsProvider } from '../NoteItemsProvider'
import { iconBase, strongText } from '../../../../styles/util'
import { QKeywords } from '../../QKeywords'

export const QuestionEdit: FC = memo(() => {
  const { question } = useQuestionContext()
  const { isNew } = useIsNewContext()
  const { showCheckbox, setShowCheckbox } = useShowCheckboxContext()
  const clickEye = () => {
    setShowCheckbox(!showCheckbox)
  }
  const [showComment, setShowComment] = useState(false)

  return (
    <>
      {!isNew && question && (
        <>
          <QuestionCaseEdit />
          <NoteItemsProvider
            name="question_items"
            noteItems={question.question_items || []}
            editable={true}
            hasAddTextarea={true}
            hasAddLink={true}
            hasAddImage={true}
          >
            <QNoteBlock title={'問題文'} />
          </NoteItemsProvider>
          <NoteItemsProvider
            name="options"
            noteItems={question.options || []}
            editable={true}
            isOptions={true}
            clickEye={clickEye}
          >
            <QNoteBlock title={'選択肢'} />
          </NoteItemsProvider>
          <ChatIcon
            className={`h-4 w-4 ${iconBase}`}
            fill="currentColor"
            onClick={() => setShowComment(!showComment)}
          />
          {showComment && (
            <div>
              <div className="py-4">コメント</div>
              <QComments />
            </div>
          )}
          <QScraping />
          {'is_bug' in question && question.is_bug && question.bug_points && (
            <QBug />
          )}
          <div className="pt-4">
            <QKeywords question={question} withAdd={true} />
            <div className={`flex gap-2 mt-6 py-2 ${strongText}`}>
              リファレンス
            </div>
            <div className="px-2">
              <QTermDescriptions />
            </div>
            <NoteItemsProvider
              name="explanation"
              noteItems={question.explanation || []}
              editable={true}
              hasAddTextarea={true}
              hasAddLink={true}
              hasAddImage={true}
            >
              <QNoteBlock title={'解説'} />
            </NoteItemsProvider>
            <div className={`flex gap-2 mt-12 mb-4 ${strongText}`}>
              学習プロファイル
            </div>
            <QLeaningProfiles />
            <div className={`flex pt-2 ${strongText}`}>
              <span className="pt-8">ラベル</span>
              <div className="pl-4">
                <QLabels readonly={false} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
})
