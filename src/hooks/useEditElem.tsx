import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  selectEditContext,
  selectExamTags,
  setEditContext,
} from '../slices/editSlice'
import { EditElem, EditElemType, Question, Tag } from '../types/types'
import axios from 'axios'

export const useEditElem = (editElems: EditElem[]) => {
  const [saveButtonToggle, setSaveButtonToggle] = useState(false)
  const [editElemsState, setEditElemsState] = useState<EditElem[]>(editElems)
  const [hiddenCheckbox, setHiddenCheckbox] = useState(false)

  const add = (index: number, type: string) => {
    const newEditElems = [...editElemsState]
    const newEditElem: EditElem = {
      type: type,
    }
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
    }
    newEditElems.splice(index + 1, 0, newEditElem)
    console.log('add!!!')
    setEditElemsState(newEditElems)
    setSaveButtonToggle(false)
  }

  const del = (index: number) => {
    const newEditElems = [...editElemsState]
    newEditElems.splice(index, 1)
    console.log('del!!!')
    setEditElemsState(newEditElems)
    setSaveButtonToggle(true)
  }

  const changeText = (index: number, attr: string, text: string) => {
    const newEditElems = [...editElemsState]
    if (
      attr === 'text' ||
      attr === 'link' ||
      attr === 'url' ||
      attr === 'image_path' ||
      attr === 'image_height'
    ) {
      const newEditElem = { ...newEditElems[index] }
      newEditElem[attr] = text
      newEditElems.splice(index, 1, newEditElem)
    }
    console.log('changeText!!!')
    setEditElemsState(newEditElems)
    validate()
  }

  const changeCheck = (index: number) => {
    const newEditElems = [...editElemsState]
    newEditElems[index].correct = !newEditElems[index].correct
    console.log('changeCheck!!!')
    setEditElemsState(newEditElems)
    setSaveButtonToggle(true)
  }

  const validate = () => {
    editElemsState.map((editElem) => {
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
        console.log(result)
        setSaveButtonToggle(false)
        if (post) post(requestData)
      })
      .catch((error) => console.log(error))
  }

  const editedContext = useAppSelector(selectEditContext)
  const tags = useAppSelector(selectExamTags)
  const dispatch = useAppDispatch()

  const keywords =
    editedContext.keywordsJson === ''
      ? {}
      : JSON.parse(editedContext.keywordsJson)

  const onClickTag = (tag: Tag, include: boolean) => {
    if (include) {
      keywords[tag.tag_name] = []
    } else {
      if (keywords[tag.tag_name].length !== 0) {
        var res = window.confirm('用語も削除されます')
        if (!res) return
      }
      delete keywords[tag.tag_name]
    }
    console.log('keys')
    console.log(Object.keys(keywords))
    const requestData: Question = {
      quest_id: editedContext.quest_id,
      tags: tags
        .filter((tag) => Object.keys(keywords).includes(tag.tag_name))
        .map((tag) => tag.tag_no.toString()),
      keywords: JSON.stringify(keywords),
    }
    console.log(requestData)
    axios
      .put<Question>(
        `${process.env.REACT_APP_REST_URL}/question`,
        requestData,
        config
      )
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            setEditContext({
              ...editedContext,
              keywordsJson: JSON.stringify(keywords),
            })
          )
        }
      })
      .catch((error) => console.log(error))
  }

  return {
    editElemsState,
    setEditElemsState,
    saveButtonToggle,
    setSaveButtonToggle,
    hiddenCheckbox,
    setHiddenCheckbox,
    add,
    del,
    changeText,
    changeCheck,
    save,
    keywords,
    onClickTag,
  }
}
