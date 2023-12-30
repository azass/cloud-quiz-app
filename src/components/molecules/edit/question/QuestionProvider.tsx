import { useState, memo, useContext, createContext, ReactNode, FC } from 'react'
import { Question, voidTag } from '../../../../types/types'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useQueryQuestion } from '../../../../hooks/useQueryQuestion'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { selectEditContext, setEditContext } from '../../../../slices/editSlice'
import { useAuthentication } from '../../../../hooks/useAuthentication'
import { LangProvider } from '../../../atoms/LangProvider'
import { useTags } from '../../../../hooks/useTags'
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
const ShowCheckboxContext = createContext(
  {} as {
    showCheckbox: boolean
    setShowCheckbox: any
  }
)
export const useQuestionContext = () => useContext(QuestionContext)
export const useIsNewContext = () => useContext(IsNewContext)
export const useShowCheckboxContext = () => useContext(ShowCheckboxContext)

export const QuestionProvider: FC<Props> = memo(({ children }) => {
  const { logout } = useAuthentication()
  const params = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const editContext = useAppSelector(selectEditContext)
  const quest_id = params.quest_id || ''
  const [questId, setQuestId] = useState(quest_id)
  const [question, setQuestion] = useState<Question>()
  const [isNew, setIsNew] = useState(false)
  const isCheckOn = (question?.question_items || []).some((x) => x.correct)
  const [showCheckbox, setShowCheckbox] = useState(!isCheckOn)
  const { getTag } = useTags()

  const { status, data, error } = useQueryQuestion(quest_id)
  if (status === 'loading') return <div>{'Loading...'}</div>
  if (status === 'error') {
    logout()
    alert(error?.message)
    navigate('/login')
  }
  if (!question || questId !== quest_id) {
    setQuestId(quest_id)
    if (data) {
      setIsNew(false)
      setQuestion(data)
      if (data.quest_id !== editContext.quest_id) {
        const tag_no = searchParams.get('fromTermEditor')
        dispatch(
          setEditContext({
            quest_id: data.quest_id,
            keywordsJson: data.keywords || '',
            chosenTag: getTag(tag_no),
            forQuestion: true,
          })
        )
      }
    } else {
      setIsNew(true)
      const exam_id = params.exam_id || ''
      setQuestion({
        quest_id: quest_id,
        quest_no: parseInt(quest_id.slice(exam_id.length + 1)),
        exam_id: exam_id,
        not_ready: true,
      })
    }
  }
  return (
    <>
      {question && (
        <QuestionContext.Provider value={{ question, setQuestion }}>
          <IsNewContext.Provider value={{ isNew, setIsNew }}>
            <ShowCheckboxContext.Provider
              value={{ showCheckbox, setShowCheckbox }}
            >
              <LangProvider>{children}</LangProvider>
            </ShowCheckboxContext.Provider>
          </IsNewContext.Provider>
        </QuestionContext.Provider>
      )}
    </>
  )
})
