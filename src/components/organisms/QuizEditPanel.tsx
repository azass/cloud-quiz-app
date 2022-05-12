import { VFC, useState, memo, useContext } from 'react'
import { Question } from '../../types/types'
import { useNavigate, useParams } from 'react-router-dom'
import { useQueryQuestion } from '../../hooks/useQueryQuestion'
import { EditBlock } from '../molecules/EditBlock'
import { QScraping } from '../molecules/QScraping'
import { QTags } from '../molecules/QTags'
import { ColorContext } from '../../App'
import { CloudUploadIcon } from '@heroicons/react/outline'
import { useMutateQuestion } from '../../hooks/useMutateQuestion'
import log from 'loglevel'
import { useAppDispatch } from '../../app/hooks'
import { setTab, tabs } from '../../slices/editSlice'
import { QBug } from '../molecules/QBug'

export const QuizEditPanel: VFC = memo(() => {
  log.setLevel('info')
  log.debug('Question Edit')
  const color = useContext(ColorContext)
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  log.debug(`QEdit quest_id=${params.quest_id}`)
  const [question, setQuestion] = useState<Question>()
  const quest_id = params.quest_id || ''
  const [questId, setQuestId] = useState(quest_id)
  const [registerToggle, setRegisterToggle] = useState(false)
  const { createQuestion } = useMutateQuestion()
  const { deleteBug } = useMutateQuestion()
  const { status, data, error } = useQueryQuestion(quest_id)
  if (status === 'loading') return <div>{'Loading...'}</div>
  if (status === 'error') {
    alert(error?.message)
    dispatch(setTab(tabs[0]))
    navigate('/login')
  }

  if (!question || (params.quest_id && questId !== params.quest_id)) {
    if (data === undefined || data === null) {
      const newQuest: Question = {
        quest_id: quest_id,
        quest_no: parseInt(quest_id.slice(-4)),
        exam_id: params.exam_id,
      }
      params.quest_id && setQuestId(params.quest_id)
      setRegisterToggle(true)
      setQuestion(newQuest)
    } else {
      if (params.quest_id) {
        setQuestId(params.quest_id)
      }
      log.debug('EditQuiz change setQuestion !!!')
      log.debug(data)
      if (data) {
        setQuestion(data)
        setRegisterToggle(false)
      }
    }
  }
  const onClickDelete = () => {
    if (question) {
      const newQuestion = { ...question, is_bug: false }
      deleteBug(newQuestion)
      setQuestion(newQuestion)
    }
  }
  const onClickRegister = () => {
    if (question) {
      createQuestion(question)
      setRegisterToggle(false)
    }
  }

  return (
    <>
      <div
        className={`flex justify-start font-light pt-6 pb-3 text-base font-bold ${color.bgColor} ${color.baseText}`}
      >
        {questId}
        {registerToggle && (
          <>
            <span className="px-4 italic text-red-500">New!!</span>
            <CloudUploadIcon
              className="h-5 w-5  text-blue-400 cursor-pointer "
              onClick={() => onClickRegister()}
            />
          </>
        )}
      </div>
      {!registerToggle && question && (
        <>
          <EditBlock
            questId={questId}
            title={'問題文'}
            name="question_items"
            editElems={question.question_items || []}
            editable={true}
          />
          <EditBlock
            questId={questId}
            title={'選択肢'}
            name="options"
            editElems={question.options || []}
            editable={true}
          />
          <div className="pt-10">
            <QTags question={question} withAdd={true} />
          </div>
          <QScraping question={question} setQuestion={setQuestion} />
          {"is_bug" in question && question.is_bug && question.bug_points && (
            <QBug bug={question.bug_points} onClickDelete={onClickDelete} />
          )}
          <EditBlock
            questId={questId}
            title={'知識'}
            name="explanation"
            editElems={question.explanation || []}
            editable={true}
          />
        </>
      )}
    </>
  )
})
