import { VFC, useState, memo, useContext } from 'react'
import { Question, voidQuestion } from '../../types/types'
import { useParams } from 'react-router-dom'
import { useQueryQuestion } from '../../hooks/useQueryQuestion'
import { EditArea } from '../molecules/EditArea'
import { QScraping } from '../molecules/QScraping'
import { QTags } from '../molecules/QTags'
import { ColorContext } from '../../App'

export const QuizEditFrame: VFC = memo(() => {
  console.log('Question Edit')
  const color = useContext(ColorContext)
  const params = useParams()
  console.log(`QEdit quest_id=${params.quest_id}`)
  const [question, setQuestion] = useState<Question>()
  const quest_id = params.quest_id || ''
  const [questId, setQuestId] = useState(quest_id)
  const { status, data } = useQueryQuestion(quest_id)
  if (status === 'loading') return <div>{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>

  if (data === undefined) {
    const newQuest: Question = {
      quest_id: quest_id,
      quest_no: parseInt(quest_id.slice(-4)),
      exam_id: params.exam_id,
    }

    setQuestion(newQuest)
  } else {
    if (!question || (params.quest_id && questId !== params.quest_id)) {
      if (params.quest_id) {
        setQuestId(params.quest_id)
      }
      console.log('EditQuiz change setQuestion !!!')
      console.log(data)
      if (data) {
        setQuestion(data)
      }
    }
  }
  console.log(questId)
  console.log(question)
  return (
    <>
      <div
        className={`font-light pt-6 pb-3 text-base font-bold ${color.bgColor} ${color.baseText}`}
      >
        {questId}
      </div>
      <EditArea
        questId={questId}
        title={'問題文'}
        name="question_items"
        editElems={question?.question_items || []}
        editable={true}
      />
      <EditArea
        questId={questId}
        title={'選択肢'}
        name="options"
        editElems={question?.options || []}
        editable={true}
      />
      <QScraping questId={questId} setQuestion={setQuestion} />
      <div>
        <QTags question={question || voidQuestion} withAdd={true} />
      </div>
      <EditArea
        questId={questId}
        title={'知識'}
        name="explanation"
        editElems={question?.explanation || []}
        editable={true}
      />
    </>
  )
})
