import { memo, useContext, VFC } from "react";
import { useMutateQuestion } from "../../hooks/useMutateQuestion";
import { Question } from "../../types/types";
import { ColorContext } from "../../App";
import { EditBlock } from "./EditBlock";
import { QScraping } from "./QScraping";
import { QBug } from "./QBug";
import { QKeywords } from "./QKeywords";
import { QTermDescriptions } from "./QTermDescriptions";
import { QLeaningProfiles } from "./QLeaningProfiles";
import { QLabels } from "./QLabels";
import log from 'loglevel'
interface Props {
  question: Question
  setQuestion: any
}
export const EditQuestion: VFC<Props> = memo(({ question, setQuestion }) => {
  log.setLevel('debug')
  log.debug('Question Edit')
  const color = useContext(ColorContext)
  const { deleteBug } = useMutateQuestion()

  const onClickDelete = () => {
    if (question) {
      const newQuestion = { ...question, is_bug: false }
      deleteBug(newQuestion)
      setQuestion(newQuestion)
    }
  }
  return (
    <>
      <EditBlock
        questId={question.quest_id}
        title={'問題文'}
        name="question_items"
        editElems={question.question_items || []}
        editable={true}
      />
      <EditBlock
        questId={question.quest_id}
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
        <QTermDescriptions question={question}
        />
      </div>
      <EditBlock
        questId={question.quest_id}
        title={'メモ'}
        name="explanation"
        editElems={question.explanation || []}
        editable={true}
      />
      <div className={`flex gap-2 mt-12 mb-4 font-bold ${color.baseText}`}>
        学習プロファイル
      </div>
      <QLeaningProfiles question={question} />
      <QLabels question={question} readonly={false} />
    </>
  )
})