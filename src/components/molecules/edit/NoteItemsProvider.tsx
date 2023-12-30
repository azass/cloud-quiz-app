import { FC, ReactNode, createContext, useContext, useState } from 'react'
import { NoteItem } from '../../../types/types'
import { useFireContext, useStarContext } from './term/TermsProvider'
import { useEditItems } from '../../../hooks/useEditItems'

interface Props {
  name: string
  noteItems: NoteItem[]
  editable: boolean
  draggable?: boolean
  editting?: boolean
  hasAddTextarea?: boolean
  hasAddLink?: boolean
  hasAddImage?: boolean
  isOptions?: boolean
  clickEye?: any
  children: ReactNode
}
const EditItemsContext = createContext(
  {} as {
    editItems: NoteItem[]
    setEditItems: any
  }
)
const EdittingContext = createContext(
  {} as {
    editting: boolean
    setEditting: any
  }
)
const ShowSaveBtnContext = createContext(
  {} as {
    showSaveBtn: boolean
    setShowSaveBtn: any
  }
)
const NoteItemsContext = createContext(
  {} as {
    noteItems: NoteItem[]
    name: string
    add: any
    del: any
    changeText: any
    changeCheck: any
    changeCheck2: any
    putOptionImage: any
    validate: any
    save: any
    editable: boolean
    draggable?: boolean
    hasAddTextarea?: boolean
    hasAddLink?: boolean
    hasAddImage?: boolean
    isOptions?: boolean
    clickEye?: any
  }
)
export const useEditItemsContext = () => useContext(EditItemsContext)
export const useEdittingContext = () => useContext(EdittingContext)
export const useShowSaveBtnContext = () => useContext(ShowSaveBtnContext)
export const useNoteItemsContext = () => useContext(NoteItemsContext)

export const NoteItemsProvider: FC<Props> = ({
  name,
  noteItems,
  draggable,
  editable,
  // editting,
  hasAddTextarea,
  hasAddLink,
  hasAddImage,
  isOptions,
  clickEye,
  children,
}) => {
  const { fire } = useFireContext()
  const { star } = useStarContext()
  const [editItems, setEditItems] = useState<NoteItem[]>(noteItems)
  const [editting, setEditting] = useState(false)
  const [showSaveBtn, setShowSaveBtn] = useState(false)
  const {
    addItem,
    delItem,
    changeTextItem,
    changeCheckItem,
    changeCheckItem2,
    putOptionImageItem,
    validate,
    save,
  } = useEditItems(editItems)

  const add = (index: number, type: string) => {
    if (!star && !fire) {
      const newEditItems = addItem(index, type)
      setEditItems(newEditItems)
      setShowSaveBtn(validate(newEditItems))
    }
  }

  const del = (index: number) => {
    const newEditItems = delItem(index)
    setEditItems(newEditItems)
    setShowSaveBtn(validate(newEditItems))
  }

  const changeText = (index: number, attr: string, text: string) => {
    const newEditItems = changeTextItem(index, attr, text)
    setEditItems(newEditItems)
    setShowSaveBtn(validate(newEditItems))
  }

  const changeCheck = (index: number) => {
    const newEditItems = changeCheckItem(index)
    setEditItems(newEditItems)
    setShowSaveBtn(validate(newEditItems))
  }

  const changeCheck2 = (index: number) => {
    const newEditItems = changeCheckItem2(index)
    setEditItems(newEditItems)
    setShowSaveBtn(validate(newEditItems))
  }

  const putOptionImage = (index: number, path: string, height: string) => {
    const newEditItems = putOptionImageItem(index, path, height)
    setEditItems(newEditItems)
    setShowSaveBtn(validate(newEditItems))
  }
  return (
    <ShowSaveBtnContext.Provider value={{ showSaveBtn, setShowSaveBtn }}>
      <EditItemsContext.Provider value={{ editItems, setEditItems }}>
        <EdittingContext.Provider value={{ editting, setEditting }}>
          <NoteItemsContext.Provider
            value={{
              noteItems,
              name,
              add,
              del,
              changeText,
              changeCheck,
              changeCheck2,
              putOptionImage,
              validate,
              save,
              editable,
              draggable,
              hasAddTextarea,
              hasAddLink,
              hasAddImage,
              isOptions,
              clickEye,
            }}
          >
            {children}
          </NoteItemsContext.Provider>
        </EdittingContext.Provider>
      </EditItemsContext.Provider>
    </ShowSaveBtnContext.Provider>
  )
}
