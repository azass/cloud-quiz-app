import { memo, useState, FC, createContext, useContext } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { selectQuestions, setQuestions } from '../../../../slices/editSlice'
import { Question } from '../../../../types/types'
import { SelectLang } from '../../../atoms/SelectLang'
import { QRArchiveToggle } from './QArchiveToggle'
import { QCaseButtonSet } from './QCaseButtonSet'
import { QNewRegister } from './QNewRegister'
import { QReadyButton } from './QReadyButton'
import { useIsNewContext, useQuestionContext } from './QuestionProvider'
import { strongText } from '../../../../styles/util'
import { QScreenTime } from './QScreenTime'
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
    postPut: any
  }
)
export const useIsOldContext = () => useContext(IsOldContext)
export const useNotReadyContext = () => useContext(NotReadyContext)
export const useEditQuestionContext = () => useContext(EditQuestionContext)
export const EditQuestionHeader: FC = memo(() => {
  const dispatch = useAppDispatch()
  const { question, setQuestion } = useQuestionContext()
  const { isNew } = useIsNewContext()
  const questions = useAppSelector(selectQuestions)
  const [questId, setQuestId] = useState(question.quest_id)
  const [isOld, setIsOld] = useState(question.is_old || false)
  const [notReady, setNotReady] = useState(question.not_ready || false)
  if (questId !== question.quest_id) {
    setQuestId(question.quest_id)
    setIsOld(question.is_old || false)
    setNotReady(question.not_ready || false)
  }
  const postPut = (newQuestion: Question) => {
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
    <div className="fixed w-1/2 pr-8 -mt-1" title="EditQuestionHeader">
      <div className="flex justify-between items-center w-full pb-2 z-10">
        <div className="flex justify-start items-center">
          <div
            className={
              `pt-1 w-28 text-base ${strongText}` +
              ` hover:text-sky-600 hover:bg-white`
            }
          >
            {question.quest_id}
          </div>
          <EditQuestionContext.Provider value={{ questId, postPut }}>
            <QScreenTime />
            <IsOldContext.Provider value={{ isOld, setIsOld }}>
              <QRArchiveToggle />
            </IsOldContext.Provider>
            <NotReadyContext.Provider value={{ notReady, setNotReady }}>
              <QReadyButton />
            </NotReadyContext.Provider>
            <QCaseButtonSet />
          </EditQuestionContext.Provider>
        </div>
        {isNew && question && <QNewRegister />}
        <div className="ml-8 mr-12">
          <SelectLang />
        </div>
      </div>
    </div>
  )
})
