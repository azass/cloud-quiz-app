import { FC, ReactNode, createContext, useContext, useState } from 'react'
import axios from 'axios'
import log from 'loglevel'
import { NoteItem } from '../../../types/types'
import { useAppSelector } from '../../../app/hooks'
import { selectEditContext } from '../../../slices/editSlice'
import Label from '../../../consts/labels'
import Prop from '../../../consts/props'

interface Props {
  name: string
  noteItems: NoteItem[]
  editable: boolean
  draggable?: boolean
  star?: boolean
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
    star?: boolean
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
  star,
  editable,
  // editting,
  children,
}) => {
  const isCheckOn = noteItems.some((x) => x.correct)
  const [editItems, setEditItems] = useState<NoteItem[]>(noteItems)
  const [editting, setEditting] = useState(false)
  const [showCheckbox, setShowCheckbox] = useState(!isCheckOn)
  const [showAllQuestionCase, setShowAllQuestionCase] = useState(false)
  const [saveButtonToggle, setSaveButtonToggle] = useState(false)
  const editContext = useAppSelector(selectEditContext)

  const add = (index: number, type: string) => {
    if (!star) {
      const newEditElems = [...editItems]
      const newEditElem: NoteItem = { type: type }
      if (newEditElem.type === Prop.NoteItemType.TEXTAREA) {
        newEditElem.text = ''
      } else if (newEditElem.type === Prop.NoteItemType.LINK) {
        newEditElem.link = ''
        newEditElem.url = ''
      } else if (newEditElem.type === Prop.NoteItemType.IMAGE) {
        newEditElem.image_path = ''
        newEditElem.image_height = ''
      } else if (newEditElem.type === Prop.NoteItemType.OPTION) {
        newEditElem.text = ''
        newEditElem.mark = Label.mark[index + 1]
      }
      newEditElems.splice(index + 1, 0, newEditElem)
      setEditItems(newEditElems)
      setSaveButtonToggle(false)
    }
  }

  const del = (index: number) => {
    const newEditElems = [...editItems]
    newEditElems.splice(index, 1)
    setEditItems(newEditElems)
    setSaveButtonToggle(true)
  }

  const changeText = (index: number, attr: string, text: string) => {
    const newEditElems = [...editItems]
    if (
      attr === 'text' ||
      attr === 'text_en' ||
      attr === 'link' ||
      attr === 'url' ||
      attr === 'image_path' ||
      attr === 'image_height' ||
      attr === 'lv'
    ) {
      const newEditElem = { ...newEditElems[index] }
      newEditElem[attr] = text
      newEditElems.splice(index, 1, newEditElem)
    }
    setEditItems(newEditElems)
    validate(newEditElems)
  }

  const changeCheck = (index: number) => {
    const newEditElems = [...editItems]
    newEditElems[index].correct = !newEditElems[index].correct
    setEditItems(newEditElems)
    setSaveButtonToggle(true)
  }

  const changeCheck2 = (index: number) => {
    const newEditElems = [...editItems]
    if (!newEditElems[index].quest_ids) {
      const newEditElem = {
        ...newEditElems[index],
        quest_ids: [editContext.quest_id],
      }
      newEditElems[index] = newEditElem
    } else {
      const quest_ids = editItems[index].quest_ids
      if (quest_ids) {
        if (quest_ids.includes(editContext.quest_id)) {
          const newEditElem = {
            ...newEditElems[index],
            quest_ids: quest_ids.filter((quest_id) => {
              return quest_id !== editContext.quest_id
            }),
          }
          newEditElems[index] = newEditElem
        } else {
          const newEditElem = {
            ...newEditElems[index],
            quest_ids: [...quest_ids, editContext.quest_id],
          }
          newEditElems[index] = newEditElem
        }
      }
    }
    setEditItems(newEditElems)
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
                  star,
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
