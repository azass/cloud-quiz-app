import { FC, ReactNode, createContext, useContext } from 'react'
import { EditElem } from '../../../types/types'
import { useAppSelector } from '../../../app/hooks'
import { selectEditContext } from '../../../slices/editSlice'

interface Props {
  editElem: EditElem
  index: number
  children: ReactNode
}

const EditElemContext = createContext(
  {} as {
    editElem: EditElem
    index: number
    on: any
  }
)

export const useEditElemContext = () => useContext(EditElemContext)

export const EditElemProvider: FC<Props> = ({ editElem, index, children }) => {
  const editContext = useAppSelector(selectEditContext)
  const on = () => {
    return editElem.quest_ids?.includes(editContext.quest_id) || false
  }
  return (
    <EditElemContext.Provider
      value={{
        editElem,
        index,
        on,
      }}
    >
      {children}
    </EditElemContext.Provider>
  )
}
