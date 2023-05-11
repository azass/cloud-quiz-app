import axios from 'axios'
import { useAppSelector } from '../app/hooks'
import Label from '../consts/labels'
import Prop from '../consts/props'
import { selectEditContext } from '../slices/editSlice'
import { NoteItem } from '../types/types'
import log from 'loglevel'

export const useEditItems = (editItems: NoteItem[]) => {
  const editContext = useAppSelector(selectEditContext)

  const addItem = (index: number, type: string) => {
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
      newEditElem.text = Label.mark[index + 1] + '.\n'
      newEditElem.mark = Label.mark[index + 1]
    }
    newEditElems.splice(index + 1, 0, newEditElem)
    return newEditElems
  }

  const delItem = (index: number) => {
    const newEditElems = [...editItems]
    newEditElems.splice(index, 1)
    return newEditElems
  }

  const changeTextItem = (index: number, attr: string, text: string) => {
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
    return newEditElems
  }

  const changeCheckItem = (index: number) => {
    const newEditElems = [...editItems]
    newEditElems[index].correct = !newEditElems[index].correct
    return newEditElems
  }

  const changeCheckItem2 = (index: number) => {
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
    return newEditElems
  }

  const putOptionImageItem = (index: number, path: string, height: string) => {
    const newEditElems = [...editItems]
    newEditElems[index].image_path = path
    newEditElems[index].image_height = height
    return newEditElems
  }

  const validate = (newEditElems: NoteItem[]) => {
    return (
      newEditElems.filter((editElem) => {
        if (
          editElem.type === Prop.NoteItemType.TEXTAREA ||
          editElem.type === Prop.NoteItemType.OPTION
        ) {
          return editElem.text === ''
        } else if (editElem.type === Prop.NoteItemType.LINK) {
          return editElem.link === '' || editElem.url === ''
        } else if (editElem.type === Prop.NoteItemType.IMAGE) {
          return editElem.image_path === '' || editElem.image_height === ''
        } else {
          return true
        }
      }).length === 0
    )
  }

  const save = (requestData: any, api: string, postSave?: any) => {
    axios
      .put(`${process.env.REACT_APP_REST_URL}/${api}`, requestData, Prop.config)
      .then((response) => {
        if (postSave) postSave(requestData)
      })
      .catch((error) => log.debug(error))
  }
  return {
    addItem,
    delItem,
    changeTextItem,
    changeCheckItem,
    changeCheckItem2,
    putOptionImageItem,
    validate,
    save,
  }
}
