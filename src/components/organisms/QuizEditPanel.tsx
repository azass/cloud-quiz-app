import { VFC, useState, memo, useContext } from 'react'
import { Question } from '../../types/types'
import { useNavigate, useParams } from 'react-router-dom'
import { useQueryQuestion } from '../../hooks/useQueryQuestion'
import { EditBlock } from '../molecules/EditBlock'
import { QScraping } from '../molecules/QScraping'
import { QKeywords } from '../molecules/QKeywords'
import { ColorContext } from '../../App'
import { CloudUploadIcon } from '@heroicons/react/outline'
import { useMutateQuestion } from '../../hooks/useMutateQuestion'
import log from 'loglevel'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectEditContext, setTab, tabs } from '../../slices/editSlice'
import { QBug } from '../molecules/QBug'
import { QTermDescriptions } from '../molecules/QTermDescriptions'
import { QLeaningProfiles } from '../molecules/QLeaningProfiles'

export const QuizEditPanel: VFC = memo(() => {
  log.setLevel('info')
  log.debug('Question Edit')
  const color = useContext(ColorContext)
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const editContext = useAppSelector(selectEditContext)
  log.debug(`QEdit quest_id=${params.quest_id}`)
  const [question, setQuestion] = useState<Question>()
  const quest_id = params.quest_id || ''
  const [questId, setQuestId] = useState(quest_id)
  const [registerToggle, setRegisterToggle] = useState(false)
  const { createQuestion } = useMutateQuestion()
  const { deleteBug } = useMutateQuestion()
  const [err, setErr] = useState(false)
  const { status, data, error } = useQueryQuestion(quest_id)
  if (status === 'loading') return <div>{'Loading...'}</div>
  if (status === 'error') {
    if (!err) {
      alert(error?.message)
      setErr(true)
      dispatch(setTab(tabs[0]))
      navigate('/login')
    }
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
  const getKeywordsJson = () => {
    if (question && editContext.quest_id === question.quest_id) {
      if (!editContext.keywordsJson || editContext.keywordsJson === '') {
        return {}
      } else {
        return JSON.parse(editContext.keywordsJson)
      }
    } else {
      if (question && question.keywords) {
        const keywordsJson: Object = JSON.parse(question.keywords)
        return keywordsJson
      } else {
        return {}
      }
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
          <QScraping question={question} setQuestion={setQuestion} />
          {'is_bug' in question && question.is_bug && question.bug_points && (
            <QBug bug={question.bug_points} onClickDelete={onClickDelete} />
          )}
          <div className="pt-10">
            <QKeywords
              question={question}
              keywords={getKeywordsJson()}
              withAdd={true}
            />
            <div className={`flex gap-2 mt-12 mb-4 font-bold ${color.baseText}`}>
              リファレンス
            </div>
            <QTermDescriptions
              quest_id={questId}
              keywords={getKeywordsJson()}
            />
          </div>
          <EditBlock
            questId={questId}
            title={'メモ'}
            name="explanation"
            editElems={question.explanation || []}
            editable={true}
          />
          <div className={`flex gap-2 mt-12 mb-4 font-bold ${color.baseText}`}>
            学習プロファイル
          </div>
          <QLeaningProfiles question={question} />
        </>
      )}
    </>
  )
})
