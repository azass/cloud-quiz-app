import axios from 'axios'
import { memo, useContext, useState, FC } from 'react'
import { ColorContext } from '../../../../App'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import {
  selectIdToken,
  selectQuestions,
  setQuestions,
} from '../../../../slices/editSlice'
import { config } from '../../../../styles/util'
import { Question } from '../../../../types/types'
import { SelectLang } from '../../../atoms/SelectLang'
import { QRArchiveToggle } from './QArchiveToggle'
import { QCaseButtonSet } from './QCaseButtonSet'
import { QNewRegister } from './QNewRegister'
import { QReadyButton } from './QReadyButton'
import { useIsNewContext, useQuestionContext } from './QuestionProvider'

export const EditQuestionHeader: FC = memo(() => {
  const color = useContext(ColorContext)
  const dispatch = useAppDispatch()
  const { question, setQuestion } = useQuestionContext()
  const { isNew, setIsNew } = useIsNewContext()
  const idToken = useAppSelector(selectIdToken)
  const questions = useAppSelector(selectQuestions)
  const [questId, setQuestId] = useState(question.quest_id)
  const [isOld, setIsOld] = useState(question.is_old || false)
  const [notReady, setNotReady] = useState(question.not_ready || false)
  if (questId !== question.quest_id) {
    setQuestId(question.quest_id)
    setIsOld(question.is_old || false)
    setNotReady(question.not_ready || false)
  }
  const putQuestion = (requestData: any, question: Question, post?: any) => {
    axios
      .put(`${process.env.REACT_APP_REST_URL}/question`, requestData, config)
      .then(async (response) => {
        const headers = {
          headers: {
            Authorization: idToken,
          },
        }
        const { data } = await axios.get(
          `${process.env.REACT_APP_REST_URL}/question?quest_id=${question.quest_id}`,
          headers
        )
        const newQuestion: Question = data.body
        if (newQuestion) {
          newQuestion.options?.map((option) => {
            if (!('mark' in option)) {
              // 連想配列キーの存在チェック
              const mark = option.text?.slice(0, 1) || ''
              option.mark = mark
            }
            option.correct = question.correct_answer?.includes(
              option.mark || '_'
            )
          })
          newQuestion.keywords = JSON.stringify(newQuestion.keywords)
          setQuestion(newQuestion)
          setIsOld(newQuestion.is_old || false)
          setNotReady(newQuestion.not_ready || false)
          dispatch(
            setQuestions(
              questions.map((quest) =>
                quest.quest_id === newQuestion.quest_id
                  ? {
                      ...quest,
                      is_old: newQuestion.is_old || false,
                      not_ready: newQuestion.not_ready || false,
                    }
                  : quest
              )
            )
          )
        }
      })
      .catch((error) => console.log(error))
  }
  return (
    <div className="fixed w-1/2 pr-8 -mt-1" title="EditQuestionHeader">
      <div className="flex justify-between items-center w-full pb-2 z-10">
        <div className="flex justify-start items-center">
          <div
            className={`pt-1 w-40 text-base font-bold ${color.baseText} hover:text-sky-600 hover:bg-white`}
          >
            {question.quest_id}
          </div>
          <QRArchiveToggle isOld={isOld} putQuestion={putQuestion} />
          <QReadyButton notReady={notReady} putQuestion={putQuestion} />
          <QCaseButtonSet putQuestion={putQuestion} />
        </div>
        {isNew && question && <QNewRegister setRegisterToggle={setIsNew} />}
        <div className="ml-8 mr-32">
          <SelectLang />
        </div>
      </div>
    </div>
  )
})
