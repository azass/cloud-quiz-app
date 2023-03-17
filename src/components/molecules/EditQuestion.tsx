import log from 'loglevel'
import { memo, useContext, useState, VFC } from 'react'
import { useMutateQuestion } from '../../hooks/useMutateQuestion'
import { Question } from '../../types/types'
import { ColorContext } from '../../App'
import { EditBlock } from './EditBlock'
import { QScraping } from './QScraping'
import { QBug } from './QBug'
import { QKeywords } from './QKeywords'
import { QTermDescriptions } from './QTermDescriptions'
import { QLeaningProfiles } from './QLeaningProfiles'
import { QLabels } from './QLabels'
import { EditQuestionHeader } from './EditQuestionHeader'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectQuestions, setQuestions } from '../../slices/editSlice'
// import { useQueryClient } from 'react-query'
interface Props {
  question: Question
  setQuestion: any
  isNew: boolean
}
export const EditQuestion: VFC<Props> = memo(
  ({ question, setQuestion, isNew }) => {
    log.setLevel('debug')
    log.debug('Question Edit')
    const dispatch = useAppDispatch()
    // const queryClient = useQueryClient()
    const color = useContext(ColorContext)
    const { deleteBug } = useMutateQuestion()
    const [registerToggle, setRegisterToggle] = useState<boolean>(isNew)
    const questions = useAppSelector(selectQuestions)
    // const exam = useAppSelector(selectExam)

    const onClickDelete = () => {
      if (question) {
        const newQuestion = { ...question, is_bug: false }
        deleteBug(newQuestion)
        setQuestion(newQuestion)
        dispatch(setQuestions(questions.map((quest) =>
          quest.quest_id === newQuestion.quest_id ? newQuestion : quest
        )))
        // queryClient.setQueryData<Question[]>(
        //   'Questions' + exam.exam_id,
        //   questions.map((quest) =>
        //     quest.quest_id === newQuestion.quest_id ? newQuestion : quest
        //   )
        // )
      }
    }

    return (
      <div title="EditQuestion">
        <EditQuestionHeader
          question={question}
          setQuestion={setQuestion}
          registerToggle={registerToggle}
          setRegisterToggle={setRegisterToggle} />
        {!registerToggle && question && (
          <>
            {'case_id' in question && (
              <EditBlock
                question={question}
                title={'与件'}
                name="case_items"
                editElems={question.case_items || []}
                editable={true}
              />
            )}
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
              <QBug bug={question.bug_points} onClickDelete={onClickDelete} />
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
          </>
        )}
      </div>
    )
  }
)
