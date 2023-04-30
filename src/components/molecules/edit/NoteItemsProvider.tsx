import { FC, ReactNode, createContext, useContext, useState } from 'react'
import axios from 'axios'
import log from 'loglevel'
import { NoteItem } from '../../../types/types'
import { useAppSelector } from '../../../app/hooks'
import { selectEditContext } from '../../../slices/editSlice'
import Label from '../../../consts/labels'
import Prop from '../../../consts/props'
import { useStarContext } from './term/TermsProvider'
import { useEditItems } from '../../../hooks/useEditItems'

interface Props {
  name: string
  noteItems: NoteItem[]
  editable: boolean
  draggable?: boolean
  editting?: boolean
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
const ShowCheckboxContext = createContext(
  {} as {
    showCheckbox: boolean
    setShowCheckbox: any
  }
)
const ShowAllQuestionCaseContext = createContext(
  {} as {
    showAllQuestionCase: boolean
    setShowAllQuestionCase: any
  }
)
const SaveButtonToggleContext = createContext(
  {} as {
    saveButtonToggle: boolean
    setSaveButtonToggle: any
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
    save: any
    editable: boolean
    draggable?: boolean
  }
)
export const useEditItemsContext = () => useContext(EditItemsContext)
export const useEdittingContext = () => useContext(EdittingContext)
export const useShowCheckboxContext = () => useContext(ShowCheckboxContext)
export const useShowAllQuestionCaseContext = () =>
  useContext(ShowAllQuestionCaseContext)
export const useSaveButtonToggleContext = () =>
  useContext(SaveButtonToggleContext)
export const useNoteItemsContext = () => useContext(NoteItemsContext)

export const NoteItemsProvider: FC<Props> = ({
  name,
  noteItems,
  draggable,
  editable,
  // editting,
  children,
}) => {
  const isCheckOn = noteItems.some((x) => x.correct)
  const { star } = useStarContext()
  const [editItems, setEditItems] = useState<NoteItem[]>(noteItems)
  const [editting, setEditting] = useState(false)
  const [showCheckbox, setShowCheckbox] = useState(!isCheckOn)
  const [showAllQuestionCase, setShowAllQuestionCase] = useState(false)
  const [saveButtonToggle, setSaveButtonToggle] = useState(false)
  const {
    addItem,
    delItem,
    changeTextItem,
    changeCheckItem,
    changeCheckItem2,
  } = useEditItems(editItems)

  const add = (index: number, type: string) => {
    if (!star) {
      const newEditItems = addItem(index, type)
      setEditItems(newEditItems)
      setSaveButtonToggle(false)
    }
  }

  const del = (index: number) => {
    const newEditItems = delItem(index)
    setEditItems(newEditItems)
    setSaveButtonToggle(true)
  }

  const changeText = (index: number, attr: string, text: string) => {
    const newEditItems = changeTextItem(index, attr, text)
    setEditItems(newEditItems)
    validate(newEditItems)
  }

  const changeCheck = (index: number) => {
    const newEditItems = changeCheckItem(index)
    setEditItems(newEditItems)
    setSaveButtonToggle(true)
  }

  const changeCheck2 = (index: number) => {
    const newEditItems = changeCheckItem2(index)
    setEditItems(newEditItems)
    setSaveButtonToggle(true)
  }

  const validate = (newEditElems: NoteItem[]) => {
    newEditElems.map((editElem) => {
      if (
        editElem.type === Prop.NoteItemType.TEXTAREA ||
        editElem.type === Prop.NoteItemType.OPTION
      ) {
        setSaveButtonToggle(editElem.text !== '')
      } else if (editElem.type === Prop.NoteItemType.LINK) {
        setSaveButtonToggle(editElem.link !== '' && editElem.url !== '')
      } else if (editElem.type === Prop.NoteItemType.IMAGE) {
        setSaveButtonToggle(
          editElem.image_path !== '' && editElem.image_height !== ''
        )
      } else {
        setSaveButtonToggle(false)
      }
    })
  }

  const save = (requestData: any, api: string, post?: any) => {
    axios
      .put(`${process.env.REACT_APP_REST_URL}/${api}`, requestData, Prop.config)
      .then((response) => {
        let result = response.data
        setSaveButtonToggle(false)
        if (post) post(requestData)
      })
      .catch((error) => log.debug(error))
  }
  return (
    <EditItemsContext.Provider value={{ editItems, setEditItems }}>
      <EdittingContext.Provider value={{ editting, setEditting }}>
        <ShowCheckboxContext.Provider value={{ showCheckbox, setShowCheckbox }}>
          <ShowAllQuestionCaseContext.Provider
            value={{ showAllQuestionCase, setShowAllQuestionCase }}
          >
            <SaveButtonToggleContext.Provider
              value={{ saveButtonToggle, setSaveButtonToggle }}
            >
              <NoteItemsContext.Provider
                value={{
                  noteItems: noteItems,
                  name,
                  add,
                  del,
                  changeText,
                  changeCheck,
                  changeCheck2,
                  save,
                  editable,
                  draggable,
                }}
              >
                {children}
              </NoteItemsContext.Provider>
            </SaveButtonToggleContext.Provider>
          </ShowAllQuestionCaseContext.Provider>
        </ShowCheckboxContext.Provider>
      </EdittingContext.Provider>
    </EditItemsContext.Provider>
  )
}
