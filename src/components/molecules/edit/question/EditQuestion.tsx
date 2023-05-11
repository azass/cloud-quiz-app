import { FC, memo } from 'react'
import { QNoteBlock } from './QNoteBlock'
import { QScraping } from './QScraping'
import { QBug } from './QBug'
import { QTermDescriptions } from './QTermDescriptions'
import { QLeaningProfiles } from './QLeaningProfiles'
import { QLabels } from './QLabels'
import { EditQuestionHeader } from './EditQuestionHeader'
import { EditQuestionCase } from './EditQuestionCase'
import {
  useIsNewContext,
  useQuestionContext,
  useShowCheckboxContext,
} from './QuestionProvider'
import { NoteItemsProvider } from '../NoteItemsProvider'
import { strongText } from '../../../../styles/util'
import { QKeywords } from '../../QKeywords'

export const EditQuestion: FC = memo(() => {
  const { question } = useQuestionContext()
  const { isNew } = useIsNewContext()
  const { showCheckbox, setShowCheckbox } = useShowCheckboxContext()
  const clickEye = () => {
    setShowCheckbox(!showCheckbox)
  }
  return (
    <div title="EditQuestion">
      <EditQuestionHeader />
      {!isNew && question && (
        <div className="pt-16">
          <EditQuestionCase />
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
          <QScraping />
          {'is_bug' in question && question.is_bug && question.bug_points && (
            <QBug />
          )}
          <div className="pt-4">
            <QKeywords question={question} withAdd={true} />
            <div className={`flex gap-2 mt-6 ${strongText}`}>リファレンス</div>
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
            <QNoteBlock title={'メモ'} />
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
      )}
    </div>
  )
})
