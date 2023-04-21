import { FC, ReactNode, createContext, useContext, useState } from 'react'
import axios from 'axios'
import log from 'loglevel'
import { EditElem, EditElemType } from '../../../types/types'
import { useAppSelector } from '../../../app/hooks'
import { selectEditContext } from '../../../slices/editSlice'

interface Props {
  name: string
  editElems: EditElem[]
  editable: boolean
  draggable?: boolean
  star?: boolean
  editting?: boolean
  children: ReactNode
}
const EditElemsStateContext = createContext(
  {} as {
    editElemsState: EditElem[]
    setEditElemsState: any
  }
)
const EnableEditContext = createContext(
  {} as {
    enableEdit: boolean
    setEnableEdit: any
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
const EditElemsContext = createContext(
  {} as {
    editElems: EditElem[]
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
export const useEditElemsStateContext = () => useContext(EditElemsStateContext)
export const useEnableEditContext = () => useContext(EnableEditContext)
export const useShowCheckboxContext = () => useContext(ShowCheckboxContext)
export const useShowAllQuestionCaseContext = () =>
  useContext(ShowAllQuestionCaseContext)
export const useSaveButtonToggleContext = () =>
  useContext(SaveButtonToggleContext)
export const useEditElemsContext = () => useContext(EditElemsContext)

const mark = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

export const EditElemsProvider: FC<Props> = ({
  name,
  editElems,
  draggable,
  star,
  editable,
  editting,
  children,
}) => {
  const isCheckOn = editElems.some((x) => x.correct)
  const [editElemsState, setEditElemsState] = useState<EditElem[]>(editElems)
  const [enableEdit, setEnableEdit] = useState(editting || false)
  const [showCheckbox, setShowCheckbox] = useState(!isCheckOn)
  const [showAllQuestionCase, setShowAllQuestionCase] = useState(false)
  const [saveButtonToggle, setSaveButtonToggle] = useState(false)
  const editContext = useAppSelector(selectEditContext)

  const add = (index: number, type: string) => {
    if (!star) {
      const newEditElems = [...editElemsState]
      const newEditElem: EditElem = { type: type }
      if (newEditElem.type === EditElemType.TEXTAREA) {
        newEditElem.text = ''
      } else if (newEditElem.type === EditElemType.LINK) {
        newEditElem.link = ''
        newEditElem.url = ''
      } else if (newEditElem.type === EditElemType.IMAGE) {
        newEditElem.image_path = ''
        newEditElem.image_height = ''
      } else if (newEditElem.type === EditElemType.OPTION) {
        newEditElem.text = ''
        newEditElem.mark = mark[index + 1]
      }
      newEditElems.splice(index + 1, 0, newEditElem)
      setEditElemsState(newEditElems)
      setSaveButtonToggle(false)
    }
  }

  const del = (index: number) => {
    const newEditElems = [...editElemsState]
    newEditElems.splice(index, 1)
    setEditElemsState(newEditElems)
    setSaveButtonToggle(true)
  }

  const changeText = (index: number, attr: string, text: string) => {
    const newEditElems = [...editElemsState]
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
    setEditElemsState(newEditElems)
    validate(newEditElems)
  }

  const changeCheck = (index: number) => {
    const newEditElems = [...editElemsState]
    newEditElems[index].correct = !newEditElems[index].correct
    setEditElemsState(newEditElems)
    setSaveButtonToggle(true)
  }

  const changeCheck2 = (index: number) => {
    const newEditElems = [...editElemsState]
    if (!newEditElems[index].quest_ids) {
      const newEditElem = {
        ...newEditElems[index],
        quest_ids: [editContext.quest_id],
      }
      newEditElems[index] = newEditElem
    } else {
      const quest_ids = editElemsState[index].quest_ids
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
    setEditElemsState(newEditElems)
    setSaveButtonToggle(true)
  }

  const validate = (newEditElems: EditElem[]) => {
    newEditElems.map((editElem) => {
      if (
        editElem.type === EditElemType.TEXTAREA ||
        editElem.type === EditElemType.OPTION
      ) {
        if (editElem.text === '') {
          setSaveButtonToggle(false)
        } else {
          setSaveButtonToggle(true)
        }
      } else if (editElem.type === EditElemType.LINK) {
        if (editElem.link === '' || editElem.url === '') {
          setSaveButtonToggle(false)
        } else {
          setSaveButtonToggle(true)
        }
      } else if (editElem.type === EditElemType.IMAGE) {
        if (editElem.image_path === '' || editElem.image_height === '') {
          setSaveButtonToggle(false)
        } else {
          setSaveButtonToggle(true)
        }
      } else {
        setSaveButtonToggle(false)
      }
    })
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const save = (requestData: any, api: string, post?: any) => {
    axios
      .put(`${process.env.REACT_APP_REST_URL}/${api}`, requestData, config)
      .then((response) => {
        let result = response.data
        setSaveButtonToggle(false)
        if (post) post(requestData)
      })
      .catch((error) => log.debug(error))
  }
  return (
    <EditElemsStateContext.Provider
      value={{ editElemsState, setEditElemsState }}
    >
      <EnableEditContext.Provider value={{ enableEdit, setEnableEdit }}>
        <ShowCheckboxContext.Provider value={{ showCheckbox, setShowCheckbox }}>
          <ShowAllQuestionCaseContext.Provider
            value={{ showAllQuestionCase, setShowAllQuestionCase }}
          >
            <SaveButtonToggleContext.Provider
              value={{ saveButtonToggle, setSaveButtonToggle }}
            >
              <EditElemsContext.Provider
                value={{
                  editElems,
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
              </EditElemsContext.Provider>
            </SaveButtonToggleContext.Provider>
          </ShowAllQuestionCaseContext.Provider>
        </ShowCheckboxContext.Provider>
      </EnableEditContext.Provider>
    </EditElemsStateContext.Provider>
  )
}
