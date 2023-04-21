import log from 'loglevel'
import { FC } from 'react'
import { memo, useContext } from 'react'
import { ColorContext } from '../../../../App'
import { EditBlock } from '../EditBlock'
import { QScraping } from './QScraping'
import { QBug } from './QBug'
import { QKeywords } from '../../list/QKeywords'
import { QTermDescriptions } from './QTermDescriptions'
import { QLeaningProfiles } from './QLeaningProfiles'
import { QLabels } from './QLabels'
import { EditQuestionHeader } from './EditQuestionHeader'
import { EditQuestionCase } from './EditQuestionCase'
import { useIsNewContext, useQuestionContext } from './QuestionProvider'
import { EditElemsProvider } from '../EditElemsProvider'
export const EditQuestion: FC = memo(() => {
  const color = useContext(ColorContext)
  const { question } = useQuestionContext()
  const { isNew } = useIsNewContext()

  return (
    <div title="EditQuestion">
      <EditQuestionHeader />
      {!isNew && question && (
        <div className="pt-12">
          <EditQuestionCase />
          <EditElemsProvider
            name="question_items"
            editElems={question.question_items || []}
            editable={true}
          >
            <EditBlock title={'問題文'} />
          </EditElemsProvider>
          <EditElemsProvider
            name="options"
            editElems={question.options || []}
            editable={true}
          >
            <EditBlock title={'選択肢'} />
          </EditElemsProvider>
          <QScraping />
          {'is_bug' in question && question.is_bug && question.bug_points && (
            <QBug />
          )}
          <div className="pt-4">
            <QKeywords question={question} withAdd={true} />
            <div className={`flex gap-2 mt-6 font-bold ${color.baseText}`}>
              リファレンス
            </div>
            <QTermDescriptions />
          </div>
          <EditElemsProvider
            name="explanation"
            editElems={question.explanation || []}
            editable={true}
          >
            <EditBlock title={'メモ'} />
          </EditElemsProvider>
          <div className={`flex gap-2 mt-12 mb-4 font-bold ${color.baseText}`}>
            学習プロファイル
          </div>
          <QLeaningProfiles />
          <QLabels readonly={false} />
        </div>
      )}
    </div>
  )
})
