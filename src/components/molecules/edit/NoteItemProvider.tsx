import { FC, ReactNode, createContext, useContext } from 'react'
import { NoteItem } from '../../../types/types'
import { useAppSelector } from '../../../app/hooks'
import { selectEditContext } from '../../../slices/editSlice'

interface Props {
  noteItem: NoteItem
  index: number
  hasSelectCheck?: boolean
  hasSelectLevel?: boolean
  hasPutOptionImage?: boolean
  children: ReactNode
}

const NoteItemContext = createContext(
  {} as {
    noteItem: NoteItem
    index: number
    on: any
    hasSelectCheck?: boolean
    hasSelectLevel?: boolean
    hasPutOptionImage?: boolean
  }
)
export const useNoteItemContext = () => useContext(NoteItemContext)

export const NoteItemProvider: FC<Props> = ({
  noteItem,
  index,
  hasSelectCheck,
  hasSelectLevel,
  hasPutOptionImage,
  children,
}) => {
  const editContext = useAppSelector(selectEditContext)
  const on = () => {
    return noteItem.quest_ids?.includes(editContext.quest_id) || false
  }
  return (
    <NoteItemContext.Provider
      value={{
        noteItem,
        index,
        on,
        hasSelectCheck,
        hasSelectLevel,
        hasPutOptionImage
      }}
    >
      {children}
    </NoteItemContext.Provider>
  )
}