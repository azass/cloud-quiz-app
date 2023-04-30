import { useState, memo, useContext, createContext, ReactNode, FC } from 'react'
import { Question, voidTag } from '../../../../types/types'
import { useNavigate, useParams } from 'react-router-dom'
import { useQueryQuestion } from '../../../../hooks/useQueryQuestion'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { selectEditContext, setEditContext } from '../../../../slices/editSlice'
import { useAuthentication } from '../../../../hooks/useAuthentication'
import { LangProvider } from '../../../atoms/LangProvider'
interface Props {
  children: ReactNode
}
const QuestionContext = createContext(
  {} as {
    question: Question
    setQuestion: any
  }
)
const IsNewContext = createContext(
  {} as {
    isNew: boolean
    setIsNew: any
  }
)
export const useQuestionContext = () => useContext(QuestionContext)
export const useIsNewContext = () => useContext(IsNewContext)
export const QuestionProvider: FC<Props> = memo(({ children }) => {
  const { logout } = useAuthentication()
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const editContext = useAppSelector(selectEditContext)
  const quest_id = params.quest_id || ''
  const [questId, setQuestId] = useState(quest_id)
  const [question, setQuestion] = useState<Question>()
  const [isNew, setIsNew] = useState(false)
  const [err, setErr] = useState(false)
  const { status, data, error } = useQueryQuestion(quest_id)
  if (status === 'loading') return <div>{'Loading...'}</div>
  if (status === 'error') {
    if (!err) {
      setErr(true)
      logout()
      alert(error?.message)
      navigate('/login')
    }
  }
  if (!question || questId !== quest_id) {
    if (data === undefined || data === null) {
      setQuestId(quest_id)
      setIsNew(true)
      const exam_id = params.exam_id || ''
      setQuestion({
        quest_id: quest_id,
        quest_no: parseInt(quest_id.slice(exam_id.length + 1)),
        exam_id: exam_id,
        not_ready: true,
      })
    } else {
      setQuestId(quest_id)
      if (data) {
        setQuestion(data)
        setIsNew(false)
        if (data.quest_id !== editContext.quest_id) {
          dispatch(
            setEditContext({
              quest_id: data.quest_id,
              keywordsJson: data.keywords || '',
              chosenTag: voidTag,
              forQuestion: true,
            })
          )
        }
      }
    }
  }
  return (
    <>
      {question && (
        <QuestionContext.Provider value={{ question, setQuestion }}>
          <IsNewContext.Provider value={{ isNew, setIsNew }}>
            <LangProvider>{children}</LangProvider>
          </IsNewContext.Provider>
        </QuestionContext.Provider>
      )}
    </>
  )
})
