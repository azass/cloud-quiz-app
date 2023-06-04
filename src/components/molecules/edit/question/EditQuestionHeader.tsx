import { memo, useState, FC, createContext, useContext } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { selectQuestions, setQuestions } from '../../../../slices/editSlice'
import { Question } from '../../../../types/types'
import { LangSelector } from '../../../atoms/LangSelector'
import { QRArchiveToggle } from './QArchiveToggle'
import { QCaseButtonSet } from './QCaseButtonSet'
import { QNewRegister } from './QNewRegister'
import { QReadyButton } from './QReadyButton'
import { useIsNewContext, useQuestionContext } from './QuestionProvider'
import { shineText } from '../../../../styles/util'
import { QScreenTime } from './QScreenTime'
import { useOpenBookContext } from '../../../pages/QuizEditor'
const IsOldContext = createContext(
  {} as {
    isOld: boolean
    setIsOld: any
  }
)
const NotReadyContext = createContext(
  {} as {
    notReady: boolean
    setNotReady: any
  }
)
const EditQuestionContext = createContext(
  {} as {
    questId: string
    postPutQuestion: any
  }
)
export const useIsOldContext = () => useContext(IsOldContext)
export const useNotReadyContext = () => useContext(NotReadyContext)
export const useEditQuestionContext = () => useContext(EditQuestionContext)

export const EditQuestionHeader: FC = memo(() => {
  const dispatch = useAppDispatch()
  const { question, setQuestion } = useQuestionContext()
  const { isNew } = useIsNewContext()
  const questions: Question[] = useAppSelector(selectQuestions)
  const [questId, setQuestId] = useState(question.quest_id)
  const [isOld, setIsOld] = useState(question.is_old || false)
  const [notReady, setNotReady] = useState(question.not_ready || false)
  const { open } = useOpenBookContext()

  if (questId !== question.quest_id) {
    setQuestId(question.quest_id)
    setIsOld(question.is_old || false)
    setNotReady(question.not_ready || false)
  }
  const postPutQuestion = (newQuestion: Question) => {
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
  return (
    <div className={`fixed ${open ? 'w-1/2' : 'w-full'} pr-8 -mt-1`}>
      <div className="flex justify-between items-center w-full pb-2 z-10">
        <div className="flex justify-start items-center">
          <div
            className={
              `pt-1 w-32 text-lg text-orange-400 font-bold` +
              ` hover:text-sky-600 hover:bg-white`
            }
          >
            {question.quest_id}
          </div>
          <EditQuestionContext.Provider value={{ questId, postPutQuestion }}>
            <QScreenTime />
            <div className="flex mt-1 mr-4">
              <IsOldContext.Provider value={{ isOld, setIsOld }}>
                <QRArchiveToggle />
              </IsOldContext.Provider>
            </div>
            <div className="ml-2">
              <NotReadyContext.Provider value={{ notReady, setNotReady }}>
                <QReadyButton />
              </NotReadyContext.Provider>
            </div>
            <QCaseButtonSet />
          </EditQuestionContext.Provider>
        </div>
        {isNew && question && <QNewRegister />}
        <div className="ml-8 mr-12">
          <LangSelector />
        </div>
      </div>
    </div>
  )
})
