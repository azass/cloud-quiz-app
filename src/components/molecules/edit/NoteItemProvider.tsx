import { FC, ReactNode, createContext, useContext } from 'react'
import { NoteItem } from '../../../types/types'
import { useAppSelector } from '../../../app/hooks'
import { selectEditContext } from '../../../slices/editSlice'

interface Props {
  editElem: NoteItem
  index: number
  children: ReactNode
}

const NoteItemContext = createContext(
  {} as {
    editElem: NoteItem
    index: number
    on: any
  }
)

export const useNoteItemContext = () => useContext(NoteItemContext)

export const NoteItemProvider: FC<Props> = ({ editElem, index, children }) => {
  const editContext = useAppSelector(selectEditContext)
  const on = () => {
    return editElem.quest_ids?.includes(editContext.quest_id) || false
  }
  return (
    <NoteItemContext.Provider value={{ editElem, index, on }}>
      {children}
    </NoteItemContext.Provider>
  )
}
