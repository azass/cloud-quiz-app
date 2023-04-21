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
export const useEditCaseNoContext = () => useContext(EditCaseNoContext)
export const useChangeCaseNoContext = () => useContext(ChangeCaseNoContext)

export const QuestionCaseProvider: FC<Props> = ({ children }) => {
  const [editCaseNo, setEditCaseNo] = useState(false)
  const [changeCaseNo, setChangeCaseNo] = useState(false)
  return (
    <EditCaseNoContext.Provider value={{ editCaseNo, setEditCaseNo }}>
      <ChangeCaseNoContext.Provider value={{ changeCaseNo, setChangeCaseNo }}>
        {children}
      </ChangeCaseNoContext.Provider>
    </EditCaseNoContext.Provider>
  )
}
