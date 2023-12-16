import { FC, memo, useState, createContext, useContext } from 'react'
import { ReactNode } from 'react-markdown/lib/ast-to-react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { selectQuestions, setQuestions } from '../../../../slices/editSlice'
import { useQuestionContext } from './QuestionProvider'
import { Question } from '../../../../types/types'

interface Props {
  children: ReactNode
}

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
const QuestionHederContext = createContext(
  {} as {
    questId: string
    setQuestId: any
    postPutQuestion: any
  }
)
export const useIsOldContext = () => useContext(IsOldContext)
export const useNotReadyContext = () => useContext(NotReadyContext)
export const useQuestionHeaderContext = () => useContext(QuestionHederContext)

export const QuestionHeaderProvider: FC<Props> = memo(({ children }) => {
  const dispatch = useAppDispatch()
  const { question, setQuestion } = useQuestionContext()
  const questions: Question[] = useAppSelector(selectQuestions)
  const [questId, setQuestId] = useState(question.quest_id)
  const [isOld, setIsOld] = useState(question.is_old || false)
  const [notReady, setNotReady] = useState(question.not_ready || false)

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
    <QuestionHederContext.Provider
      value={{ questId, setQuestId, postPutQuestion }}
    >
      <IsOldContext.Provider value={{ isOld, setIsOld }}>
        <NotReadyContext.Provider value={{ notReady, setNotReady }}>
          {children}
        </NotReadyContext.Provider>
      </IsOldContext.Provider>
    </QuestionHederContext.Provider>
  )
})
