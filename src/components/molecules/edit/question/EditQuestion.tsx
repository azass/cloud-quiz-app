import log from 'loglevel'
import { memo, useContext, useState, VFC } from 'react'
import { Question } from '../../../../types/types'
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
interface Props {
  question: Question
  setQuestion: any
  isNew: boolean
  setIsNew: any
}
export const EditQuestion: VFC<Props> = memo(
  ({ question, setQuestion, isNew, setIsNew }) => {
    log.setLevel('debug')
    log.debug('Question Edit')
    const color = useContext(ColorContext)
    const [editCaseNo, setEditCaseNo] = useState(false)
    const [changeCaseNo, setChangeCaseNo] = useState(false)

    return (
      <div title="EditQuestion">
        <EditQuestionHeader
          question={question}
          setQuestion={setQuestion}
          isNew={isNew}
          setIsNew={setIsNew}
          editCaseNo={editCaseNo}
          setEditCaseNo={setEditCaseNo}
          changeCaseNo={changeCaseNo}
        />
        {!isNew && question && (
          <div className="pt-10">
            <EditQuestionCase
              question={question}
              editCaseNo={editCaseNo}
              setChangeCaseNo={setChangeCaseNo} />
            <EditBlock
              question={question}
              title={'問題文'}
              name="question_items"
              editElems={question.question_items || []}
              editable={true}
            />
            <EditBlock
              question={question}
              title={'選択肢'}
              name="options"
              editElems={question.options || []}
              editable={true}
            />
            <QScraping question={question} setQuestion={setQuestion} />
            {'is_bug' in question && question.is_bug && question.bug_points && (
              <QBug question={question} setQuestion={setQuestion} />
            )}
            <div className="pt-4">
              <QKeywords question={question} withAdd={true} />
              <div className={`flex gap-2 mt-6 font-bold ${color.baseText}`}>
                リファレンス
              </div>
              <QTermDescriptions question={question} />
            </div>
            <EditBlock
              question={question}
              title={'メモ'}
              name="explanation"
              editElems={question.explanation || []}
              editable={true}
            />
            <div
              className={`flex gap-2 mt-12 mb-4 font-bold ${color.baseText}`}
            >
              学習プロファイル
            </div>
            <QLeaningProfiles question={question} />
            <QLabels question={question} readonly={false} />
          </div>
        )}
      </div>
    )
  }
)
