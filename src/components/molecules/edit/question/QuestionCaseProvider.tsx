import { FC, ReactNode, createContext, useContext, useState } from 'react'
interface Props {
  children: ReactNode
}
const EditCaseNoContext = createContext(
  {} as {
    editCaseNo: boolean
    setEditCaseNo: any
  }
)
const ChangeCaseNoContext = createContext(
  {} as {
    changeCaseNo: boolean
    setChangeCaseNo: any
  }
)
const ShowAllQuestionCaseContext = createContext(
  {} as {
    showAllQuestionCase: boolean
    setShowAllQuestionCase: any
  }
)
export const useEditCaseNoContext = () => useContext(EditCaseNoContext)
export const useChangeCaseNoContext = () => useContext(ChangeCaseNoContext)
export const useShowAllQuestionCaseContext = () =>
  useContext(ShowAllQuestionCaseContext)

export const QuestionCaseProvider: FC<Props> = ({ children }) => {
  const [editCaseNo, setEditCaseNo] = useState(false)
  const [changeCaseNo, setChangeCaseNo] = useState(false)
  const [showAllQuestionCase, setShowAllQuestionCase] = useState(false)
  return (
    <EditCaseNoContext.Provider value={{ editCaseNo, setEditCaseNo }}>
      <ChangeCaseNoContext.Provider value={{ changeCaseNo, setChangeCaseNo }}>
        <ShowAllQuestionCaseContext.Provider
          value={{ showAllQuestionCase, setShowAllQuestionCase }}
        >
          {children}
        </ShowAllQuestionCaseContext.Provider>
      </ChangeCaseNoContext.Provider>
    </EditCaseNoContext.Provider>
  )
}
